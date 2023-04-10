from flask import Blueprint
from app.models import db, Product, ProductReview, ReviewImage
import copy
product_review_routes = Blueprint('/productReviews', __name__)

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
