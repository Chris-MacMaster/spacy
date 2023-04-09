from flask import Blueprint, jsonify, redirect, render_template
from app.models import db, Product, Shop, User
from flask_login import current_user, login_required

product_routes = Blueprint('/products', __name__)


@product_routes.route('/')
def get_all_products():
    """returns all products regardless of session"""
    products = Product.query.all()
    # WORKING ORIGINAL CODE
    # return { 'Products': { product.id: product.to_dict() for product in products } }, 200

    # ATTEMPT TO MAKE COMPATIBLE WITH TEMPLATE
    formatted_products = { 'Products': { product.id: product.to_dict() for product in products } }
    return render_template("main_page.html", products = products)




@product_routes.route('/current')
@login_required
def current_users_products():
    """returns a list of all products of current user"""
    print('THE ROUTE IS BEING HIT')
    if current_user.is_authenticated:
        products = Product.query.filter_by(user_id=current_user.id).all()
        return { 'Products': {product.id: product.to_dict() for product in products } }, 200
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
