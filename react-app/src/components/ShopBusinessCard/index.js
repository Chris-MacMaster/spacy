import { useDispatch, useSelector } from 'react-redux'
import './ShopBusinessCard.css'
import { useEffect } from 'react'
import { fetchOneShop } from '../../store/shops'

export default function ShopBusinessCard({ shopId }) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOneShop(shopId))
    }, [dispatch])
    const shop = useSelector(state => state.shops.singleShop)
    if (!shop) return null
    return (
<div className='shop-business-card'>
    <img className='user-manage-shop-pic'
    src={`${shop.ShopImages.url ? shop.ShopImages.url : 'https://i.imgur.com/bdSjZyV.png'}`}
    alt='user-manage-shop-pic'></img>
    <div className='user-manage-business-text'>
        <h3 className='user-manage-shop-name'>{shop.name}</h3>
        <span>{shop.sales} | </span><span>On Spacey since {shop.createdAt.slice(0, -12)}</span>
        <div className='user-manage-buttons'>
            <button className='user-manage-button user-manage-edit-shop'><i className="fa-solid fa-pen"></i>Edit Shop</button>
            <button className='user-manage-button user-manage-fav-shop'><i className="fa-regular fa-heart"></i>Favorite shop</button>
        </div>
    </div>
</div>
    )
}
