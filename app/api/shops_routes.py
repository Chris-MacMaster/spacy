from flask import Blueprint, jsonify, request, redirect
from app.models import db, Product, Shop, ShopImage
from flask_login import current_user, login_required
import copy
shop_routes = Blueprint('/shops', __name__)

@shop_routes.route('/', methods=['GET', 'POST'])
def get_all_shops():
    """returns all shops regardless of session"""
    if request.method == 'GET':
        shops = Shop.query.all()
        print("SHOPS", shops)
        shopcopy = [shop.to_dict() for shop in shops]
        def get_shop_images(id):
            image = ShopImage.query.filter(ShopImage.shop_id == id).first()
            if image:
                    return image.to_dict()
        for shop in shopcopy:
            shopimage = get_shop_images(shop['id'])
            if shopimage:
                shop['ShopImage'] = shopimage
            else:
                shop['ShopImage'] = 'shopImage not available'
        return shopcopy, 200
    """posts a new shop"""
    if request.method == 'POST' and current_user.is_authenticated:
        # shop = request.data
        # return shop
        print("REQUEST NAME ------------------", request)
        # data = request.json
        new_shop = Shop(
            name = request.data['name'],
            owner_id = current_user.get_id(),
            street_address = request.data['streetAddress'],
            city = request.data['city'],
            state = request.data['state'],
            country = request.data['country'],
            description = request.data['description'],
            category = request.data['category'],
            policies = request.data['policies'],
        )
        # print("NEW SHOP __________________========", new_shop, "TYPE ", type(new_shop))

        db.session.add(new_shop)
        db.session.commit()
        return new_shop.to_dict()

@shop_routes.route('/<int:shop_id>', methods=['DELETE'])
@login_required
def delete_one_shop(shop_id):
    """deletes one shop according to id"""
    if current_user.is_authenticated:
        shop = Shop.query.filter_by(id=shop_id).first()
        # cart_items = Cart.query.filter_by(user_id=current_user.id).all()
        if shop == None:
            return {"error": "Cannot find Shop with specified id"}
        elif shop.owner_id == current_user.id:
            db.session.delete(shop)
            db.session.commit()
            return shop.to_dict(), 200
        elif shop.owner_id != current_user.id:
            return {"error": "Only owner may delete thier own shop"}
    
    
    


@shop_routes.route('/current')
@login_required
def get_my_shops():
    """returns current user shops"""

    if current_user.is_authenticated:
        shops = Shop.query.filter_by(owner_id=current_user.id).all()
        shopcopy = [shop.to_dict() for shop in shops]
        def get_shop_images(id):
            image = ShopImage.query.filter(ShopImage.shop_id == id).first()
            if image:
                    return image.to_dict()
        for shop in shopcopy:
            shopimage = get_shop_images(shop['id'])
            if shopimage:
                shop['ShopImage'] = shopimage
            else:
                shop['ShopImage'] = 'shopImage not available'
        return shopcopy, 200


