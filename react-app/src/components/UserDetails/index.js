import { NavLink, useHistory, useParams } from 'react-router-dom'
import './UserDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { authenticate } from '../../store/session'
import { fetchShops, fetchFollowedShops } from '../../store/shops'
import LoadingIcon from '../LoadingIcon'
import ShopCard from '../ShopCard'
import { deleteShopRequest } from '../../store/shops'
export default function UserDetails() {
    const {userId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [ hasLoaded, setHasLoaded ] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            await dispatch(authenticate())
            await dispatch(fetchShops())
            await dispatch(fetchFollowedShops())
            return setHasLoaded(true)
        }
        loadData()
    }, [dispatch])

    const user = useSelector(state => state.session.user)
    const shops = useSelector(state => state.shops.allShops)
    const followedShopState = useSelector(state => state.shops.followedShops)
    if (!hasLoaded) return <LoadingIcon />
    if (!user || parseInt(user.id) !== parseInt(userId) || !shops) return null

    const userShops = Object.values(shops).filter(s => parseInt(s.ownerId) === parseInt(userId))

    const followedShops = Object.values(followedShopState)
    const onClickCreateShop = () => history.push('/shops/new')
    const deleteShop = async (shopId) => {
        await dispatch(deleteShopRequest(shopId))
        await dispatch(fetchShops())
    }
    return (
        <div className='user-manage-details'>

            <div className='user-deets'>
            <img src={user && user.profilePic ? user.profilePic : 'https://i.imgur.com/mMEwXsu.png'} alt='' className='user-deets-icon'/>
            <div className='user-deets-text'>
            <div className='user-name'>{user.firstName} {user.lastName}</div>
            <div className='user-deets-user-shops'>
            {userShops && userShops.map((s,i) => (
                <div className='user-deets-bullet'>
                <img src='https://i.imgur.com/bdSjZyV.png' alt='' className='shop-icon' key={`im${i}`}/>
                <NavLink to={`/shops/${s.id}`} style={{ textDecoration: "none"}} key={`link${i}`}>
                <span className='user-deets-user-shop' key={`shopname${i}`}>{s.name}</span>
                </NavLink>
                {user.id === parseInt(userId) ? (
                <>
                <button id='shop-delete-button' className='user-delete-product' onClick={e => deleteShop(s.id)} key={`shopdel${i}`}><i class="fa-solid fa-trash-can" key={`deletepen${i}`}/></button>
                <button id='shop-edit-button' className='user-edit-product' onClick={e => history.push(`/shops/edit/${s.id}`)} key={`shopedit${i}`}>
                    <i class="fa-solid fa-pen-to-square" key={`editpen${i}`}/></button>
                </>
                ) : null}
                </div>
            ))}
            </div>

            </div>
            </div>
            <div className='create-shop-container'>
            <button className='favorite-shop create-shop-button' onClick={onClickCreateShop}>
            <i className="fa-solid fa-screwdriver-wrench create-shop-icon"/>Create Shop
            </button>

            </div>


            <hr></hr>

            <div className='user-deets-title'>Favorite shops</div>
            <div className='user-deets-grid'>
            <div className='user-deets-followed-shops'>
            {followedShops && followedShops.length ? followedShops.map((s, i) => ( <ShopCard shop={shops[s.id]} />)) : <div>Go follow some shops! </div>}
            </div>

            </div>
        </div>
    )
}
