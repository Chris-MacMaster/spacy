from flask import Blueprint, jsonify, redirect, request
from app.models import db, Product, Shop, ProductImage, ProductReview
from flask_login import current_user, login_required
import copy
from datetime import datetime
from app.forms import CreateProductForm

product_routes = Blueprint('/products', __name__)

@product_routes.route('/<int:product_id>/', methods=['GET', 'DELETE', 'PUT'])
def get_one_product(product_id):
    """returns one product with the specified id"""
    if request.method == 'GET':
        product = Product.query.get(product_id)
        productcopy = product.to_dict()
        shop = Shop.query.get(product.shop_id)
        images = ProductImage.query.filter(ProductImage.product_id==product_id).all()
        productcopy['ProductImages'] = [image.to_dict() for image in images]
        productcopy['Shop'] = shop.to_dict()
        def get_reviews(id):
            reviews = ProductReview.query.filter(ProductReview.product_id == id).all()
            return [r.to_dict() for r in reviews]
        reviews = get_reviews(productcopy['id'])
        sum =0
        for r in reviews:
            sum += r['stars']
        productcopy['Reviews'] = reviews
        productcopy['avgRating'] = round(sum / len(reviews), 1) if len(reviews) else "New"
        return productcopy, 200
    elif request.method == 'DELETE':
        if current_user.is_authenticated:
            product = Product.query.filter_by(id=product_id).first()
            if product == None:
                return { 'errors': "Cannot find product with specified id"}
            #insert owner validation or front end conditional displays?
            else:
                db.session.delete(product)
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
                # addnig an associated image for the newly created product
                product_image = ProductImage.query.filter(ProductImage.product_id == product_id).all()
                first_img = product_image[0]
                for img in product_image:
                    if img.id < first_img.id:
                        first_img = img
                first_img.url = form.data["url"]
                db.session.commit()
                return product.to_dict(), 201

@product_routes.route('/', methods=['GET', 'POST'])
def get_all_products():
    """returns all products regardless of session"""
    # get products
    if request.method == "GET":
        products = Product.query.all()
        productcopy = copy.deepcopy(products)
        def get_images(id):
            return ProductImage.query.filter(ProductImage.product_id == id).all()
        def get_reviews(id):
            return ProductReview.query.filter(ProductReview.product_id == id).all()
        payload = {  product.id: product.to_dict() for product in productcopy }
        for product in payload.values():
            product_images = get_images(product['id'])
            product['ProductImages'] = [image.to_dict() for image in product_images]
            review_sum = 0
            reviews = get_reviews(product['id'])
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
            # adding an associated image for the newly created product
            new_product_list = Product.query.all()
            new_product = new_product_list[-1]
            new_product_img = ProductImage(
                url = form.data["url"],
                product_id = new_product.id,
            )
            db.session.add(new_product_img)
            db.session.commit()
            return new_product.to_dict(), 201
