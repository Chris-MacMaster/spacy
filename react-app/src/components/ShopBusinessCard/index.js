import { useDispatch, useSelector } from 'react-redux'
import './ShopBusinessCard.css'
import { useEffect } from 'react'
import { fetchOneShop } from '../../store/shops'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export default function ShopBusinessCard({ shopId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(fetchOneShop(shopId))
    }, [dispatch])
    const shop = useSelector(state => state.shops.singleShop)


    // const handleCreate = (shopId) => {
    //     history.push(`/products/forms/create-product/${shopId}`)
    // }

    if (!shop) return null
    return (
<div className='shop-business-card'>
    <NavLink to={`/shops/${shop.id}`} >
    <img className='user-manage-shop-pic'
    src={`${shop.ShopImages.url ? shop.ShopImages.url : 'https://i.imgur.com/bdSjZyV.png'}`}
    alt='user-manage-shop-pic'></img>
        </NavLink>
    <div className='user-manage-business-text'>
    <NavLink to={`/shops/${shop.id}`} >
        <h3 className='user-manage-shop-name'>{shop.name}</h3>
        <span>{shop.sales} | </span><span>On Spacey since {shop.createdAt.slice(0, -12)}</span>
    </NavLink>
        <div className='user-manage-buttons'>
            <button className='user-manage-button user-manage-edit-shop'><i className="fa-solid fa-pen"></i>Edit Shop</button>
            <button className='user-manage-button user-manage-fav-shop'><i className="fa-regular fa-heart"></i>Favorite shop</button>
            {/* <button onClick={handleCreate} className='user-manage-button user-manage-fav-shop'><i className="fa-regular fa-heart"></i>Create Product</button> */}
        </div>
    </div>
</div>
    )
}
