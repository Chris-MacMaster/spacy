import './Header.css'
import { Link, NavLink, useHistory } from 'react-router-dom'
import Navigation from '../Navigation'
import { Switch, Route } from 'react-router-dom'
import { getSearchResults } from '../../store/search'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchShops } from '../../store/shops'
import { authenticate } from '../../store/session'
import { fetchCart } from '../../store/cart'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import { CartContext } from "../../context/CartContext"

function Header({ isLoaded }) {
    const [parameters, setParameters] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const [ hasLoaded, setHasLoaded ] = useState(false)

    const { cartItems } = useContext(CartContext)
    const itemsInCart = Object.values(cartItems).reduce((acc, el) => acc + (+el.quantity), 0)
    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(getSearchResults(parameters))
        await dispatch(fetchCart())
        history.push(`/search/${parameters}`)
    }
    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchShops())
            await dispatch(authenticate())
            return setHasLoaded(true)
        }
        loadData()
    }, [dispatch])

    const cart = useSelector(state => state.cart && state.cart.products ? state.cart.products : null)
    const cartTotal = Object.values(cart).reduce((acc, p) => p?.quantity ? p.quantity + acc : acc + 0, 0)
    const shops = useSelector(state=> state.shops.allShops)
    const user = useSelector(state => state.session.user)

    const headerTabs = ['Gifts & Gift Cards', 'Craft Supplies', 'Art & Collectibles', 'Toys & Entertainment', 'Wedding & Party', 'Home & Living', 'Clothing & Shoes', 'Jewelry & Accessories', 'Home Favorites']

    if (!hasLoaded) return null

    const userShop = user ? Object.values(shops).filter(s=> s.ownerId ===user.id) : null

    return (
        <div className='header-container'>
            <div className='header'>

            <Link to={'/'}>
            <img src='https://i.imgur.com/nJxi8TL.png' alt='logoim' className='logoim'></img>
            </Link>
            <Link to={`/`}><span className='logo'>Spacey</span></Link>

            <div className='search-bar'>
                <form onSubmit={handleSubmit} className='search-bar-form'>
                <input className='header-search' id='header-search' type='text' value={parameters}
                onChange={(e) => setParameters(e.target.value)}
                placeholder='Search for anything in the universe'></input>
                <div className='telescope-search'>
                <i className="fa-solid fa-magnifying-glass" onClick={handleSubmit}></i>
            </div>
            </form>

            </div>

                <div className='shop-manager'>
                    {user && user?.id && userShop.length  && (
                        <NavLink to={`/shops/${userShop[0].id}`} >
                            <div className='header-tip'>Shop Manager</div>
                        <i className="fa-solid fa-store header-icons"></i>
                        </NavLink>
                    )}
                    </div>

                <div className='navigation'>
                    <div className='header-tip'>User Details</div>
                <Navigation isLoaded={isLoaded} />
                    {isLoaded && (
                        <Switch>
                        <Route path="/login" >
                            <LoginFormModal />
                        </Route>
                        <Route path="/signup">
                            <SignupFormModal />
                        </Route>
                        </Switch>)}
                </div>
                    <div className='cart'>
                        {user && cartTotal && cartTotal > 0 ? (
                        <NavLink to='/cart'
                        style={{textDecoration: "none"}}>
                        <div className='number-in-cart'>{cartTotal}</div>
                        </NavLink>
                        ) : !user && itemsInCart > 0 ? <NavLink to='/cart'
                        style={{textDecoration: "none"}}>
                        <div className='number-in-cart'>{+itemsInCart}{}</div>
                        </NavLink> : null}
                    <NavLink to='/cart'>
                        <div className='header-tip'>Cart</div>
                    <i className="fa-solid fa-cart-shopping header-icons"></i>
                    </NavLink>
                    </div>
            </div>

            <div className='header-tabs'>
                {headerTabs?.map(tab => <span className='header-tab' key={`${tab}`}>{tab}</span>)}
            </div>
        </div>
    )
}
export default Header
