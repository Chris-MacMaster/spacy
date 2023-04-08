from flask import Blueprint, jsonify
from app.models import db, Product, Shop, User
from flask_login import current_user, login_required

product_routes = Blueprint('/products', __name__)


@product_routes.route('/')
def get_all_products():
    """returns all products regardless of session"""
    products = Product.query.all()
    return { 'Products': { product.id: product.to_dict() for product in products } }, 200

@product_routes.route('/current')
@login_required
def current_users_products():
    """returns a list of all products of current user"""
    print('THE ROUTE IS BEING HIT')
    if current_user.is_authenticated:
        products = Product.query.filter_by(user_id=current_user.id).all()
        return { 'Products': {product.id: product.to_dict() for product in products } }, 200
    return '<h1>Please create an account</h1>'
