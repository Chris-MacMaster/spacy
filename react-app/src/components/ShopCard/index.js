import { useDispatch, useSelector } from 'react-redux'
import './ShopCard.css'
import { useEffect } from 'react'
import { fetchProducts } from '../../store/product'
import { fetchProductReviews } from '../../store/review'

export default function ShopCard({ shop }) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchProductReviews())
    }, [dispatch])
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
                    <img className='shop-image-grid-image'
                    src={`${p.ProductImages[0].url}}`}
                    key={`im${i}`}
                    alt='shopcardimg'></img>

                )).slice(0,4) : null}

            </div>
            <div className='landing-shops-business-card'>
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
            <div className='shop-card-heart'><i className="fa-regular fa-heart landing-shop-heart"></i></div>
            </div>
        </div>
    )
}
