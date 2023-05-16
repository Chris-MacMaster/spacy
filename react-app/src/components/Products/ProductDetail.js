import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import { fetchOneProduct } from '../../store/product';
import { fetchProductReviews } from '../../store/review';
import { fetchCart } from '../../store/cart';
import ReviewIndexItem from '../Reviews/ReviewIndexItem';
import AddToCart from '../Cart/AddToCart';
import { useHistory } from 'react-router-dom';
import "./ProductDetail.css"
import OpenModalButton from '../OpenModalButton';
import ShopPoliciesModal from '../ShopPoliciesModal';
import LoadingIcon from '../LoadingIcon';
import ProductImageSlider from './ProductImageSlider';

const ProductDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [user, cart] = useSelector((state) =>[state.session.user, state.cart])
    const [showMenu, setShowMenu] = useState(false); //for opening modal
    const ulRef = useRef(); //for modal
    const { productId } = useParams()
    const [ hasLoaded, setHasLoaded ] = useState(false)
    const [ chosenImage, setChosenImage ] = useState(0)
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
        const loadData = async () => {
            await dispatch(fetchOneProduct(productId))
            await dispatch(fetchProductReviews(productId))
            await dispatch(fetchCart())
            return setHasLoaded(true)
        }
        loadData()
    }, [dispatch, productId])

    const product = useSelector(state => state.products.singleProduct)
    const productReviews = useSelector(state => state.reviews.productReviews)
    const shop = useSelector(state => state.products?.singleProduct.Shop)
    const shopId = shop?.id

    if (!hasLoaded) return <LoadingIcon />

    const handleClick = () => history.push(`/product-reviews/${productId}/new`)

    const handleShopRedirect = (e) => {
        e.preventDefault()
        history.push(`/shops/${shopId}`)
    }
    return (
        <div className='product-detail-div'>
            <div className='product-grid-div'>
                <div className='product-grid-div-col-a'>
                    <div className='product-subimages-div'>
                        <div className='both-images-div'>
                            <div className='subimage-div'>

                            {product && product.ProductImages && (product.ProductImages.map((img, i) =>
                            <img className={chosenImage === i ? 'chosen-image product-preview-img' : 'product-preview-img'}
                            alt='' key={i} src={img.url} onClick={e=> setChosenImage(i)}/>).slice(0,8))}

                            </div>

                            <div className='product-images-div'>
                            <ProductImageSlider data={product.ProductImages} chosenImage={chosenImage}/>
                            </div>

                        </div>
                    </div>
                    <div className='review-info-div'>
                        <p className='review-p reviews-text'>
                        </p>
                        <p className='review-p review-stars'>
                        {productReviews && productReviews.length ?
                            <p className='review-num-title'>{productReviews.length === 1 ? <div>{'1 Review'}</div> : productReviews.length > 1 ? <> {productReviews.length} Reviews</>  : null}
                            { Array(5).fill(1).map((s,i)=> (
                            i < product.avgRating ? (
                                <i className="fa-solid fa-star gold-star gold-star-product-deets landing-shop-stars" key={i}></i>
                            ) : (
                                <i className="fa-solid fa-star blank-star blank-star-product-deets landing-shop-stars" key={i}></i>
                            )
                            ) ) } </p> : (
                                <p>New! <i className="fa-solid fa-star gold-star gold-star-product-deets landing-shop-stars"/> </p>
                            )}                        </p>
                        {user && user.id !== product?.Shop?.ownerId && !productReviews.length ? (
                       <div>
                            <button className='post-item-review'
                            onClick={handleClick}>
                                Post a Review
                                </button>
                        </div>) : user && product.Shop?.ownerId !== user.id && !productReviews?.some(r => r.userId === user.id) ? (
                            <div>
                                <button className='post-item-review'
                                    onClick={handleClick}>
                                    Post a Review
                                </button>
                            </div>)
                         : null }
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
                            ${product.price}
                        </div>
                        <div className='prod-search'>
                            {product.name}
                        </div>

                    </div>
                    <div className='store-info'>
                        <div className='name-follows'>
                            <p className='shop-name' onClick={handleShopRedirect}>
                                {product && product.Shop && product.Shop.name}
                            </p>
                            <div className='store-follows'>
                                <i className="fa-solid fa-heart"></i> Follow
                                {/* feature incoming */}
                            </div>
                        </div>
                        <div className='store-sales'>
                            {product && product.Shop && product.Shop.sales} sales
                        </div>
                    </div>
                    <div className='purchase-buttons'>

                        {product.available > 0 ? <AddToCart className='button add-cart-button' product={product} cart={cart}/>

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
                        <div className='shop-pol-modal' >
                            <OpenModalButton
                            id='shop-policy-button'
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
