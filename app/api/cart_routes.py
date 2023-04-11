from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Cart, Product, User, ProductImage

cart_routes = Blueprint('/cart', __name__)

@cart_routes.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def return_cart():
    """
    Query for all products associated with the user's cart and returns them in a list of dictionaries
    """
    the_cart = Cart.query.filter_by(user_id=current_user.id).all()
    #print("*#!*#!*#!*#!*", the_cart[0].to_dict())
    cart_items = Product.query\
    .join(Cart)\
    .outerjoin(ProductImage)\
    .filter(Cart.user_id == current_user.id)\
    .all()

    cart = {}

    for item in cart_items:
        product = item.to_dict()
        #print("@!@!@!@!@!", item.carts[0].quantity)
        cart[item.id] = product
        cart[item.id]["productImages"] = []
        cart[item.id]["quantity"] = item.carts[0].quantity
        if item.product_images:
            cart[item.id]["productImages"].append(item.product_images[0].url)
        else:
            print("No images for product", item.id)
    #print (cart)

    return cart , 200
