from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Cart, Product, User, ProductImage, ShopImage, db
from app.forms import CartForm, SignUpForm

cart_routes = Blueprint('/cart', __name__)



@cart_routes.route('/', methods=['GET','POST', 'PUT', 'DELETE'])
# @login_required
def return_cart():
    """
    Query for all products associated with the user's cart and returns them in a list of dictionaries
    """
    # form = CartForm()

    if request.method == "POST":
        form = CartForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print(form.data)
        if form.validate_on_submit():

            item_already_in_cart = Cart.query.filter(Cart.user_id == form.data["user_id"] and Cart.product_id == form.data["product_id"]).first()

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
        return {"Success": "Failure"}


    # the_cart = Cart.query.filter_by(user_id=current_user.id).all()
    #print("*#!*#!*#!*#!*", the_cart[0].to_dict())
    cart_items = Product.query\
    .join(Cart)\
    .outerjoin(ProductImage)\
    .filter(Cart.user_id == current_user.id)\
    .all()

    cart = {}

    for item in cart_items:
        product = item.to_dict()
        print("@!@!@!@!@!", item.shops.id)
        cart[item.id] = product
        cart[item.id]["quantity"] = item.carts[0].quantity
        cart[item.id]["shopName"] = item.shops.name
        cart[item.id]["productImage"] = item.product_images[0].url
        shop_image = ShopImage.query.filter_by(shop_id=item.shops.id).first()
        cart[item.id]["shopImage"] = shop_image.url

    #print (cart)

    return cart , 200
# @cart_routes.route('/', methods=['POST'])
# @login_required
# def put_cart():
#     print(request.get_json())
#     print(request.cookies['csrf_token'])
#     # form = CartForm([{"quantity": "1", "product_id": 1, "user_id": 1, "csrf_token": request.cookies['csrf_token']}])
#     form = CartForm()
#     form.data["quantity"] = 1
#     print(form.data)
#     if form.validate_on_submit():
#         print(form.data)

#     return {"okay": "okay"}, 200
