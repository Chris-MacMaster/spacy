from flask import Blueprint, jsonify
from app.models import db, Product, Shop, ShopImage
from flask_login import current_user, login_required
import copy
shop_routes = Blueprint('/shops', __name__)

@shop_routes.route('/')
def get_all_shops():
    """returns all shops regardless of session"""
    shops = Shop.query.all()
    shopcopy = copy.deepcopy(shops)
    def get_shop_images():
        return ShopImage.query.filter(ShopImage.shop_id == id).first()
    payload = { shop.id: shop.to_dict() for shop in shopcopy}
    for shop in answer.values():
        shop_image = get_shop_images(shop['id'])
        shop['ShopImage'] = shop_image.to_dict()
    return { 'Shops': payload }, 200
