import './Header.css'
import { Link, NavLink, useHistory } from 'react-router-dom'
import Navigation from '../Navigation'
import { Switch, Route } from 'react-router-dom'
import LoginFormPage from '../LoginFormPage'
import SignupFormPage from '../SignupFormPage'

import { getSearchResults } from '../../store/search'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchShops } from '../../store/shops'
import { authenticate } from '../../store/session'

function Header({ isLoaded }) {

    const [parameters, setParameters] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const results = dispatch(getSearchResults(parameters))
        // console.log('results', results)
        history.push(`/search/${parameters}`)
    }
    useEffect(() => {
        dispatch(fetchShops())
        dispatch(authenticate())
    }, [dispatch])

    const shops = useSelector(state=> state.shops.allShops)
    const user = useSelector(state => state.session.user)
    if (!shops) return null
    const userShop = user ? Object.values(shops).filter(s=> s.ownerId ===user.id) : null
    return (
        <div className='header-container'>
        <div className='header'>
        <img src='https://i.imgur.com/nJxi8TL.png' alt='logoim' className='logoim'></img>
        <Link to={`/`}><span className='logo'>spacey</span></Link>

        <div className='search-bar'>

        <form onSubmit={handleSubmit}>
        <input className='header-search' id='header-search' type='text' value={parameters}
        onChange={(e) => setParameters(e.target.value)}
        placeholder='Search for anything in the universe'></input>
        </form>


        <div className='telescope-search'>
        <i className="fa-solid fa-magnifying-glass"></i>

        </div>
        </div>
        <div className='shop-manager'>
            {user && user?.id && userShop.length ? (
                <NavLink to={`/shops/${userShop[0].id}`} >
                    <div className='header-tip'>Shop Manager</div>
                <i className="fa-solid fa-store"></i>
                </NavLink>
            ) : (
                <i className="fa-solid fa-store"></i>
            )}
            </div>

        <div className='navigation'>
            <div className='header-tip'>User Details</div>
        <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Switch>
                <Route path="/login" >
                    <LoginFormPage />
                </Route>
                <Route path="/signup">
                    <SignupFormPage />
                </Route>
                </Switch>)}
        </div>

            <div className='cart'>
            <NavLink to='/cart'>
                <div className='header-tip'>Cart</div>
            <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
            </div>
        </div>


        <div className='header-tabs'>
            <span className='header-tab'>Home Favorites</span>
            <span className='header-tab'>Jewelry & Accessories</span>
            <span className='header-tab'>Clothing & Shoes</span>
            <span className='header-tab'>Home & Living</span>
            <span className='header-tab'>Wedding & Party</span>
            <span className='header-tab'>Toys & Entertainment</span>
            <span className='header-tab'>Art & Collectibles</span>
            <span className='header-tab'>Craft Supplies</span>
            <span className='header-tab'>Gifts & Gift Cards</span>
        </div>
        </div>
    )
}
export default Header
