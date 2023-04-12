from flask import Blueprint, request, render_template, jsonify
from app.models import db, Product, ProductReview, ReviewImage
import copy
from flask_login import current_user, login_required
from datetime import datetime
from app.forms.post_review import ReviewForm
from app.forms.edit_review import EditReviewForm

product_review_routes = Blueprint('/product-reviews', __name__)


@product_review_routes.route('/search/<int:review_id>')
def get_review(review_id):
    """get a single review by id"""
    print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    review = ProductReview.query.filter(ProductReview.id == review_id).one()
    print(review.to_dict())
    if review:
        return review.to_dict()
    
    return {'Review Not Found'}, 404



@product_review_routes.route('/')
def get_all_reviews():
    """returns all reviews, which if normalized is useful for state"""
    reviews = ProductReview.query.all()
    reviewcopy = copy.deepcopy(reviews)
    def get_review_images(id):
        images = ReviewImage.query.filter(ReviewImage.review_id == id).all()
        return [r.to_dict() for r in images]
    payload = { review.id: review.to_dict() for review in reviewcopy }
    for review in payload.values():
        review['ReviewImages'] = get_review_images(review['id'])
    return { 'ProductReviews': payload }, 200

@product_review_routes.route('/<int:product_id>')
def get_reviews_of_product(product_id):
    """returns one reviews of the specified productid"""
    print('reviews back end here --------------------------')
    reviews = ProductReview.query.filter(ProductReview.product_id == product_id).all()
    def review_image(review_id):
        review_image = ReviewImage.query.filter(ReviewImage.review_id==review_id).first()
        return review_image.to_dict()

    reviewcopy = [review.to_dict() for review in reviews]
    for review in reviewcopy:
        review['ReviewImages'] = review_image(review['id'])
    return reviewcopy, 200

@product_review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review_by_id(review_id):
    """delete a review by id if the owner is signed in"""
    if current_user.is_authenticated:
        review = ProductReview.query.filter(ProductReview.id == review_id).first()
        if review == None:
            return { "error": "Review with specified ID does not exist."}
        if review.user_id == current_user.id:
            db.session.delete(review)
            db.session.commit()
            return review.to_dict()
        elif review.user_id != current_user.id:
            return {"error": "Only the owner of the review may delete it"}
    else:
        {"error": "Please sign in to delete a review"}

@product_review_routes.route('/<int:product_id>/new', methods=['POST'])
@login_required
def post_review(product_id):
    # declare form here
    form = ReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('validating')
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

        print('new review', new_review.to_dict())

        return {'New Review': new_review.to_dict()}


    return {'Error': 'Validation Error'}, 401

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
        
    return {'Review does not exist or user did not write this review'}


# @product_review_routes.route('/<int:review_id>')
# def get_review(review_id):
#     """get a single review by id"""
#     print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
#     review = ProductReview.query.filter(ProductReview.id == review_id).one()
#     print(review.to_dict())
#     if review:
#         review_dict = review.to_dict()
#         # review_dict['product'] = review.products()
#         review = review_dict
#         print('review backend',review)
#         return {review}
    
#     return {'Review Not Found'}, 404