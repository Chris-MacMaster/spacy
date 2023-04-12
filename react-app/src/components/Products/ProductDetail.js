import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import { fetchOneProduct } from '../../store/product';
import { fetchProductReviews } from '../../store/review';
import ReviewIndexItem from '../Reviews/ReviewIndexItem';
import AddToCart from '../Cart/AddToCart';

import "./ProductDetail.css"

const ProductDetail = () => {
    const dispatch = useDispatch()
    const productState = useSelector(state => state.products)
    const reviewState = useSelector(state => state.reviews)

    let { productId } = useParams()

    useEffect(() => {
        console.log("TRIGGERED")
        dispatch(fetchOneProduct(productId))
        dispatch(fetchProductReviews(productId))
    }, [dispatch, productId])

    if (!Object.values(productState).length) {
        return null
    }

    const product = productState?.singleProduct
    const productReviews = reviewState?.productReviews
    if (!product.Shop) return null
    if (!productReviews.length) return null

    return (
        <div className='product-detail-div'>
            <div className='product-grid-div'>

                <div className='product-grid-div-col-a'>
                    <div className='product-images-div'>

                        <p >(proudct images data placeholder...)</p>
                        <img src={product.ProductImages[0].url} alt='no found' />
                        {/* product.ProductImages[0].url */}
                    </div>
                    {/* reviews... */}
                    {productReviews.map(review => (
                        <ReviewIndexItem review={review} key={review.id}/>
                    ))}
                    <div className='reviewIndex' >
                        {}
                    </div>
                </div>

                <div className='product-grid-div-col-b'>
                    <div className='product-info-a'>
                        <div >
                            {product.price}
                        </div>
                        <div >
                            applicable search categories go here
                        </div>

                    </div>
                    <div className='store-info'>
                        <div>
                            {product.Shop.name}
                        </div>
                        <div >
                            {product.Shop.sales} sales
                        </div>
                    </div>
                    <div className='purchase-buttons'>
                        <AddToCart product={product}/>
                        <button className='button buy-it-button'>Buy it now</button>

                    </div>
                    <div className='product-info-b'>
                        <div >
                            {product.freeShipping === true ? "Hooray this product has free shipping!" : "This product does not have free shipping."}
                        </div>
                        <div >
                            {product.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
