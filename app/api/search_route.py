from flask import Blueprint, jsonify, request
from app.models import db, Product, Shop, User, ProductImage
from sqlalchemy import or_

search_route = Blueprint('/search', __name__)

# @search_route.route('/search/<str:parameters>', methods=['POST'])
# def search(parameters):
#     """search database for results"""
#     if request.method == 'POST':

#         # parameters = request.data['parameters'] #placeholder variable name
#         products_results = Product.query().filter(Product.name.like("%{parameters}%")
#                                 or Product.category == parameters
#                                 or [Shop.name == parameters for Product.shops.name in Product.shops]).all()
    
#         if products_results:
#             return jsonify(products_results), 200
#         return {'No results match those terms'}, 404
#     return None

@search_route.route('/<parameters>')
def search(parameters):
        def get_images(id):
            return ProductImage.query.filter(ProductImage.product_id == id).all()
        
        print(parameters)

        shop_results = db.session.query(Shop).filter(Shop.name.like(parameters)).all()
        # print('shops', shop_results)
        # for shop in shop_results:
        #         print('shop products', shop.products.to_dict())

        products_results = db.session.query(Product).filter(or_(Product.name.ilike(f'%{parameters}%'),
                                                                Product.category.ilike(parameters)
                                                                )).all()
        
        list_1 = [product.to_dict() for product in products_results]


        list_2 = []
        for shop in shop_results:
                for product in shop.products:
                        list_2.append(product.to_dict())
                
        for product in list_1:
            product_images = get_images(product['id'])
            product['ProductImages'] = [image.to_dict() for image in product_images]

        for product in list_2:
            product_images = get_images(product['id'])
            product['ProductImages'] = [image.to_dict() for image in product_images]


        full_list = list_1 + list_2         
        print('results backend', full_list) #to dict
        if products_results and shop_results:
                return jsonify({'products': full_list})
        elif products_results and not shop_results:
                return jsonify(list_1)
        elif shop_results and not products_results:
                return jsonify({'products': list_2})
        else:    
            return {'result': 'No items found'}
