from flask import Blueprint
from app.models import db, Product, ProductReview, ReviewImage
import copy
from flask_login import current_user, login_required
product_review_routes = Blueprint('/product-reviews', __name__)

@product_review_routes.route('/')
def get_all_reviews():
    """returns all reviews, which if normalized is useful for state"""
    reviews = ProductReview.query.all()
    reviewcopy = copy.deepcopy(reviews)
    def get_review_images(id):
        return ReviewImage.query.filter(ProductReview.id == id).all()
    payload = { review.id: review.to_dict() for review in reviewcopy }
    for review in payload.values():
        review_image = get_review_images(review['id'])
        review['ReviewImages'] = review_image.to_dict()
    return { 'ProductReviews': payload }, 200

@product_review_routes.route('/<int:product_id>')
def get_reviews_of_product(product_id):
    """returns one reviews of the specified productid"""

    reviews = ProductReview.query.filter(ProductReview.product_id == product_id).all()
    def review_image(review_id):
        review_image = ReviewImage.query.filter(ReviewImage.review_id==review_id).first()
        return review_image.to_dict()

    reviewcopy = [review.to_dict() for review in reviews]
    for review in reviewcopy:
        review['ReviewImages'] = review_image(review['id'])
    return reviewcopy, 200

@product_review_routes.route('/<int:review_id>')
@login_required
def delete_review_by_id():
    pass
