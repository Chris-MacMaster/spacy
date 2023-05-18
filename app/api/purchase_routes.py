from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Purchase, Cart, Product, User, Shop, ProductImage, ShopImage, db

purchase_routes = Blueprint('/purchases', __name__)

@purchase_routes.route('/store')
@login_required
def all_purchases(id):
    """Get all users purchases"""

    purchases = Purchase.query.filter(Purchase.user_id == current_user.id).join(Product)
    return_obj = {}
    for purchase in purchases:
        return_obj[4] = 5
        return_obj[purchase.id] = purchase.to_dict()

@purchase_routes.route('/')
@login_required
def purchases():
    """Add new order with post route or view order with """

    purchases = Purchase.query.filter(Purchase.user_id == current_user.id).join(Product).all()
    return_obj = {}
    for purchase in purchases:
        return_obj[purchase.id] = purchase.to_dict()
        return_obj[purchase.id]['productName'] = purchase.product.name
        return_obj[purchase.id]['shopName'] = purchase.product.shops.name
        return_obj[purchase.id]["quantity"] = purchase.quantity
        return_obj[purchase.id]["price"] = purchase.product.price
        return_obj[purchase.id]["shopName"] = purchase.product.shops.name
        return_obj[purchase.id]["productImage"] = purchase.product.product_images[0].url
        return_obj[purchase.id]["shopImage"] = purchase.product.shops.shop_images[0].url
    return return_obj, 200
