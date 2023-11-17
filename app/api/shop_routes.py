from app.forms import CreateShopForm
from app.api.AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask import Blueprint, jsonify, request, redirect
from app.models import db, Product, Shop, ShopImage, ProductImage, User, ProductReview, ReviewImage, user_shops
from flask_login import current_user, login_required
import copy
shop_routes = Blueprint('/shops', __name__)


@shop_routes.route('/', methods=['GET', 'POST'])
def get_all_shops():
    """returns all shops regardless of session, or posts a new shop"""
    if request.method == 'GET':
        shops = Shop.query.all()
        shopcopy = {shop.id: shop.to_dict() for shop in shops}
        for shop in shopcopy:
            shopimage = ShopImage.query.filter(
                ShopImage.shop_id == shopcopy[shop]['id']).first()
            if shopimage:
                shopcopy[shop]['ShopImage'] = shopimage.to_dict()
            products = Product.query.filter(
                Product.shop_id == shopcopy[shop]['id']).all()
            shopcopy[shop]['Products'] = [product.to_dict()
                                          for product in products]
            for product in shopcopy[shop]['Products']:
                images = ProductImage.query.filter(
                    ProductImage.product_id == product['id']).all()
                product['ProductImages'] = [image.to_dict()
                                            for image in images]
        return shopcopy, 200
    if request.method == 'POST' and current_user.is_authenticated:
        form = CreateShopForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form.validate_on_submit()
        if not form.validate_on_submit():
            return {'error': 'The provided data could not be validated'}
        if form.validate_on_submit():
            image = form.data["image"]  # aws
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            img_url = None
            if 'url' in upload:
                img_url = upload['url']
            new_shop = Shop(
                name=form.data['name'],
                owner_id=current_user.get_id(),
                street_address=form.data['street_address'],
                city=form.data['city'],
                state=form.data['state'],
                country=form.data['country'],
                description=form.data['description'],
                category=form.data['category'],
                policies=form.data['policies'],
                sales=0,
            )
            db.session.add(new_shop)
            db.session.commit()
            recentshop = db.session.query(
                Shop).order_by(Shop.id.desc()).first()
            new_shop_img = ShopImage(
                url=img_url,  # aws
                shop_id=recentshop.id
            )
            db.session.add(new_shop_img)
            db.session.commit()
            return new_shop.to_dict(), 201


@shop_routes.route('/<int:shop_id>', methods=['DELETE', 'PUT'])
@login_required
def delete_one_shop(shop_id):
    """deletes one shop according to id, or posts edits according to id"""
    shop = Shop.query.get(shop_id)

    shop_image = ShopImage.query.filter(shop_id == shop_id).first()

    if current_user.is_authenticated and request.method == 'DELETE':
        if shop == None:
            return {"errors": "Cannot find Shop with specified id"}
        elif shop.owner_id == current_user.id:
            aws_shop_image = copy.deepcopy(shop_image).to_dict()
            db.session.delete(shop)
            remove_file_from_s3(aws_shop_image['url'])
            db.session.commit()
            return shop.to_dict(), 200
        elif shop.owner_id != current_user.id:
            return {"errors": "Only owner may delete their own shop"}
    elif current_user.is_authenticated and request.method == 'PUT':
        shop = Shop.query.get(shop_id)
        form = CreateShopForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            image = form.data["image"]  # aws
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            img_url = None
            if 'url' in upload:
                img_url = upload['url']
            img_delete = form.data['ogImage']
            remove_file_from_s3(img_delete)
            # remove_file_from_s3()
            shop.name = form.data['name']
            shop.street_address = form.data['street_address']
            shop.city = form.data['city']
            shop.state = form.data['state']
            shop.country = form.data['country']
            shop.description = form.data['description']
            shop.category = form.data['category']
            shop.policies = form.data['policies']
            shop_image = ShopImage.query.filter(
                ShopImage.shop_id == shop_id).first()
            db.session.delete(shop_image)

            new_shop_img = ShopImage(
                # url = form.data['url'],
                url=img_url,  # aws
                shop_id=shop_id
            )
            db.session.add(new_shop_img)
            db.session.commit()
            return shop.to_dict(), 201


