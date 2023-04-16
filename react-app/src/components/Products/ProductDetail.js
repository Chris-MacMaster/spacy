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


    const user = useSelector((state) => state.session.user)
    const [showMenu, setShowMenu] = useState(false); //for opening modal
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


    //dispatching state
    useEffect(() => {
        console.log("FIRE DISPATCH ----------------------------")
        dispatch(fetchOneProduct(productId))
        dispatch(fetchProductReviews(productId))
    }, [dispatch, productId])

    const product = useSelector(state => state.products.singleProduct)
    const productReviews = useSelector(state => state.reviews.productReviews)
    if (!Object.values(product).length) return null

    console.log('reviews', productReviews)

    let userIds = []

    if (productReviews.length) {
        for (let review of productReviews) {
            userIds.push(review.userId)
        }
    }

    console.log('user IDs', userIds)

    // const avgRating = productReviews.reduce((acc, r) => typeof r.stars === 'number' ? acc + r.stars : acc +0,0) / productReviews.length
    // console.log('avg reviews', avgRating)
    const handleClick = () => history.push(`/product-reviews/${productId}/new`)
    if (!product.Shop) return null

    return (
        <div className='product-detail-div'>
            <div className='product-grid-div'>
                <div className='product-grid-div-col-a'>
                    <div className='product-subimages-div'>
                        <div className='both-images-div'>
                            <div className='subimage-div'>
                                {/* {product && product.ProductImages && product.productImages.length ? product.ProductImages.map((p,i) => (
                                    <img className='product-image product-subimage' src={`${p.url}`} alt='no found' key={`mapped${i}`}/>
                                )) : null} */}
                            </div>
                            <div className='product-arrow less-than'>
                                {/* <p className='greater-less-p'>
                                    &lt;
                                </p> */}
                            </div>
                            <div className='product-images-div'>
                                <img className='product-image' src={product.ProductImages[0].url} alt='no found' />
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
                        </p>
                        <p className='review-p review-stars'>
                        {productReviews && productReviews.length ?
                            <p className='review-num-title'>{productReviews.length} Reviews
                            { Array(5).fill(1).map((s,i)=> (
                            i < product.avgRating ? (
                                <i className="fa-solid fa-star gold-star gold-star-product-deets landing-shop-stars" key={i}></i>
                            ) : (
                                <i className="fa-solid fa-star blank-star blank-star-product-deets landing-shop-stars" key={i}></i>
                            )
                            ) ) } </p> : (
                                <p>New! <i className="fa-solid fa-star gold-star gold-star-product-deets landing-shop-stars"/> </p>
                            )}                        </p>
                        {user && product.Shop?.ownerId !== user.id && !userIds.includes(user.id) ?
                 (   <div>
                        {/* <NavLink to={`/product-reviews/${productId}/new`}> */}
                        <button className='post-item-review'
                        onClick={handleClick}>
                            Post a Review
                            </button>
                        {/* </NavLink> */}
                    </div>)
                        :null}
                    </div>
                    {/* reviews... */}
                    {productReviews && productReviews.length > 0 ? productReviews.map(review => (
                        <ReviewIndexItem review={review} key={review.id} product={product}/>
                    )): null}
                    <div className='reviewIndex' >

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
                            <NavLink to={`{shops/${product.Shop.id}}`} >
                            <div className='store-name'>
                                {product.Shop.name}
                            </div>

                            </NavLink>

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
                        <button className='button buy-it-button'>Buy it now</button>

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
