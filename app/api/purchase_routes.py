from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Purchase, Cart, Product, User, ProductImage, ShopImage, db

purchase_routes = Blueprint('/purchases', __name__)


@login_required
@purchase_routes.route('/', methods=["GET", "POST"])
def purchases():
    """Add new order with post route or view order with """

@purchase_routes.route('/all')
def all_purchases():
    """Get all users purchases"""

    purchases = Purchase.query.filter(Purchase.user_id == current_user.id)
    return_obj = {}
    for purchase in purchases:
        return_obj[purchase.id] = purchase.to_dict()
