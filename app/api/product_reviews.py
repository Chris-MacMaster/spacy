from flask import Blueprint, request, render_template, jsonify
from app.models import db, Product, ProductReview, ReviewImage, ProductImage, Shop, User
import copy
from flask_login import current_user, login_required
from datetime import datetime
from app.forms.post_review import ReviewForm
from app.forms.edit_review import EditReviewForm

product_review_routes = Blueprint('/product-reviews', __name__)

@product_review_routes.route('/search/<int:review_id>')
def get_review(review_id):
    """get a single review by id"""
    review = ProductReview.query.get(review_id)
    if review:
        product = Product.query.get(review.product_id)
        product_images = ProductImage.query.filter(ProductImage.product_id == product.id).all()
        shop = Shop.query.get(product.shop_id)
        review_payload = review.to_dict()
        review_payload['Product'] = product.to_dict()
        if product_images:
            review_payload['Product']['ProductImages'] = [image.to_dict() for image in product_images]
        if shop:
            review_payload['Product']['Shop'] = shop.to_dict()
        return review_payload
    return {'Review Not Found'}, 404

@product_review_routes.route('/')
def get_all_reviews():
    """returns a normalized dictionary of reviews"""
    reviews = ProductReview.query.all()
    payload = { review.id: review.to_dict() for review in reviews }
    for review in payload.values():
        images = ReviewImage.query.filter(ReviewImage.review_id == review['id']).all()
        review['ReviewImages'] = [images.to_dict() for images in images]
    return { 'ProductReviews': payload }, 200

@product_review_routes.route('/<int:product_id>')
def get_reviews_of_product(product_id):
    """returns reviews of the specified productid"""
    reviews = ProductReview.query.filter(ProductReview.product_id == product_id).all()
    payload = { }
    for review in reviews:
        payload[review.id] = review.to_dict()
    for review in payload.values():
        review_image = ReviewImage.query.filter(ReviewImage.review_id==review['id']).first()
        if review_image:
            review['ReviewImages'] = review_image.to_dict()
        review_user = User.query.get(review['userId'])
        review['User'] = review_user.to_dict()
    return payload, 200

@product_review_routes.route('/<int:review_id>/delete', methods=['DELETE'])
@login_required
def delete_review_by_id(review_id):
    """delete a review by id if the owner is signed in"""
    if current_user.is_authenticated:
        review = ProductReview.query.get(review_id)
        if review == None:
            return { "error": "Review with specified ID does not exist."}
        if review.user_id == current_user.id:
            db.session.delete(review)
            db.session.commit()
            return {'Message': 'Review Deleted'}
        if review.user_id != current_user.id:
            return {"error": "Only the owner of the review may delete it"}
    else:
        {"error": "Please sign in to delete a review"}

@product_review_routes.route('/<int:product_id>/new', methods=['POST'])
@login_required
def post_review(product_id):
    """posts a review by product id if a user is signed in"""
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_review = ProductReview(
            review = data['review'],
            product_id = product_id,
            user_id = current_user.id,
            stars = data['stars'],
            created_at = datetime.now(),
            updated_at = None
        )
        db.session.add(new_review)
        db.session.commit()
        # review_image
        if data['image']:
            review_image = ReviewImage(
                url = data['image'],
                created_at = datetime.now(),
                review_id = new_review.id
            )
            db.session.add(review_image)
            db.session.commit()
        review_dict = new_review.to_dict()
        image = ReviewImage.query.filter(ReviewImage.review_id == new_review.id).first()
        if image:
            review_dict['ReviewImages'] = image.to_dict()
        return review_dict
    return {'error': 'Validation Error'}, 401

@product_review_routes.route('/<int:review_id>/edit', methods=['PUT'])
@login_required
def edit_review(review_id):
    """edit a product review"""
    review_to_edit = ProductReview.query.get(review_id)
    form = EditReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if review_to_edit:
        if form.validate_on_submit:
            review_to_edit.review = form.data['review']
            review_to_edit.stars = form.data['stars']
            review_to_edit.updated_at = datetime.now()
            db.session.commit()
            return review_to_edit.to_dict()
    return {"error": 'Review does not exist or user did not write this review'}

@product_review_routes.route('/<int:review_id>/add-image', methods=['PUT'])
@login_required
def add_image_to_review(review_id):
    review = ProductReview.query.get(review_id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if review:
        if form.validate_on_submit:
            review.image = form.data['image']
            return {review.to_dict()}
    return {'No review'}
