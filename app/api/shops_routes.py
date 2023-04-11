from flask import Blueprint, jsonify, request, redirect
from app.models import db, Product, Shop, ShopImage, ProductImage, User, ProductReview, ReviewImage
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
            return {"errors": "Cannot find Shop with specified id"}
        elif shop.owner_id == current_user.id:
            db.session.delete(shop)
            db.session.commit()
            return shop.to_dict(), 200
        elif shop.owner_id != current_user.id:
            return {"errors": "Only owner may delete their own shop"}


@shop_routes.route('/<int:shop_id>')
def get_shop_by_id(shop_id):
    """view an individual shop by id"""
    shop = Shop.query.filter(Shop.id == shop_id).first()
    if shop:
        shopcopy = shop.to_dict()
        def get_shop_images(id):
            image = ShopImage.query.filter(ShopImage.shop_id == id).first()
            if image:
                return image.to_dict()
        def get_owner(id):
            owner = User.query.filter(User.id == id).first()
            return owner.to_dict()
        def shop_products(id):
            products = Product.query.filter(Product.shop_id == id).all()
            return [product.to_dict() for product in products]
        def get_images(id):
            images = ProductImage.query.filter(ProductImage.product_id == id).all()
            return [image.to_dict() for image in images]
        def get_reviews(id):
            reviews= ProductReview.query.filter(ProductReview.product_id == id).all()
            return [r.to_dict() for r in reviews]
        def review_image(review_id):
            review_image = ReviewImage.query.filter(ReviewImage.review_id==review_id).first()
            return review_image.to_dict() if review_image else None
        products = shop_products(shopcopy['id'])
        for product in products:
            product['ProductImages'] = get_images(product['id'])
            product['Reviews'] = get_reviews(product['id'])
            for r in product['Reviews']:
                r['ReviewImages'] = review_image(r['id'])
        shopcopy['ShopImages'] = get_shop_images(shopcopy['id'])
        shopcopy['Products'] = products
        shopcopy['Owner'] = get_owner(shopcopy['ownerId'])
        return shopcopy, 200
    else:
        return {"errors": "Shop by that id does not exist"}, 404

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
