from flask import Blueprint, jsonify, request
from app.models import db, Product, Shop, User


search_route = Blueprint('/search', __name__)

@search_route.route('/search', methods=['POST'])
def search():
    """search database for results"""
    parameters = request.data['parameters'] #placeholder variable name
    products_results = Product.query().filter(Product.name.like("%{parameters}%")
                                or Product.category == parameters
                                or [Shop.name == parameters for Product.shops.name in Product.shops]).all()
    
    if products_results:
        return jsonify(products_results), 200
    return {'No results match those terms'}, 404
    
    
