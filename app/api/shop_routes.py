from flask import Blueprint, jsonify, request, redirect
from app.models import db, Product, Shop, ShopImage, ProductImage, User, ProductReview, ReviewImage, user_shops
from flask_login import current_user, login_required
import copy
shop_routes = Blueprint('/shops', __name__)
from app.api.AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

from app.forms import CreateShopForm

@shop_routes.route('/', methods=['GET', 'POST'])
def get_all_shops():
    """returns all shops regardless of session, or posts a new shop"""
    if request.method == 'GET':
        shops = Shop.query.all()
        shopcopy = { str(shop.id): shop.to_dict() for shop in shops}
        def shop_products(id):
            products = Product.query.filter(Product.shop_id == id).all()
            return [product.to_dict() for product in products]
        def get_images(id):
            images = ProductImage.query.filter(ProductImage.product_id == id).all()
            return [image.to_dict() for image in images]
        def get_shop_images(id):
            image = ShopImage.query.filter(ShopImage.shop_id == id).first()
            if image:
                return image.to_dict()
        for shop in shopcopy:
            shopimage = get_shop_images(shopcopy[shop]['id'])
            if shopimage:
                shopcopy[shop]['ShopImage'] = shopimage
            else:
                shopcopy[shop]['ShopImage'] = 'shopImage not available'
            shopcopy[shop]['Products'] = shop_products(shopcopy[shop]['id'])
            for product in shopcopy[shop]['Products']:
                product['ProductImages'] = get_images(product['id'])
        return shopcopy, 200
    if request.method == 'POST' and current_user.is_authenticated:
        form = CreateShopForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form.validate_on_submit()
        if not form.validate_on_submit():
            return {'error': 'The provided data could not be validated'}
        if form.validate_on_submit():

            image = form.data["image"] #aws
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            img_url = None
            if 'url' in upload:
                img_url = upload['url']
            
            new_shop = Shop(
                name = form.data['name'],
                owner_id = current_user.get_id(),
                street_address = form.data['street_address'],
                city = form.data['city'],
                state = form.data['state'],
                country = form.data['country'],
                description = form.data['description'],
                category = form.data['category'],
                policies = form.data['policies'],
                sales = 0,
            )
            db.session.add(new_shop)
            db.session.commit()
            recentshop = db.session.query(Shop).order_by(Shop.id.desc()).first()
            new_shop_img = ShopImage(
                # url = form.data['url'],
                url = img_url, #aws
                shop_id = recentshop.id
            )
            db.session.add(new_shop_img)
            db.session.commit()
            return new_shop.to_dict(), 201

@shop_routes.route('/<int:shop_id>', methods=['DELETE', 'PUT'])
@login_required
def delete_one_shop(shop_id):
    """deletes one shop according to id, or posts edits according to id"""
    shop = Shop.query.get(shop_id)
    shop_image = ShopImage.query.get(shop_id)
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
        # shop_image = ShopImage.query.filter(ShopImage.shop_id == shop_id).first()
        # db.session.delete(shop_image)
        form = CreateShopForm()
        
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            image = form.data["image"] #aws
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
            shop_image = ShopImage.query.filter(ShopImage.shop_id == shop_id).first()
            db.session.delete(shop_image)

            new_shop_img = ShopImage(
                # url = form.data['url'],
                url = img_url, #aws
                shop_id = shop_id
            )

            db.session.add(new_shop_img)

            # shop_image = ShopImage.query.filter(ShopImage.shop_id == shop_id).first()
            # shop_image.url = form.data['url']
            db.session.commit()
            return shop.to_dict(), 201

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
                r['Reviewer'] = get_owner(r['userId'])
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



@shop_routes.route('/current-followed')
@login_required
def get_user_followed_shops():
    print("HIT URL")
    print("HIT URL")
    print("HIT URL")
    print("HIT URL")
    print("HIT URL")
    print("HIT URL")
    print("HIT URL")
    print("HIT URL")
    """Returns the followed shops of User"""
    if request.method == 'GET':
        shops = Shop.query.join(user_shops).filter(user_shops.c.user_id == current_user.id).all()
        if user_shops == None:
            return {'errors': "Cannot find shops with specified id"}
        else:
            shops_copy = copy.deepcopy(shops)
            payload = {shop.id: shop.to_dict() for shop in shops_copy}


            return payload, 200