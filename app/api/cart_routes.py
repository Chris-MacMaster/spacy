from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Cart, Product, Purchase, User, ProductImage, ShopImage, db
from app.forms import CartForm, SignUpForm

cart_routes = Blueprint('/cart', __name__)

@cart_routes.route('/empty', methods=['DELETE'])
def checkout():

    carts_to_process = Cart.query.filter(Cart.user_id == current_user.id).join(Product).all()
    purchases = []
    for cart in carts_to_process:
        purchases.append(Purchase(
            cart_id = cart.id,
            user_id = cart.user_id,
            quantity = cart.quantity,
            product_id = cart.product_id,
            shop_id = cart.product.shop_id
            ))
        product = Product.query.get(cart.product_id)
        product.available -= cart.quantity
        db.session.delete(cart)
    [db.session.add(purchase) for purchase in purchases]
    db.session.commit()
    return {"message": "Checkout Complete"}, 204

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
    if request.method == "DELETE":
        req_data = request.get_json()
        cart_id = req_data["cart_id"]
        item_to_delete = Cart.query.get(cart_id)
        db.session.delete(item_to_delete)
        db.session.commit()
        return {"message": "Product removed from cart"}, 204

    if request.method == "PUT":
        form = CartForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            req_data = request.get_json()
            cart_id = request.get_json()["cart_id"]
            new_quantity = form.data["quantity"]
            cart_to_edit = Cart.query.get(cart_id)
            cart_to_edit.quantity = new_quantity
            db.session.commit()

            return_obj = cart_to_edit.product.to_dict()
            return_obj['id'] = cart_to_edit.id
            return_obj['cartId'] = cart_to_edit.id
            return_obj['productImage'] = cart_to_edit.product.product_images[0].url
            return_obj['shopImage'] = cart_to_edit.product.shops.shop_images[0].url
            return_obj['shopName'] = cart_to_edit.product.shops.name
            return_obj['productId'] = cart_to_edit.product.id
            return_obj['quantity'] = cart_to_edit.quantity
            return return_obj, 200

    user_cart = Cart.query\
    .join(Product)\
    .filter(Cart.user_id == current_user.id).all()
    cart = {}
    for i in user_cart:
        product = i.product.to_dict()
        cart[i.id] = product
        cart[i.id]["cartId"] = i.id
        cart[i.id]["productId"] = i.product.id
        cart[i.id]["quantity"] = i.quantity
        cart[i.id]["shopName"] = i.product.shops.name
        cart[i.id]["productImage"] = i.product.product_images[0].url
        cart[i.id]["shopImage"] = i.product.shops.shop_images[0].url
    return cart, 200

@cart_routes.route('/addLocalCart', methods=['POST'])
def addLocalCart():
    cart_dict = request.get_json()
    cart_list = cart_dict.values()
    for cart in cart_list:
        current_cart = Cart.query.join(Product).filter((Cart.user_id == current_user.id) & (Cart.product_id == cart['productId'])).first()
        if current_cart:
            if current_cart.quantity + cart['quantity'] > current_cart.product.avaiable:
                current_cart.quantity = current_cart.product.avaiable
            current_cart.quantity = current_cart.quantity + cart['quantity']
            db.session.add(current_cart)
        else:
            new_cart = Cart(
                quantity=cart['quantity'],
                product_id=cart['productId'],
                user_id=current_user.id,
                )
            db.session.add(new_cart)

    db.session.commit()
    return {}, 200
