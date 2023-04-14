import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import { fetchOneProduct } from '../../store/product';
import { fetchProductReviews } from '../../store/review';
import ReviewIndexItem from '../Reviews/ReviewIndexItem';
import AddToCart from '../Cart/AddToCart';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import "./ProductDetail.css"
import OpenModalButton from '../OpenModalButton';
import ShopPoliciesModal from '../ShopPoliciesModal';

const ProductDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const productState = useSelector(state => state.products)
    const reviewState = useSelector(state => state.reviews)
    const user = useSelector((state) => state.session.user)
    const [showMenu, setShowMenu] = useState(false); //for opening modal
    const [imgCount, setImgCount] = useState(0)
    const ulRef = useRef(); //for modal
    let { productId } = useParams()

    //modal components
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = e => {
            if (!ulRef.current.contains(e.target)) {
             setShowMenu(false);
            }
        }
        document.addEventListener('click', closeMenu)
    }, [showMenu])
    const closeMenu = () => setShowMenu(false)
    useEffect(() => {
        // console.log("TRIGGERED")
        dispatch(fetchOneProduct(productId))
        dispatch(fetchProductReviews(productId))
    }, [dispatch, productId])

    if (!Object.values(productState).length) {
        return null
    }

    const handleBackward = () => {
        if (imgCount === 0) {
            setImgCount(8)
        }
        else {
            const imgDecrement = imgCount-1
            setImgCount(imgDecrement)
        }
    }

    const handleForward = () => {
        if (imgCount === 8) {
            setImgCount(9)
        }
        else {
            const imgIncrement = imgCount + 1
            setImgCount(imgIncrement)
        }
    }

    const product = productState?.singleProduct
    // console.log('product', product)
    const productReviews = reviewState?.productReviews
    if (!product.Shop) return null
    // if (!productReviews.length) return null
    // console.log('product reviews', productReviews)
    let reviewUserIds = []
    if (productReviews.length) {
        for (let review of productReviews) {
            reviewUserIds.push(review.userId)
        }
    }

    // console.log('review user IDs', reviewUserIds)

    return (
        <div className='product-detail-div'>
            <div className='product-grid-div'>
                <div className='product-grid-div-col-a'>
                    <div className='product-subimages-div'>
                        <div className='both-images-div'>
                            <div className='subimage-div'>
                                {/* <img className='product-image product-subimage' src={product.ProductImages[0]?.url} alt='no found' />
                                <img className='product-image product-subimage' src={product.ProductImages[1]?.url} alt='no found' />
                                <img className='product-image product-subimage' src={product.ProductImages[2]?.url} alt='no found' />
                                <img className='product-image product-subimage' src={product.ProductImages[3]?.url} alt='no found' />
                                <img className='product-image product-subimage' src={product.ProductImages[4]?.url} alt='no found' />
                                <img className='product-image product-subimage' src={product.ProductImages[5]?.url} alt='no found' />
                                <img className='product-image product-subimage' src={product.ProductImages[6]?.url} alt='no found' />
                                <img className='product-image product-subimage' src={product.ProductImages[7]?.url} alt='no found' />
                                <img className='product-image product-subimage' src={product.ProductImages[8]?.url} alt='no found' /> */}
                            </div>
                            <div className='product-arrow less-than'>
                                {/* <p className='greater-less-p'>
                                    &lt;
                                </p> */}
                            </div>
                            <div className='product-images-div'>
                                <img className='product-image' src={product.ProductImages[0].url} alt='no found' />
                                {/* product.ProductImages[0].url */}
                            </div>
                            <div className='product-arrow greater-than'>
                                {/* <p className='greater-less-p'>
                                    &gt;
                                </p> */}
                            </div>
                        </div>
                    </div>
                    <div className='review-info-div'>
                        <p className='review-p reviews-text'>
                            {productReviews.length} Reviews
                        </p>
                        <p className='review-p review-stars'>
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i>
                        </p>
                        {user && !reviewUserIds.includes(user.id) && product.Shop?.ownerId !== user.id ?
                 (   <div>
                        <NavLink to={`/product-reviews/${productId}/new`}>
                        <button>Post a Review</button>
                        </NavLink>
                    </div>)
                        :null}
                    </div>
                    {/* reviews... */}
                    {productReviews.length > 0 ? productReviews.map(review => (
                        <ReviewIndexItem review={review} key={review.id}/>
                    )): ''}
                    <div className='reviewIndex' >
                        {}
                    </div>
                </div>

                <div className='product-grid-div-col-b'>
                    <div className='product-info-a'>
                        <div className='prod-price'>
                            {product.price}
                        </div>
                        <div className='prod-search'>
                            {product.name}
                        </div>

                    </div>
                    <div className='store-info'>
                        <div className='name-follows'>
                            <div className='store-name'>
                                {product.Shop.name}
                            </div>
                            <div className='store-follows'>
                                <i className="fa-solid fa-heart"></i> Follow
                                {/* feature incoming */}
                            </div>
                        </div>
                        <div className='store-sales'>
                            {product.Shop.sales} sales
                        </div>
                    </div>
                    <div className='purchase-buttons'>
                        {/* <button className='button buy-it-button'>Buy it now</button> */}

                        {product.available > 0 ? <AddToCart className='button add-cart-button' product={product}/>

                        :
                        <button className='button cant-add-cart-button'>Out of stock</button>
                        }

                    </div>
                    <div className='product-info-b'>
                        <div className='free-shipping-div'>
                            {product.freeShipping === true ? <div className='shipping-div'><i className="fa-solid fa-truck"></i><p id='p-icon'>Hooray this product has free shipping!</p></div> : "This product does not have free shipping."}
                        </div>
                        <div className='prod-description'>
                            <p className='prod-description-p'>Description</p>
                            {product.description}
                        </div>
                        {/* <button onClick={openMenu}>EXPERIMENT</button> */}
                        <div  className='shop-pol-modal' >
                            <OpenModalButton
                            buttonText='View Shop Policies'
                            onClick={openMenu}
                            className='shop-pol-modal'
                            onItemClick={closeMenu}
                            modalComponent={<ShopPoliciesModal shop={product.Shop}/>} />
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
