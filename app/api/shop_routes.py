from flask import Blueprint, jsonify
from app.models import db, Product, Shop, ShopImage
from flask_login import current_user, login_required
import copy
shop_routes = Blueprint('/shops', __name__)

@shop_routes.route('/')
def get_all_shops():
    """returns all shops regardless of session"""
    print('Shops hit')
    shops = Shop.query.all()
    shopcopy = [shop.to_dict() for shop in shops]
    def get_shop_images(id):
        image = ShopImage.query.filter(ShopImage.shop_id == id).first()
        print('================================',image)
        return image.to_dict()
    for shop in shopcopy:
        # shopimage =
        shop['ShopImage'] = get_shop_images(shop['id'])
    # for shop in payload.values():
    #     shop_image = get_shop_images(shop['id'])
    #     shop['ShopImage'] = shop_image.to_dict()
    return shopcopy, 200
