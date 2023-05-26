import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { fetchOneProduct, followProductShop, unfollowProductShop } from '../../store/product';
import { fetchProductReviews } from '../../store/review';
import { fetchCart } from '../../store/cart';
import ReviewIndexItem from '../Reviews';
import AddToCart from '../Cart/AddToCart';
import { useHistory } from 'react-router-dom';
import "./ProductDetail.css"
import OpenModalButton from '../OpenModalButton';
import ShopPoliciesModal from '../ShopPoliciesModal';
import LoadingIcon from '../LoadingIcon';
import ProductImageSlider from './ProductImageSlider';
import { fetchOneShop, followShop, unfollowShop } from '../../store/shops';

const ProductDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [user, cart] = useSelector((state) =>[state.session.user, state.cart])
    const [showMenu, setShowMenu] = useState(false); //for opening modal
    const ulRef = useRef(); //for modal
    const { productId } = useParams()
    const [ hasLoaded, setHasLoaded ] = useState(false)
    const [ shopLoaded, setShopLoaded ] = useState(false)
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
    const reviewState = useSelector(state => state.reviews.productReviews)
    const shopFollow = useSelector(state => state.products?.singleProduct.Shop)
    const productReviews = Object.values(reviewState).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

    useEffect(() => {
        const loadShop = async () => {
            await dispatch(fetchOneShop(product.shopId))
            return setShopLoaded(true)
        }
        loadShop()
    },[product, dispatch])

    const shop = useSelector(state => state.shops.singleShop)
    const shopsReviews = shopLoaded ? shop && shop.Products && shop.Products.length && shop.Products.map(ele => ele.Reviews).flat() : null
    const avgRating = shopsReviews ? shopsReviews.reduce((acc, ele) => ele?.stars + acc, 0) / shopsReviews.length : null
    console.log('SHOP', avgRating)
    if (!hasLoaded || !shopLoaded) return <LoadingIcon />
    const handleClick = () => history.push(`/product-reviews/${productId}/new`)

    const handleFollow = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(followShop(product.Shop.id))
        dispatch(followProductShop(product.id))
    }

    const handleUnfollow = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        // updates db
        dispatch(unfollowShop(product.Shop.id))
        // updates singleProduct state
        dispatch(unfollowProductShop(product.id))
    }


    return (
        <div className='product-deets'>
        <div className='product-detail-div'>
            <div className='product-grid-div'>
                <div className='both-images-div'>
                    <div className='subimage-div'>

                    {product && product.ProductImages && (product.ProductImages.map((img, i) =>
                    <img className={chosenImage === i ? 'chosen-image product-preview-img' : 'product-preview-img'}
                            alt='' key={i} src={img.url} onClick={e=> setChosenImage(i)}/>))}

                    </div>

                    <div className='product-images-div'>
                    <ProductImageSlider data={product.ProductImages} chosenImage={chosenImage} setChosenImage={setChosenImage}/>
                    </div>

                </div>

                <div className='review-info-div'>
                        <div className='review-p review-stars'>
                        {productReviews && productReviews.length ?
                            <p className='review-num-title'>{productReviews.length === 1 ? <span>{'1 Review'}</span> : productReviews.length > 1 ? <> {productReviews.length} Reviews</>  : null}
                            { Array(5).fill(1).map((s,i)=> (
                            i < product.avgRating ? (
                                <i className="fa-solid fa-star gold-star-product-deets" key={i}></i>
                            ) : (
                                <i className="fa-solid fa-star blank-star-product-deets" key={i}></i>
                            )
                            ) ) } </p> : (
                                <p>New! <i className="fa-solid fa-star gold-star-product-deets"/> </p>
                            )}
                        </div>
                        <hr></hr>
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
                    <div className='product-deets-reviews'>
                    {productReviews && productReviews.length > 0 ?
                    productReviews.sort((a,b)=> Date.parse(b.createdAt) - Date.parse(a.createdAt)).map(review => (
                        <ReviewIndexItem review={review} key={review.id} product={product}/>
                    )): null}
                    </div>
            </div>

            <div className='product-grid-div-col-b'>
                    <div className='prod-price'>${product.price}</div>
                    <div className='prod-search'>{product.name}</div>

                    <div className='store-info'>
                    <div className='name-follows'>
                    <NavLink to={`/shops/${product.Shop.id}`}>{product.Shop.name}</NavLink>
                    <i className="fa-solid fa-certificate starseller product-deets-badge"></i>
                        </div>

                        <div className='store-sales'>
                            {product && product.Shop && product.Shop.sales} sales
                {Array(5).fill(1).map((s,i)=> (
                s <= avgRating ? (
                    <i className="fa-solid fa-star product-deets-gold product-deets-stars" key={i}></i>
                ) : (
                    <i className="fa-solid fa-star product-deets-blank product-deets-stars" key={i}></i>
                )
                ))}
                        </div>
                        <div className='follow-unfollow-shop-div'>
                            {product.Shop && product.Shop.Followed && product.Shop.Followed.Status && product.Shop.Followed.Status === "Not Followed" &&
                                <div className='follow-shop' onClick={handleFollow}>
                                    <i className="fa-regular fa-heart shop-heart"
                                    ></i>Follow </div>
                            }
                            {shopFollow && shopFollow.Followed && shopFollow.Followed.Status && shopFollow.Followed.Status === "Followed" &&
                                <div className='follow-shop' onClick={handleUnfollow}>
                                    <i className="fas fa-regular fa-heart shop-heart-filled"></i>Unfollow </div>
                            }
                        </div>
                    </div>
                    <div className='purchase-buttons'>
                        {product.available > 0 ? <AddToCart className='button add-cart-button' product={product} cart={cart} user={user}/>
                        :
                        <button className='button cant-add-cart-button'>Out of stock</button>
                        }

                    </div>
                    <div className='product-info-b'>
                        <div className='free-shipping-div'>
                            {product.freeShipping === true ?
                            <div className='shipping-div'>
                                <img src='https://i.imgur.com/oCqcfHM.png' alt='' className='truck-icon' />
                                <span id='p-icon'>Hooray this product has free shipping!</span></div> : "This product does not have free shipping."}
                        </div>
                        <div className='prod-description'>
                            <p className='prod-description-p'>Description</p>
                            <p className='prod-description-text'>{product.description}</p>
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
