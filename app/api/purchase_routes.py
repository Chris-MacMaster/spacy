from flask import Blueprint, jsonify, request, session
from flask_login import current_user, login_required
from app.models import Purchase, Product, db, ProductReview
from app.forms import PurchaseForm
purchase_routes = Blueprint('/purchases', __name__)


@purchase_routes.route('/shop/<int:shop_id>')
@login_required
def all_purchases(shop_id):
    """Get all shop purchases"""

    purchases = Purchase.query.filter(
        Purchase.shop_id == shop_id).join(Product)
    return_obj = {}
    for purchase in purchases:
        return_obj[purchase.id] = purchase.to_dict()
        return_obj[purchase.id]['productName'] = purchase.product.name
        return_obj[purchase.id]['shopName'] = purchase.product.shops.name
        return_obj[purchase.id]["quantity"] = purchase.quantity
        return_obj[purchase.id]["price"] = purchase.product.price
        return_obj[purchase.id]["shopName"] = purchase.product.shops.name
        return_obj[purchase.id]["shopId"] = purchase.product.shops.id
        return_obj[purchase.id]["productImage"] = purchase.product.product_images[0].url
        return_obj[purchase.id]["shopImage"] = purchase.product.shops.shop_images[0].url
    return return_obj, 200


@purchase_routes.route('/')
@login_required
def purchases():
    """Get all user purchases"""

    purchases = Purchase.query.filter(
        Purchase.user_id == current_user.id).join(Product).all()
    return_obj = {}
    for purchase in purchases:
        return_obj[purchase.id] = purchase.to_dict()
        return_obj[purchase.id]['productName'] = purchase.product.name
        return_obj[purchase.id]['shopName'] = purchase.product.shops.name
        return_obj[purchase.id]["quantity"] = purchase.quantity
        return_obj[purchase.id]["price"] = purchase.product.price
        return_obj[purchase.id]["shopName"] = purchase.product.shops.name
        return_obj[purchase.id]["shopId"] = purchase.product.shops.id
        return_obj[purchase.id]["productImage"] = purchase.product.product_images[0].url
        return_obj[purchase.id]["shopImage"] = purchase.product.shops.shop_images[0].url

        review = ProductReview.query.filter((ProductReview.user_id == current_user.id)
                                            & (ProductReview.product_id == purchase.product.id)).first()
        if review:
            pass
            return_obj[purchase.id]["review"] = review.review
            return_obj[purchase.id]["stars"] = review.stars
            return_obj[purchase.id]["reviewId"] = review.id

        # print(review)

    return return_obj, 200


@purchase_routes.route('/', methods=['POST'])
def userless_purchase():
    form = PurchaseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        purchases_dict = request.get_json()
        purchases_list = purchases_dict.values()
        for purchase in purchases_list:
            product = Product.query.get(purchase['productId'])
            product.available = product.available - int(purchase['quantity'])
            db.session.add(product)
            db.session.add(Purchase(
                quantity=purchase['quantity'],
                product_id=purchase['productId'],
                shop_id=purchase['shopId']
            ))
        db.session.commit()
        return {}, 200

    # print(form.data)
    return {}, 400
