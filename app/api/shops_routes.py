from flask import Blueprint, jsonify
from app.models import db, Product, Shop, User
from flask_login import current_user, login_required

shop_routes = Blueprint('/shops', __name__)

@shop_routes.route('/')
def get_all_shops():
    """returns all shops regardless of session"""
    shops = Shop.query.all()
    return { 'Shops': { shop.id: shop.to_dict() for shop in shops } }, 200
