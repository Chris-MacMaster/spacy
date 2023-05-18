import { useHistory, useParams } from 'react-router-dom'
import './UserDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { authenticate } from '../../store/session'
import { fetchShops, fetchFollowedShops } from '../../store/shops'
import { fetchProducts } from '../../store/product'
import ShopProductCard from '../ShopProductCard'
import ShopBusinessCard from '../ShopBusinessCard'
import LoadingIcon from '../LoadingIcon'

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
            <button className='favorite-shop create-shop-button'
                onClick={onClickCreateShop}>
                <i className="fa-solid fa-screwdriver-wrench create-shop-icon"></i>
                Create Shop
            </button>
                <p className='owned-shops-label'>
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
                Your Followed Shops
            </p>
            {/* NEED TO IMPLEMENT FOLLOWED SHOPS */}
            <div className='user-manage-business-cards'>
                {followedShops && followedShops.length ? followedShops.map((s, i) => (
                    <ShopBusinessCard shop={s} key={`shopbusicardcomp${i}`} />
                )) : <p>
                    You have no followed shops currently
                    </p>}
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
                    <h3>Shop Policies</h3>
                <div className='user-manage-shop-policies'>
                    {userShops.length ? userShops.map(s=> (
                <div className='each-shop-policies'>
                    <h3 className='one-shop-name'>{s.name}</h3>
                    <p className='one-shop-policies'>{s.policies}</p>
                </div>
                    )) : null}
                </div>
                <div className='accepted-payments'></div>
            </div>
        </div>
    )
}
