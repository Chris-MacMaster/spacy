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
    // console.log('REVIEWS', products)
    const filteredProducts = Object.values(products).filter(p=>p.shopId===shop.id)
    const reviewedProducts = filteredProducts.filter(p=> typeof p.avgRating != 'string')
    const shopRating = reviewedProducts.reduce((acc,p)=> typeof p.avgRating === 'string' ? acc + 0 :acc + p.avgRating,0)/reviewedProducts.length
    return (
        <div className='landing-shop-card'>
            <div className='shop-image-grid'>
                {filteredProducts ?
                filteredProducts.map((p,i)=> (
                    <img className='shop-image-grid-image'
                    src={`${p.ProductImages[Math.floor(Math.random() * p.ProductImages.length)].url}}`}
                    key={`im${i}`}
                    alt='shopcardimg'></img>

                )).slice(0,4) : null}

            </div>
            <div className='landing-shops-business-card'>
            <img className='shop-card-logo'
            src={`${shop.ShopImage.url}`}
            alt='shop-card-logo-alt'></img>

            <div className='shop-card-text'>
            <p>{shop.name}</p>
            <p>{Array(5).fill(1).map(s => (
                s <= shopRating ? (
                    <i class="fa-solid fa-star gold-star landing-shop-stars"></i>
                ) : (
                    <i class="fa-solid fa-star blank-star landing-shop-stars"></i>
                )
                ))} {filteredProducts.length} items</p>
            </div>
            <div className='shop-card-heart'><i className="fa-regular fa-heart landing-shop-heart"></i></div>
            </div>
        </div>
    )
}
