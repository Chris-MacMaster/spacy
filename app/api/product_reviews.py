from flask import Blueprint
from app.models import db, Product, ProductReview, ReviewImage
import copy
product_review_routes = Blueprint('/productReviews', __name__)

@product_review_routes.route('/')
def get_all_reviews():
    """returns all reviews, which if normalized is useful for state"""
    print("TRIGGERED")
    reviews = ProductReview.query.all()
    reviewcopy = copy.deepcopy(reviews)
    def get_review_images(id):
        return ReviewImage.query.filter(ProductReview.id == id).all()
    payload = { review.id: review.to_dict() for review in reviews }
    for review in payload.values():
        review_image = get_review_images(review['id'])
        review['ReviewImages'] = review_image.to_dict()
    return { 'ProductReviews': payload }, 200

# blocker, not getting triggered
@product_review_routes.route('/<int:product_id>')
def get_product_reviews(product_id):
    """returns all reviews for the specified product"""
    print("BACKEND RESPONSE")
    reviews = ProductReview.query.filter_by(product_id=product_id).all()
    return reviews.to_dict(), 200