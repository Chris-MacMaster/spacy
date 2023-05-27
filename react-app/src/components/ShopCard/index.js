import { useDispatch, useSelector } from 'react-redux'
import './ShopCard.css'
import { useEffect } from 'react'
import { fetchProducts } from '../../store/product'
import { fetchProductReviews } from '../../store/review'
import { NavLink } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import { useRef } from 'react'
import { useState } from 'react'
import UnfollowShopModal from '../UnfollowShopModal/UnfollowShopModal'
import { unfollowShop } from '../../store/shops'

export default function ShopCard({ shop }) {
    const dispatch = useDispatch()
    const ulRef = useRef(); //for modal


    const [showMenu, setShowMenu] = useState(false); //for opening modal



    //modal components
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = e => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('click', closeMenu)
    }, [showMenu])
    const closeMenu = () => setShowMenu(false)

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchProductReviews())
    }, [dispatch])


    const handleUnfollow = (e) => {
        e.preventDefault()
        dispatch(unfollowShop(shop.id))
    }



    const products = useSelector(state=> state.products.allProducts)
    const reviews = useSelector(state=> state)
    if (!products || !reviews) return null
    const filteredProducts = Object.values(products).filter(p=>p.shopId===shop.id)
    const reviewedProducts = filteredProducts.filter(p=> typeof p.avgRating != 'string')
    const shopRating = reviewedProducts.reduce((acc,p)=> typeof p.avgRating === 'string' ? acc + 0 :acc + p.avgRating,0)/reviewedProducts.length
    return (
        <div className='landing-shop-card'>
            <div className='shop-image-grid'>
                {filteredProducts ?
                filteredProducts.map((p,i)=> (
                    <NavLink to={`/products/${p.id}`} >
                        <img className='shop-image-grid-image' src={`${p.ProductImages[1].url}}`} key={`im${i}`}alt='shopcardimg'></img>
                    </NavLink>

                )).slice(0,4) : null}

            </div>
            <div className='landing-shops-business-card'>
            <NavLink to={`/shops/${shop.id}`} style={{ textDecoration: "none", display: "flex"}}>
            <img className='shop-card-logo'
            src={`${shop.ShopImage.url}`}
            alt='shop-card-logo-alt'></img>
            <div className='shop-card-text'>
            <span className='shop-card-shop-name'>{shop.name}</span>
            <div className='shop-card-stars'>{Array(5).fill(1).map((s,i)=> (
                s <= shopRating ? (
                    <i className="fa-solid fa-star landing-shop-gold landing-shop-stars" key={i}></i>
                ) : (
                    <i className="fa-solid fa-star landing-shop-blank landing-shop-stars" key={i}></i>
                )
                ))} {filteredProducts.length} items</div>
            </div>

            </NavLink>

            <div className='shop-card-heart' title='Unfollow'>
                <i onClick={handleUnfollow} className="fa-solid fa-heart landing-shop-heart"></i>

                {/* need to hook up to icon without Unfollow text */}
                {/* <div className='unfollow-shop-modal'>
                    <OpenModalButton
                        buttonText={<i className="fa-solid fa-heart landing-shop-heart" ></i>}
                        onClick={openMenu}
                        className='shop-pol-modal'
                        onItemClick={closeMenu}
                        modalComponent={<UnfollowShopModal shopId={shop.id} />} />
                </div> */}


            </div>




            </div>
        </div>
    )
}
