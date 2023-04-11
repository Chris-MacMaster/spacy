import { useParams } from 'react-router-dom'
import './ShopDetails.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneShop, fetchShops } from '../../store/shops'
import ShopProductCard from '../ShopProductCard'

export default function ShopDetails () {
    const {shopId} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOneShop(shopId))
        dispatch(fetchShops())
    }, [dispatch])
    const shop = useSelector(state => state.shops.singleShop)
    console.log('STATE OF SHOP', shop)
    if (!shop || !Object.entries(shop).length) return null
    const allReviews = shop.Products.map(p=>p.Reviews).flat()

    console.log('REVIEWS FOR ALL PRODUCTS', allReviews)
    return (
        <div className='shop-page'>
        <div className='shop-header'>
            <div className='shop-businesscard'>
            <img src={`${shop.ShopImages.url}`} alt='shoplogo' className='shoplogo'></img>
            <div className='shop-businesscard-info'>
                <h2 className='businesscard-title'>{shop.name}</h2>
                <p className='sanserif-text'>{shop.description}</p>
                <p className='sanserif-text'>{shop.state}, {shop.country}</p>
                <p className='sanserif-text'>{Math.floor(Math.random()*20000)} Sales | {shop.avgReview} </p>

            </div>
            </div>

            <div>
                <p className='shipping-info'><span className='bold-text'><i className="fa-solid fa-truck"></i>Smooth shipping</span> Has a history of shipping on time with tracking.</p>
            </div>

            <div className='shop-owner'>
                <img className='shop-owner-img'
                src={`${shop.ShopImages.url}`}
                alt='user'></img>
                <p>{shop.Owner.firstName}</p>
                <p><i className="fa-solid fa-message"></i> Contact</p>
            </div>
        </div>
        <div className='favorite-shop'>
        <i className="fa-regular fa-heart shop-heart"></i>Follow Shop</div>

            <div className='items-section'>
            <div className='item-category-sidebar'>
                <h3>Items</h3>
                <div className='mapped-categories'>

            {shop.Products.map((p, i) => (
                <div className='category'>
                <span className='category-list'
                key={`catp${i}`}>{p.category}</span>
                <span className='catgory-number'
                key={`catn${i}`}>{Math.floor(Math.random()*100)}</span>

                </div>
            ))}
            </div>
            <div className='category-column-buttons'>

            <button className='column-buttons'><i className="fa-solid fa-clipboard-list"></i> Request Custom Order</button>
            <button className='column-buttons'><i className="fa-solid fa-message"></i> Contact shop owner</button>
            </div>
            </div>
            <div className='item-card-display'>
                <h3 className='featured-items'>Featured Items</h3>
                <div className='item-cards'>
                {shop.Products.map(product => (
                    <ShopProductCard product={product}
                    key={`product${product.id}`}/>
                ))}

                </div>
            </div>
            </div>
            <hr></hr>
            <div className='review-section' >
                <h3 className='review-title'>Reviews</h3>

                <div className='mapping-reviews'>
                    {allReviews.map((r,i)=> (
                    <>
                    
                    <img src='https://i.imgur.com/mMEwXsu.png' alt='usericon'
                    className='user-icon'></img>

                       <div className='iterated-review'
                       key={`div${i}`}>
                        {r.ReviewImages && r.ReviewImages.url ? (
                            <img className='review-image'
                            src={`${r.ReviewImages.url}`}
                            alt='reviewimg'
                            key={`reviewimage${i}`}></img>
                            ) : null}
                        <p key={`review${i}`}>{r.review}</p>
                        <div className='product-reviewed'
                        key={`productreviewed${i}`}>
                            <img src={`${shop.Products.filter(p=>p.id===r.productId)[0].ProductImages[0].url}`}
                            alt='productreviewed'
                            key={`productreviewedimg${i}`}></img>
                            <div className='reviewed-item'
                            key={`revieweditem${i}`}>{shop.Products.filter(p=>p.id === r.productId)[0].name}</div>
                            </div>
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
                    ))}
                </div>
            </div>
        </div>
    )
}
