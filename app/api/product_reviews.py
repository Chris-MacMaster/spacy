from flask import Blueprint
from app.models import db, Product, ProductReview

product_review_routes = Blueprint('/productReviews', __name__)

@product_review_routes.route('/')
def get_all_reviews():
    """returns all reviews, which if normalized is useful for state"""
    reviews = ProductReview.query.all()
