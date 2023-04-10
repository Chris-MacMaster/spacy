import './Header.css'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation'
import { Switch, Route } from 'react-router-dom'
import LoginFormPage from '../LoginFormPage'
import SignupFormPage from '../SignupFormPage'

import { getSearchResults } from '../../store/search'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

function Header({ isLoaded }) {

    const [parameters, setParameters] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const results = dispatch(getSearchResults(parameters))
        console.log('results', results)
    }

    return (
        <div className='header-container'>
        <div className='header'>
        <Link to={`/`}><span className='logo'>etzy</span></Link>

        <div className='search-bar'>

        <form onSubmit={handleSubmit}>
        <input className='header-search' type='text' value={parameters}
        onChange={(e) => setParameters(e.target.value)}
        placeholder='Search for anything in the universe'></input>
        </form>

        
        <div className='telescope-search'>
        <i className="fa-solid fa-telescope"></i>
        </div>
        </div>

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

        <div className='cart'>
        <i className="fa-solid fa-cart-shopping"></i></div>
        </div>
        <div className='header-tabs'>
            <span className='header-tab'>Home Favorites</span>
            <span className='header-tab'>Jewelry & Accessories</span>
            <span className='header-tab'>Clothing & Shoes</span>
            <span className='header-tab'>Home & Living</span>
            <span className='header-tab'>Wedding & Party</span>
            <span className='header-tab'>Toys & Entertainment</span>
            <span className='header-tab'>Art & Collectibles</span>
            <span className='header-tab'>Art & Collectibles</span>
            <span className='header-tab'>Craft Supplies</span>
            <span className='header-tab'>Gifts & Gift Cards</span>
        </div>
        </div>
    )
}
export default Header
