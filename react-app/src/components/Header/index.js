import './Header.css'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation'
import { Switch, Route } from 'react-router-dom'
import LoginFormPage from '../LoginFormPage'
import SignupFormPage from '../SignupFormPage'

function Header({ isLoaded }) {

    return (
        <div className='header-container'>
        <div className='header'>
        <Link to={`/`}><span className='logo'>etzy</span></Link>

        <div className='search-bar'>
        <input className='header-search' type='text'
        placeholder='Search for anything in the universe'></input>
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