from flask import Blueprint, jsonify, redirect, request
from app.models import db, Product, Shop, ProductImage, ProductReview, ShopImage, User, user_shops
from flask_login import current_user, login_required
import copy
from datetime import datetime
from app.forms import CreateProductForm
from app.api.AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

product_routes = Blueprint('/products', __name__)

@product_routes.route('/<int:product_id>/', methods=['GET', 'DELETE', 'PUT'])
def get_one_product(product_id):
    """returns one product with the specified id"""
    if request.method == 'GET':
        product = Product.query.get(product_id)
        productcopy = product.to_dict()
        shop = Shop.query.get(product.shop_id)
        shop_image = ShopImage.query.filter_by(shop_id = product.shop_id).first()
        images = ProductImage.query.filter(ProductImage.product_id==product_id).all()
        productcopy['ProductImages'] = [image.to_dict() for image in images]
        productcopy['Shop'] = shop.to_dict()
        productcopy['shopImage'] = shop_image.to_dict()['url']

        def check_followed():
            if current_user.is_authenticated:
                user = User.query.join(user_shops).filter(user_shops.c.shop_id == product.shop_id, user_shops.c.user_id == current_user.id).first()
                if not user:
                    return {"Status" : "Not Followed"}
                return {"Status" : "Followed"}
            return {"Status" : "User Not Signed In"}

        productcopy['Shop']['Followed'] = check_followed()
        reviews = ProductReview.query.filter(ProductReview.product_id == product_id).all()
        sum = 0
        for r in reviews:
            sum += r.stars
        productcopy['Reviews'] = [review.to_dict() for review in reviews]
        productcopy['avgRating'] = round(sum / len(reviews), 1) if len(reviews) else "New"
        return productcopy, 200
    elif request.method == 'DELETE':
        if current_user.is_authenticated:
            product = Product.query.get(product_id)
            images = ProductImage.query.filter(ProductImage.product_id == product_id).all()
            if product == None:
                return { 'errors': "Cannot find product with specified id"}
            #insert owner validation or front end conditional displays?
            else:
                images_delete = [image.to_dict() for image in images]
                db.session.delete(product)
                for image in images_delete:
                    remove_file_from_s3(image['url'])
                db.session.commit()
                return product.to_dict(), 200
        return { 'errors': 'Not authenticated'}
    elif request.method == 'PUT':
        if current_user.is_authenticated:
            product = Product.query.get(product_id)
            form = CreateProductForm() # make edit form
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                product.shop_id = form.data["shop_id"]
                product.name = form.data["name"]
                product.description = form.data["description"]
                product.category = form.data["category"]
                product.available = form.data["available"]
                product.free_shipping = form.data["free_shipping"]
                product.price = form.data["price"]
                db.session.commit()
                # adding an associated image for the newly created product
                product_image = ProductImage.query.filter(ProductImage.product_id == product_id).all()
                first_img = product_image[0]
                for img in product_image:
                    if img.id < first_img.id:
                        first_img = img
                # first_img.url = form.data["url"]
                first_img.url = form.data["image"] #aws
                db.session.commit()
                return product.to_dict(), 201

@product_routes.route('/', methods=['GET', 'POST'])
def get_all_products():
    """returns all products regardless of session"""
    # get products
    if request.method == "GET":
        products = Product.query.all()
        payload = {  product.id: product.to_dict() for product in products }
        for product in payload.values():
            product_images = ProductImage.query.filter(ProductImage.product_id == product['id']).all()
            product['ProductImages'] = [image.to_dict() for image in product_images]
            reviews = ProductReview.query.filter(ProductReview.product_id == product['id']).all()
            review_sum = 0
            for review in reviews:
                review_sum += review.stars
            product['avgRating'] = round(review_sum / len(reviews), 1) if len(reviews) > 0 else 'New!'
        return  payload, 200
    elif request.method == "POST":
        form = CreateProductForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if not form.validate_on_submit():
            raise ValueError("Failed flask form validation")
        if form.validate_on_submit():
            image = form.data["image"] #aws
            new_product = Product(
                shop_id = form.data["shop_id"],
                name = form.data["name"],
                description = form.data["description"],
                category = form.data["category"],
                available = form.data["available"],
                free_shipping = form.data["free_shipping"],
                price = form.data["price"]
            )
            db.session.add(new_product)
            db.session.commit()

            print('')
            print('')
            print('')
            print('')
            print('')
            print('')
            print('')
            print('REQUEST FILES', request.files)
            print('IMAGE', image)
            print('')
            print('')
            print('')
            print('')
            print('')

            for key in request.files:
                file = request.files[key]
                file.filename = get_unique_filename(file.filename)
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("FILENAME", file.filename)
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                upload = upload_file_to_s3(file)
                img_url = None
                print("")
                print("")
                print("")
                print("")
                print("")
                print("UPLOAD URL", upload['url'])
                print("")
                print("")
                print("")
                print("")
                print("")
                if 'url' in upload:
                    img_url = upload['url']

                # adding an associated image for the newly created product
                new_product_list = Product.query.all()
                new_product = new_product_list[-1]
                new_product_img = ProductImage(
                    url = img_url, #aws
                    product_id = new_product.id,
                )
                db.session.add(new_product_img)

            db.session.commit()
            return new_product.to_dict(), 201
