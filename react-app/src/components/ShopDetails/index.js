import { useParams } from 'react-router-dom'
import './ShopDetails.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneShop, fetchShops } from '../../store/shops'

export default function ShopDetails () {
    const {shopId} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOneShop(shopId))
        dispatch(fetchShops())
    }, [dispatch])

    const shop = useSelector(state => state.shops.singleShop)
    if (!shop || !Object.entries(shop).length) return null
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
                
            </div>
            <div className='item-card-display'>
                <h3 className='featured-items'>Featured Items</h3>
                <div className='item-cards'>


                </div>
            </div>
            </div>

            <div className='review-section' >

            </div>
        </div>
    )
}
