from flask import Blueprint, jsonify, redirect, request
from app.models import db, Product, Shop, ProductImage, ProductReview
from flask_login import current_user, login_required
import copy

product_routes = Blueprint('/products', __name__)

@product_routes.route('/')
def get_all_products():
    """returns all products regardless of session"""
    # get products
    products = Product.query.all()

    productcopy = copy.deepcopy(products)
    # helper function to get associated images of each product
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

@product_routes.route('/current')
@login_required
def current_users_products():
    """returns a list of all products of current user"""
    print('THE ROUTE IS BEING HIT')

    if current_user.is_authenticated:
        shops = Shop.query.filter_by(owner_id=current_user.id).all()
        products = [Product.query.filter_by(shop_id=shop.id).all() for shop in shops]

       # return { 'Products': {product.id: product.to_dict() for product in products } }, 200
        # payload = {  product.id: product.to_dict() for product in productcopy }

        #for i in products[0]:
        #    print(i.to_dict())

        return { 'Products': {product.id: product.to_dict() for product in products[0]}, }, 200

    return '<h1>Please create an account</h1>'


# add other details to response
@product_routes.route('/<int:product_id>')
def get_one_product(product_id):
    """returns one product with the specified id"""
    product = Product.query.filter_by(id=product_id).first()
    productcopy = product.to_dict()
    shop = Shop.query.filter_by(id=product.shop_id).first()
    images = ProductImage.query.filter(ProductImage.product_id==product_id).all()
    productcopy['ProductImages'] = [image.to_dict() for image in images]
    productcopy['Shop'] = shop.to_dict()

    return productcopy, 200


#DEMO TESTING POST ROUTE, NOT CONNECTED TO FORM/USER INPUT YET
#running "post" for url in postman works, but not url entry yet
@product_routes.route('/new', methods=["POST"])
def make_new_product():
    """makes a new product"""
    product = Product(
        available = 20,
        category = 'Jewelry',
        description = 'Test description',
        free_shipping = True,
        name = "Test Name",
        price = 29.99,
    )
    db.session.add(product)
    db.session.commit()
    return redirect('/')





#DEMO POST
# @product_routes.route('/')
