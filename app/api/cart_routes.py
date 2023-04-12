from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Cart, Product, User, ProductImage, ShopImage, db
from app.forms import CartForm, SignUpForm

cart_routes = Blueprint('/cart', __name__)

@cart_routes.route('/empty', methods=['DELETE'])
def checkout():
    pass
    # send user id and delete all carts associated with that id.
    #
    carts_to_delete = Cart.query.filter(Cart.user_id == current_user.id).all()
    for i in carts_to_delete:
        db.session.delete(i)
    db.session.commit()
    return {"message": "Checkout Complete"}, 204
    #
    #

    # req_data = request.get_json()
    # cart_id = req_data["cart_id"]
    # print(cart_id)
    # item_to_delete = Cart.query.get(cart_id)
    # print(item_to_delete)
    # db.session.delete(item_to_delete)
    # db.session.commit()
    # return {"message": "Product removed from cart"}, 204

@cart_routes.route('/', methods=['GET','POST', 'PUT', 'DELETE'])
# @login_required
def return_cart():
    """
    Allows Users to get their current cart, add items to cart, delete items
    """

    if current_user.is_anonymous:
        return {}, 200

    if request.method == "POST":
        form = CartForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            item_already_in_cart = Cart.query.filter((Cart.user_id == form.data["user_id"])\
                                                  & (Cart.product_id == form.data["product_id"])).first()
            print(item_already_in_cart)
            if item_already_in_cart:
                item_already_in_cart.quantity += 1
                db.session.commit()
                return item_already_in_cart.to_dict(), 201
            else:
                new_item = Cart(
                    user_id = form.data["user_id"],
                    product_id = form.data["product_id"],
                    quantity = form.data["quantity"]
                )
                db.session.add(new_item)
                db.session.commit()
                return new_item.to_dict(), 201

    # print(request.get_data)
    if request.method == "DELETE":

        req_data = request.get_json()
        cart_id = req_data["cart_id"]
        print(cart_id)
        item_to_delete = Cart.query.get(cart_id)
        print(item_to_delete)
        db.session.delete(item_to_delete)
        db.session.commit()
        return {"message": "Product removed from cart"}, 204

    if request.method == "PUT":
        print(request.get_json())
        form = CartForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            req_data = request.get_json()
            cart_id = request.get_json()["cart_id"]
            new_quantity = form.data["quantity"]
            cart_to_edit = Cart.query.get(cart_id)
            cart_to_edit.quantity = new_quantity
            db.session.commit()
            return cart_to_edit.to_dict(), 200

    user_cart = Cart.query\
    .join(Product)\
    .filter(Cart.user_id == current_user.id).all()

    cart = {}
    for i in user_cart:
        product = i.product.to_dict()
        print(i.id)
        cart[i.id] = product
        cart[i.id]["id"] = i.id
        cart[i.id]["quantity"] = i.quantity
        cart[i.id]["shopName"] = i.product.shops.name
        cart[i.id]["productImage"] = i.product.product_images[0].url
        cart[i.id]["shopImage"] = i.product.shops.shop_images[0].url

    return cart, 200
