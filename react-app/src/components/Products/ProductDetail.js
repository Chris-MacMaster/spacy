import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import { fetchOneProduct } from '../../store/product';
import { fetchProductReviews } from '../../store/review';

import "./ProductDetail.css"



const ProductDetail = () => {
    const dispatch = useDispatch()
    const productState = useSelector(state => state.products)
    console.log("PRODUCT STATE", productState)
    // const user = useSelector(state => state.session.user)

    let { productId } = useParams()


    useEffect(() => {
        dispatch(fetchOneProduct(productId))
        dispatch(fetchProductReviews(productId))
    }, [dispatch, productId])

    if (!Object.values(productState).length) {
        return null
    }

    const product = productState?.singleProduct


    return (
        <div className='product-detail-div'>
            <div className='product-grid-div'>

                <div className='product-grid-div-col-a'>
                    <div className='product-images-div'>
                        <p >proudct images data placeholder</p>
                    </div>
                </div>

                <div className='product-grid-div-col-a'>
                    
                </div>
            </div>
            <p>{product.name}</p>
        </div>
    );
};

export default ProductDetail;



// {/* <Link to={`/reports/${report.id}`}>Report #{report.id}</Link> */ }
// {/* <Link to={`/reports/${report.id}/edit`}>Edit</Link> */ }