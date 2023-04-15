from flask import Blueprint, jsonify, request
from app.models import db, Product, Shop, User, ProductImage, ProductReview
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
        def get_reviews(id):
            return ProductReview.query.filter(ProductReview.product_id == id).all()
        def get_shop(id):
              return Shop.query.filter(Shop.id == id).one()
        
        print(parameters)

        shop_results = db.session.query(Shop).filter(Shop.name.like(parameters)).all()
        # print('shops', shop_results)
        # for shop in shop_results:
        #         print('shop products', shop.products.to_dict())

        products_results = db.session.query(Product).filter(or_(Product.name.ilike(f'%{parameters}%'),
                                                                Product.category.ilike(parameters)
                                                                )).all()
        
        for product in products_results:
            #   product['reviews'] = []
            #   for review in product.product_reviews:
            #         product['reviews'].append(review.to_dict())
              print('reviews', len(product.product_reviews))
              print('')
              print('')
              print('')
              print('')
              print('')
              print('')
              print('')
              print('')
              print('')
              print('')


        list_1 = [product.to_dict() for product in products_results]



        list_2 = []
        for shop in shop_results:
                for product in shop.products:
                        list_2.append(product.to_dict())
                
        for product in list_1:
            product_images = get_images(product['id'])
            product['ProductImages'] = [image.to_dict() for image in product_images]
            
            review_sum = 0
            reviews = get_reviews(product['id'])
            for review in reviews:
                review_sum += review.stars
                product['avgRating'] = round(review_sum / len(reviews), 1) if len(reviews) > 0 else 'New!'
            product['reviews'] = [review.to_dict() for review in reviews]


            shop = get_shop(product['shopId'])
            product['shop'] = shop.to_dict()

        for product in list_2:
            product_images = get_images(product['id'])
            product['ProductImages'] = [image.to_dict() for image in product_images]

            review_sum = 0
            reviews = get_reviews(product['id'])
            for review in reviews:
                review_sum += review.stars
                product['avgRating'] = round(review_sum / len(reviews), 1) if len(reviews) > 0 else 'New!'
            product['reviews'] = [review.to_dict() for review in reviews]

            shop = get_shop(product['shopId'])
            product['shop'] = shop.to_dict()


        full_list = list_1 + list_2         
        print('results backend', full_list) #to dict
        if products_results and shop_results:
                return jsonify({'products': full_list})
        elif products_results and not shop_results:
                return jsonify(list_1)
        elif shop_results and not products_results:
                return jsonify({'products': list_2})
        else:    
            # return {'result': 'No items found'}
            return None


@search_route.route('/filtered-search/<search_category>')
def filtered_search(search_category):
    search_replace = search_category.replace('%', ' ')

    def get_images(id):
        return ProductImage.query.filter(ProductImage.product_id == id).all()
    def get_reviews(id):
        return ProductReview.query.filter(ProductReview.product_id == id).all()
    def get_shop(id):
        return Shop.query.filter(Shop.id == id).one()

    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print(search_replace)
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    products = None


    if search_replace == 'Gifts for Her':
            products = Product.query.filter(or_((Product.category =='Jewelry') |
                                                (Product.category =='Home Decor') |
                                                (Product.category =='Wall Art'))).all()
    elif search_replace == 'Gifts for Him':
            products = Product.query.filter(or_((Product.category == 'Apparel') |
                                                (Product.category =='Foodstuffs'))).all()
            
    elif search_replace == 'Gifts for Kids':
            products = Product.query.filter(or_((Product.category =='Collectibles') |
                                                (Product.category == 'Food') |
                                                (Product.category == 'Soft Drink'))).all()
    elif search_replace == 'Gifts Under $30':
            products = Product.query.filter(Product.price < 30).all()

    else:
            products = Product.query.all()


    prod_list = [product.to_dict() for product in products]


    for prod in prod_list:
        product_images = get_images(prod['id'])
        prod['ProductImages'] = [image.to_dict() for image in product_images]
            
        review_sum = 0
        reviews = get_reviews(prod['id'])
        for review in reviews:
                review_sum += review.stars
                prod['avgRating'] = round(review_sum / len(reviews), 1) if len(reviews) > 0 else 'New!'
        prod['reviews'] = [review.to_dict() for review in reviews]


        shop = get_shop(prod['shopId'])
        prod['shop'] = shop.to_dict()

#     print('filtered products', [product.to_dict() for product in products])
    return prod_list
        

    