@shop_routes.route('/<int:shop_id>')
def get_shop_by_id(shop_id):
    """view an individual shop by id"""
    shop = Shop.query.filter(Shop.id == shop_id).first()
    if shop:
        shopcopy = shop.to_dict()

        def check_followed():
            if current_user.is_authenticated:
                user = User.query.join(user_shops).filter(
                    user_shops.c.shop_id == shop_id, user_shops.c.user_id == current_user.id).first()
                if not user:
                    return {"Status": "Not Followed"}
                return {"Status": "Followed"}
            return {"Status": "User Not Signed In"}

        products = Product.query.filter(
            Product.shop_id == shopcopy['id']).all()
        shopcopy['Products'] = [product.to_dict() for product in products]
        for product in shopcopy['Products']:
            images = ProductImage.query.filter(
                ProductImage.product_id == product['id']).all()
            product['ProductImages'] = [image.to_dict() for image in images]
            reviews = ProductReview.query.filter(
                ProductReview.product_id == product['id']).all()
            product['Reviews'] = [review.to_dict() for review in reviews]
            for r in product['Reviews']:
                image = ReviewImage.query.filter(
                    ReviewImage.review_id == r['id']).first()
                if image:
                    r['ReviewImages'] = image.to_dict()
                reviewer = User.query.get(r['userId'])
                r['Reviewer'] = reviewer.to_dict()
        shop_image = image = ShopImage.query.filter(
            ShopImage.shop_id == shopcopy['id']).first()
        if shop_image:
            shopcopy['ShopImages'] = shop_image.to_dict()
        owner = User.query.get(shopcopy['ownerId'])
        shopcopy['Owner'] = owner.to_dict()
        shopcopy['Followed'] = check_followed()
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
        for shop in shopcopy:
            shopimage = ShopImage.query.filter(
                ShopImage.shop_id == shop['id']).first()
            if shopimage:
                shop['ShopImage'] = shopimage
            else:
                shop['ShopImage'] = 'shopImage not available'
        return shopcopy, 200


@shop_routes.route('/current-followed')
@login_required
def get_user_followed_shops():
    """Returns the followed shops of User"""
    if request.method == 'GET':
        shops = Shop.query.join(user_shops).filter(
            user_shops.c.user_id == current_user.id).all()
        if user_shops == None:
            return {'errors': "Cannot find shops with specified id"}
        else:
            shops_copy = copy.deepcopy(shops)
            payload = {shop.id: shop.to_dict() for shop in shops_copy}

            return payload, 200


@shop_routes.route('/current-followed/check/<int:shop_id>/', methods=['GET', 'POST'])
@login_required
def check_shop_followed(shop_id):
    """Checks if a shop is followed by user"""
    if request.method == 'GET':
        shop = user_shops.query.get(shop_id)
        if shop == None:
            return {'status': 'shop NOT followed'}
        else:
            return {'status': 'shop followed'}


@shop_routes.route('/current-followed/follow/<int:shop_id>/', methods=['GET', 'POST'])
def follow_shop(shop_id):
    """Follows a Shop"""
    # if current_user.is_authenticated:
    user = User.query.get(current_user.id)
    shop = Shop.query.get(shop_id)
    user.shops.append(shop)
    db.session.commit()
    return shop.to_dict()
    # return {'errors': 'Not authenticated'}


@shop_routes.route('/current-followed/unfollow/<int:shop_id>/', methods=['GET', 'POST'])
def unfollow_shop(shop_id):
    """Unfollows a Shop"""
    # if current_user.is_authenticated:
    user = User.query.get(current_user.id)
    shop = Shop.query.get(shop_id)
    user.shops.remove(shop)
    db.session.commit()
    return user.to_dict()
    # return {'errors': 'Not authenticated'}
