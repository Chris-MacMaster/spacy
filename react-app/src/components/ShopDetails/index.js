import { NavLink, useParams, useHistory } from 'react-router-dom'
import './ShopDetails.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneShop, fetchShops } from '../../store/shops'
import ShopProductCard from '../ShopProductCard'

export default function ShopDetails () {
    const {shopId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const shop = useSelector(state => state.shops.singleShop)

    useEffect(() => {
        dispatch(fetchOneShop(shopId))
        dispatch(fetchShops())
    }, [dispatch])
    // console.log('STATE OF SHOP', shop)
    if (!shop || !Object.entries(shop).length) return null
    const allReviews = shop.Products.map(p=>p.Reviews).flat()

    // console.log('REVIEWS FOR ALL PRODUCTS', allReviews)

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

            <div className='accolades'>
                <p><i className="fa-solid fa-truck purple-icon"></i>
                </p>
                <p className='bold-text'> Smooth shipping</p>
                <p>Has a history of shipping on time with tracking.</p>
            </div>

            <div className='speedy-replies accolades'>
                <p><i class="fa-solid fa-envelope purple-icon"></i></p>
                <p className='bold-text'>Speedy Replies</p>
                <p>Has a history of replying to messages quickly.</p>
            </div>
            <div className='rave-reviews accolades'>
                <p><i className="fa-solid fa-comments purple-icon"></i></p>
                <p className='bold-text'>Rave Reviews</p>
                <p>Average review rating is 4.8 or higher</p>
            </div>


            <div className='shop-owner'>
                <img className='shop-owner-img'
                src={`${shop.ShopImages.url}`}
                alt='user'></img>
                <p>{shop.Owner.firstName}</p>
                <p className='contact-shop-owner'><i className="fa-solid fa-message"></i> Contact</p>
            </div>
        </div>


        <button className='favorite-shop'>
        <i className="fa-regular fa-heart shop-heart"></i>Follow Shop</button>

        <button onClick={handleCreate} className='favorite-shop'>
        Create Product</button>

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

            <button className='column-buttons'><i className="fa-solid fa-clipboard-list"></i> Request Custom Order</button>
            <button className='column-buttons'><i className="fa-solid fa-message"></i> Contact shop owner</button>
            </div>
            </div>
            <div className='item-card-display'>
                <h3 className='featured-items'>Featured Items</h3>
                <div className='item-cards'>
                {shop.Products ? shop.Products.map(product => (
                    <ShopProductCard product={product}
                    key={`product${product.id}`}/>
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
