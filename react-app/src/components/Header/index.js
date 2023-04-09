import './Header.css'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation'
import { Switch, Route } from 'react-router-dom'
import LoginFormPage from '../LoginFormPage'
import SignupFormPage from '../SignupFormPage'

function Header({ isLoaded }) {

    return (
        <>
        <div className='header'>
        <Link to={`/`}><span className='logo'>etzy</span></Link>

        <div className='search-bar'>
        <input type='header-search'
        placeholder='Search for anything in the universe'></input>
        <i class="fa-regular fa-telescope"></i>
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
        <i class="fa-solid fa-cart-shopping"></i></div>
        </div>
        </>
    )
}
export default Header
