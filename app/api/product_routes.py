from flask import Blueprint, jsonify, redirect, request
from app.models import db, Product, Shop, ProductImage, ProductReview
from flask_login import current_user, login_required
import copy
from datetime import datetime

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
    return { 'Products': payload}, 200

@product_routes.route('/current')
@login_required
def current_users_products():
    """returns a list of all products of current user"""
    print('THE ROUTE IS BEING HIT')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print(request)
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    if current_user.is_authenticated:
        print ("HIT ME BABY")
        # products = Product.query.filter_by(user_id=current_user.id).all()
        # return { 'Products': {product.id: product.to_dict() for product in products } }, 200
        return { 'Product': 4}
    return '<h1>Please create an account</h1>'


# add other details to response
@product_routes.route('/<int:product_id>')
def get_one_product(product_id):
    """returns one product with the specified id"""
    product = Product.query.filter_by(id=product_id).first()
    return product.to_dict(), 200


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

# marc
@product_routes.route('/<int:id>/reviews')
def get_product_reviews(id):
    """gets product reviews"""
    reviews = ProductReview.query.filter(ProductReview.product_id == id).all()
    return [review.to_dict() for review in reviews]

@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def post_product_review(id):
    """post a new product review"""
    product = Product.query.filter(Product.id == id).all()

    new_review = ProductReview(
        review =  request.data['review'],
        product_id =  product['id'], 
        user_id =  current_user['id'],
        stars =  request.data['stars'],
        created_at =  datetime.now(),
        updated_at = datetime.now()
    )

    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict()

@product_routes.route('/<int:id>/reviews', methods=['PUT'])
@login_required
def edit_review(id):
    """edit a product review"""
    review_to_edit = ProductReview.query.filter(ProductReview.product_id == id and ProductReview.user_id == current_user.id).one()

    review_to_edit['review'] = request.data['review']
    review_to_edit['stars'] = request.data['stars']
    review_to_edit['updated_at'] = datetime.now()

    db.session.commit()

    return review_to_edit.to_dict()

@product_routes.route('/<int:id>/reviews', methods=['DELETE'])
@login_required
def delete_review(id):
    """deletes review"""
    review_to_delete = ProductReview.query.filter(ProductReview.product_id == id and ProductReview.user_id == current_user.id).one()

    db.session.delete(review_to_delete)
    db.session.commit()

    return {'review deleted'}, 200