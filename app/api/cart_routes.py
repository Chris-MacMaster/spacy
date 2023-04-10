from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Cart, Product, User

cart_routes = Blueprint('/cart/', __name__)

@cart_routes.route('/')
@login_required
def return_cart():
    """
    Query for all products associated with the user's cart and returns them in a list of dictionaries
    """

    # print (current_user)
    # print (current_user.id)
    cart_items = Cart.query.filter_by(user_id=current_user.id).all()
    # cart_items = Cart.query.all()
    # print(cart_items)
    cart_copy = {cart.id: cart.to_dict() for cart in cart_items}
    return cart_copy , 200
