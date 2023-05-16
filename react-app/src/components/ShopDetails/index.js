import { NavLink, useParams, useHistory } from 'react-router-dom'
import './ShopDetails.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneShop, fetchShops } from '../../store/shops'
import ShopProductCard from '../ShopProductCard'
import { authenticate } from '../../store/session'
import LoadingIcon from '../LoadingIcon'

export default function ShopDetails () {
    const {shopId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [ hasLoaded, setHasLoaded ] = useState(false)
    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchOneShop(shopId))
            await dispatch(fetchShops())
            await dispatch(authenticate())
            return setHasLoaded(true)
        }
        loadData()
    }, [dispatch, shopId])

    const shop = useSelector(state => state.shops.singleShop)
    const user = useSelector(state => state.session.user)
    const featureAlert = () => alert('Feature coming soon')

    if (!hasLoaded) return <LoadingIcon />

    const allReviews = shop.Products.map(p=>p.Reviews).flat()
    const handleCreate = (e) => {
        e.preventDefault()
        history.push(`/products/forms/create-product/${shopId}`)
    }
    return (
        <div className='shop-page'>
        <div className='shop-header'>
            <div className='shop-businesscard'>
            <img src={`${shop.ShopImages.url}`} alt='shoplogo' className='shoplogo'></img>
            <div className='shop-businesscard-info'>
                <h2 className='businesscard-title'>{shop.name}</h2>
                <p className='sanserif-text-description sanserif-text'>{shop.description}</p>
                <p className='sanserif-text-location sanserif-text'>{shop.state}, {shop.country}</p>
                <p className='sanserif-text'>
                    <span className='starseller'><i className="fa-solid fa-certificate starseller"></i>Star seller! </span> | {Math.floor(Math.random()*20000)}  <span className='shop-details-sales'>| Sales {shop.avgReview}  </span></p>

            </div>
            </div>
            <div className='accolades-container' >
            <div className='accolades'>
                <div className='bold-text'><i className="fa-solid fa-truck purple-icon"/> Smooth shipping</div>
                <span>Has a history of shipping on time with tracking.</span>
            </div>

            <div className='speedy-replies accolades'>
                <div className='bold-text'><i class="fa-solid fa-envelope purple-icon"/>Speedy Replies</div>
                <span>Has a history of replying to messages quickly.</span>
            </div>
            <div className='rave-reviews accolades'>
                <div className='bold-text'><i className="fa-solid fa-comments purple-icon"/>Rave Reviews</div>
                <span>Average review rating is 4.8 or higher</span>
            </div>
            </div>

            <div className='shop-owner'>
                <img className='shop-owner-img'
                src={`${shop.ShopImages.url}`}
                alt='user'></img>
                <p>{shop.Owner.firstName}</p>
                <button className='contact-shop-owner' onClick={() => window.location = `mailto:${shop.Owner.email}`}><i className="fa-solid fa-message"></i> Contact</button>
            </div>
        </div>

        {user && user.id === shop.ownerId ? (
        <button onClick={handleCreate} className='favorite-shop'>
        Create Product</button>

        ) : (
        <button className='favorite-shop' onClick={featureAlert}>
        <i className="fa-regular fa-heart shop-heart"
       ></i>Follow Shop</button>
        )}


            <div className='items-section'>
            <div className='item-category-sidebar'>
                <h3 className='mapped-categories-title'>Items</h3>
                <div className='mapped-categories'>

            {shop.Products ? shop.Products.map((p, i) => (
                <div className='category'>
                <span className='category-list'
                key={`catp${i}`}>{p.category}</span>
                <span className='catgory-number'
                key={`catn${i}`}>{Math.floor(Math.random()*100)}</span>

                </div>
            )) : null}
            </div>
            <div className='category-column-buttons'>

            <button className='column-buttons'
            onClick={featureAlert}><i className="fa-solid fa-clipboard-list"></i> Request Custom Order</button>
            <button className='column-buttons'
            onClick={featureAlert}><i className="fa-solid fa-message" /> Contact shop owner</button>
            </div>
            </div>
            <div className='item-card-display'>
                <h3 className='featured-items'>Featured Items</h3>
                <div className='item-cards'>
                {shop.Products ? shop.Products.map(product => (
                    <ShopProductCard product={product}
                    key={`product${product.id}`}
                    shop={shop}
                    user={user}/>
                )) : null}
                </div>
            </div>
            </div>
            <hr></hr>
            <div className='review-section' >
                <h3 className='review-title'>Reviews</h3>

                <div className='mapping-reviews'>
                    {allReviews ? allReviews.map((r,i)=> (
                    <>
                    <div className='review-header'
                    key={`reviewdivheader${i}`}>

                    <img src='https://i.imgur.com/mMEwXsu.png' alt='usericon'
                    className='user-icon'></img>
                    <p className='username'
                    key={`username${i}`}>{r.Reviewer.firstName} on {r.createdAt.slice(0, -12)}</p>
                    </div>
                        {new Array(5).fill(1).map((s,j)=> (
                            j <= r.stars ? (
                                <i class="fa-solid fa-star gold-star"></i>
                            ) : (
                                <i class="fa-solid fa-star blank-star"></i>
                            )
                        ))}
                       <div className='iterated-review'
                       key={`div${i}`}>
                        {r.ReviewImages && r.ReviewImages.url ? (
                            <img className='review-image'
                            src={`${r.ReviewImages.url}`}
                            alt='reviewimg'
                            key={`reviewimage${i}`}></img>
                            ) : null}
                        <p className='review-paragraph'
                        key={`review${i}`}>{r.review}</p>
                        <NavLink to={`/products/${r.productId}`}
                        style={{ textDecoration: 'none' }}>
                        <div className='product-reviewed'
                        key={`productreviewed${i}`}>
                            <img src={`${shop.Products.filter(p=>p.id===r.productId)[0].ProductImages[0].url}`}
                            className='product-ref-img'
                            alt='productreviewed'
                            key={`productreviewedimg${i}`}></img>
                            <div className='reviewed-item-name'
                            key={`revieweditem${i}`}>{shop.Products.filter(p=>p.id === r.productId)[0].name}</div>
                            </div>
                </NavLink>
                       </div>
                       <div className='feedback'
                       key={`feedback${i}`}>
                        <p className='helpful'
                        key={`helpful${i}`}>
                            <i className="fa-solid fa-thumbs-up"
                            key={`thumb${i}`}></i>
                        Is this review helpful?</p>
                        <p className='report'
                        key={`report${i}`}>
                            <i className="fa-solid fa-flag"
                            key={`flag${i}`}></i>
                        Report this review</p></div>
                        <hr key={`hr${i}`}></hr>
                        </>
                    )) : null}
                </div>
            </div>
        </div>
    )
}
