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
    #this delete isn't getting hit because of route above right?
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
            # print("query passed ---------------------")
            form = CreateProductForm() # make edit form
            # print("form created --------------------")
            form['csrf_token'].data = request.cookies['csrf_token']
            # print('csrf passed -------------------------')
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
                product_image = ProductImage.query.get(product_id)
                product_image.url = form.data["img_1"]
                db.session.commit()
                return product.to_dict(), 201
            # print('validations failed! ----------------')




@product_routes.route('/', methods=['GET', 'POST'])
def get_all_products():
    """returns all products regardless of session"""
    # get products
    print('HITS ROUTE ---------------------------')
    if request.method == "GET":
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
    #POSTS NEW PRODUCT
    elif request.method == "POST":
        # print('PAST METHOD CHECKER ------------------------------')
        form = CreateProductForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if not form.validate_on_submit():
            print("NOT VALIDATED --------------------------------")
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
            # addnig an associated image for the newly created product
            new_product_list = Product.query.all()
            new_product = new_product_list[-1]
            new_product_img = ProductImage(
                url = form.data["img_1"],
                product_id = new_product.id,
            )
            db.session.add(new_product_img)
            db.session.commit()

            return new_product.to_dict(), 201





# @product_routes.route('/current')
# @login_required
# def current_users_products():
#     """returns a list of all products of current user"""
#     # print('THE ROUTE IS BEING HIT')

#     if current_user.is_authenticated:
#         shops = Shop.query.filter_by(owner_id=current_user.id).all()
#         products = [Product.query.filter_by(shop_id=shop.id).all() for shop in shops]

#        # return { 'Products': {product.id: product.to_dict() for product in products } }, 200
#         # payload = {  product.id: product.to_dict() for product in productcopy }

#         #for i in products[0]:
#         #    print(i.to_dict())

#         return {product.id: product.to_dict() for product in products[0]}, 200

#     return '<h1>Please create an account</h1>'

# @product_routes.route('/<int:product_id>', methods=['DELETE'])
# @login_required
# def delete_product_by_id(product_id):
#     """delete a product by id only if the user is authenticated"""
#     if current_user.is_authenticated:
#         product = Product.query.filter(Product.id==product_id).first()
#         if product == None:
#             return {"error": "Product with that id does not exist"}
#         shop = Shop.query.filter(Shop.id==product.shop_id).first()

#         if shop.owner_id == current_user.id:
#             db.session.delete(product)
#             db.session.commit()
#             return product.to_dict(), 200
#         elif shop.owner_id != current_user.id:
#             return {"error": "Only the owner of a product may delete it."}
#     else:
#         {"error": "Please sign in to delete one of your products."}


# add other details to response









#DEMO TESTING POST ROUTE, NOT CONNECTED TO FORM/USER INPUT YET
#running "post" for url in postman works, but not url entry yet
# @product_routes.route('/new', methods=["POST"])
# def make_new_product():
#     """makes a new product"""
#     product = Product(
#         available = 20,
#         category = 'Jewelry',
#         description = 'Test description',
#         free_shipping = True,
#         name = "Test Name",
#         price = 29.99,
#     )
#     db.session.add(product)
#     db.session.commit()

    # return redirect('/')





#DEMO POST
# @product_routes.route('/')

# marc
# @product_routes.route('/<int:id>/reviews')
# def get_product_reviews(id):
#     """gets product reviews"""
#     reviews = ProductReview.query.filter(ProductReview.product_id == id).all()
#     return [review.to_dict() for review in reviews]

# @product_routes.route('/<int:id>/reviews', methods=['POST'])
# @login_required
# def post_product_review(id):
#     """post a new product review"""
#     product = Product.query.filter(Product.id == id).all()

#     new_review = ProductReview(
#         review =  request.data['review'],
#         product_id =  product['id'],
#         user_id =  current_user['id'],
#         stars =  request.data['stars'],
#         created_at =  datetime.now(),
#         updated_at = datetime.now()
#     )

#     db.session.add(new_review)
#     db.session.commit()

#     return new_review.to_dict()

# @product_routes.route('/<int:id>/reviews', methods=['PUT'])
# @login_required
# def edit_review(id):
#     """edit a product review"""
#     review_to_edit = ProductReview.query.filter(ProductReview.product_id == id and ProductReview.user_id == current_user.id).one()

#     review_to_edit['review'] = request.data['review']
#     review_to_edit['stars'] = request.data['stars']
#     review_to_edit['updated_at'] = datetime.now()

#     db.session.commit()

#     return review_to_edit.to_dict()

# @product_routes.route('/<int:id>/reviews', methods=['DELETE'])
# @login_required
# def delete_review(id):
#     """deletes review"""
#     review_to_delete = ProductReview.query.filter(ProductReview.product_id == id and ProductReview.user_id == current_user.id).one()

#     db.session.delete(review_to_delete)
#     db.session.commit()

#     return {'review deleted'}, 200
