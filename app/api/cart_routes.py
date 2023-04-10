from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Cart, Product, User

cart = Blueprint('carts', __name__)


@cart.routes('/current/cart', methods=['GET, POST, PUT, DELETE'])
def return_cart():
    """
    Query for all products associated with the user's cart and returns them in a list of dictionaries
    """
    print(request)
    return{ 'okay': "bro"}
