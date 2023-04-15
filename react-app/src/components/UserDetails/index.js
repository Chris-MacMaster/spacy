import { useParams } from 'react-router-dom'
import './UserDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authenticate } from '../../store/session'
import { fetchShops } from '../../store/shops'
import { fetchProducts } from '../../store/product'
import ShopProductCard from '../ShopProductCard'
import ShopBusinessCard from '../ShopBusinessCard'

export default function UserDetails() {
    const {userId} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authenticate())
        dispatch(fetchShops())
        dispatch(fetchProducts())
    }, [dispatch])
    const user = useSelector(state => state.session.user)
    const shops = useSelector(state => state.shops.allShops)
    const products = useSelector(state=> state.products.allProducts)
    // console.log('USER', userId)
    if (!user || parseInt(user.id) !== parseInt(userId) || !shops) return null
    const userShopsIds = shops ? Object.values(shops).filter(s=>parseInt(s.ownerId) === parseInt(user.id)).map(s=>s.id) : null
    const userShops = Object.values(shops).filter(s => parseInt(s.ownerId) === parseInt(userId))
    const userProducts = Object.values(products).filter(p=> userShopsIds.includes(p.shopId))
    console.log('USERSHOPS', userShops)
    return (
        <div className='user-manage-details'>
            <div className='user-manage-header'>
                <div className='user-manage-business-cards'>
                {userShops && userShops.length ? userShops.map((s, i) => (

                    <ShopBusinessCard shop={s}

                    key={`shopbusicardcomp${i}`}/>

                )) : null}
                </div>
                <div className='user-manage-shop-owners'>
                    <p className='shop-owner-text'>Shop Owner</p>
                    <img className='user-manage-icon'
                    src='https://i.imgur.com/mMEwXsu.png'
                    alt='usericon'></img>
                    <p className='user-manage-username'></p>
                    <p className='user-manage-contact-user'>
                        <i className="fa-solid fa-message"></i>You!</p>
                </div>
            </div>

            <div className='user-manage-items'>
                <div className='user-manage-item-sidebar'>

                </div>

                <div className='user-manage-item-field'>
                {userProducts ? userProducts.map(product =>(
                    <ShopProductCard product={product}
                    key={`product${product.id}`}/>
                )) : null}

                </div>
            </div>
            <hr></hr>
            <div className='user-manage-footer'>
                <div className='user-manage-shop-policies'>
                    <h3>Shop Policies</h3>
                    {userShops.length ? <p>{userShops[0].policies}</p>: null}
                </div>
                <div className='accepted-payments'></div>
            </div>
        </div>
    )
}
