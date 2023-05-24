import { NavLink, useHistory, useParams } from 'react-router-dom'
import './UserDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { authenticate } from '../../store/session'
import { fetchShops, fetchFollowedShops } from '../../store/shops'
import { fetchProducts } from '../../store/product'
import ShopProductCard from '../ShopProductCard'
import ShopBusinessCard from '../ShopBusinessCard'
import LoadingIcon from '../LoadingIcon'
import FollowShopBusinessCard from '../ShopBusinessCard/FollowShopBusinessCard'
import ShopCard from '../ShopCard'
export default function UserDetails() {
    const {userId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [ hasLoaded, setHasLoaded ] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            await dispatch(authenticate())
            await dispatch(fetchShops())
            await dispatch(fetchProducts())
            await dispatch(fetchFollowedShops())
            return setHasLoaded(true)
        }
        loadData()
    }, [dispatch])

    const user = useSelector(state => state.session.user)
    const shops = useSelector(state => state.shops.allShops)
    const followedShopState = useSelector(state => state.shops.followedShops)
    const products = useSelector(state=> state.products.allProducts)
    
    if (!hasLoaded) return <LoadingIcon />
    if (!user || parseInt(user.id) !== parseInt(userId) || !shops) return null

    const userShopsIds = shops ? Object.values(shops).filter(s=>parseInt(s.ownerId) === parseInt(user.id)).map(s=>s.id) : null
    const userShops = Object.values(shops).filter(s => parseInt(s.ownerId) === parseInt(userId))
    const userProducts = Object.values(products).filter(p=> userShopsIds.includes(p.shopId))
    const onClickCreateShop = () => history.push('/shops/new')

    const followedShops = Object.values(followedShopState)

    return (
        <div className='user-manage-details'>

            <div className='user-deets'>
            <img src='https://i.imgur.com/mMEwXsu.png' alt='' className='user-deets-icon'/>
            <div className='user-deets-text'>
            <div className='user-name'>{user.firstName} {user.lastName}</div>
            <div className='user-deets-user-shops'>
            {userShops && userShops.length && userShops.map((s,i) => (
                <div className='user-deets-bullet'>
                <img src='https://i.imgur.com/bdSjZyV.png' alt='' className='shop-icon'/>
                <NavLink to={`/shops/${s.id}`} style={{ textDecoration: "none"}}>
                <span className='user-deets-user-shop'>{s.name}</span>
                </NavLink>
                </div>
            ))}
            </div>

            </div>
            </div>

            <button className='favorite-shop create-shop-button' onClick={onClickCreateShop}>
            <i className="fa-solid fa-screwdriver-wrench create-shop-icon"/>Create Shop
            </button>

            <hr></hr>

            <div className='user-deets-followed-shops'>

            {followedShops && followedShops.length && followedShops.map((s, i) => (
                <ShopCard shop={s} />
            ))}

            </div>









                {/* <p className='owned-shops-label'>
                    Your Owned Shops
                </p>
            <div className='user-manage-header'>
                <div className='user-manage-business-cards'>
                {userShops && userShops.length ? userShops.map((s, i) => (
                    <ShopBusinessCard shop={s} key={`shopbusicardcomp${i}`}/>
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

            <p className='owned-shops-label'>
                Your Created Products
            </p>
            <div className='user-manage-items'>
                <div className='user-manage-item-sidebar'>

                </div>

                <div className='user-manage-item-field'>
                {userProducts ? userProducts.map(product =>(
                    <ShopProductCard product={product}
                    key={`product${product.id}`}/>
                )) : <p>
                        You have no created products currently
                    </p>}
                </div>

            <p className='owned-shops-label'>
                Your Followed Shops
            </p>
            <div className='user-manage-business-cards'>
                {followedShops && followedShops.length ? followedShops.map((s, i) => (
                    <FollowShopBusinessCard shop={s} key={`shopbusicardcomp${i}`} />
                )) : <p>
                    You have no followed shops currently
                    </p>}
            </div>

            </div>

            </div> */}
        </div>
    )
}
