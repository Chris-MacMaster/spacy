// import ProductDetail from '../Products/ProductDetail'
import './ProductCard.css'
// import { NavLink } from 'react-router-dom'

export default function ProductCard({ product }) {
    if (!product.ProductImages[0].url) return null
    // console.log('PRODUCT', product)
    return (
        // <NavLink to={`/products/${product.id}`} component={ProductDetail}>
        <div className='product-card'>
        <div className='product-tooltip-heart product-tool-tips'>
        <i className="fa-regular fa-heart"></i></div>
        <div className='product-tooltip-price product-tool-tips'>
        ${product.price}</div>
        <img src={`${product.ProductImages[0].url}`}
        alt='preview'
        className='product-preview-image'/>


        </div>

        // </NavLink>
    )
}
