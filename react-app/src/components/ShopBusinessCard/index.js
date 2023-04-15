import { useDispatch, useSelector } from 'react-redux'
import './ShopBusinessCard.css'
import { useEffect } from 'react'
import { fetchOneShop, fetchShops } from '../../store/shops'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export default function ShopBusinessCard({ shop }) {
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(fetchOneShop(shop))
    }, [dispatch, shop])
    const shops = useSelector(state => state.shops.allShops)

    const handleCreate = (e) => {
        e.preventDefault()
        history.push(`/products/forms/create-product/${shop.id}`)
    }

    if (!shop) return null
    return (
<div className='shop-business-card'>
    <NavLink to={`/shops/${shop.id}`} >
    <img className='user-manage-shop-pic'
    src={`${shop && shop.ShopImage && shop.ShopImage.url ? shop.ShopImage.url : 'https://i.imgur.com/bdSjZyV.png'}`}
    alt='user-manage-shop-pic'></img>
    </NavLink>
    <div className='user-manage-business-text'>
    <NavLink to={`/shops/${shop.id}`}
    style={{ textDecoration: 'none' }}>
        <h3 className='user-manage-shop-name'>{shop && shop.name ? shop.name : 'New!'}</h3>
        {/* <span>{shops[shopId].sales} | </span><span>On Spacey since {shops[shopId].createdAt.slice(0, -12)}</span> */}
    </NavLink>
        <div className='user-manage-buttons'>
            <button className='user-manage-button user-manage-edit-shop'><i className="fa-solid fa-pen"></i>Edit Shop</button>
            <button className='user-manage-button user-manage-fav-shop'><i className="fa-regular fa-heart"></i>Favorite shop</button>
            <button onClick={handleCreate} className='user-manage-button user-manage-fav-shop'><i className="fa-regular fa-heart"></i>Create Product</button>
        </div>
    </div>
</div>
    )
}
