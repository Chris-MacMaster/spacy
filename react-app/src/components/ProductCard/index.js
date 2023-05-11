import './ProductCard.css'

export default function ProductCard({ product }) {
    if (!product.ProductImages[0].url) return null

    return (
        <div className='product-card'>
        <div className='product-tooltip-heart product-tool-tips'>
        <i className="fa-regular fa-heart"></i></div>
        <div className='product-tooltip-price product-tool-tips'>
        ${product.price}</div>
        <img src={`${product.ProductImages[Math.floor(Math.random() * product.ProductImages.length)].url}`}
        alt='preview'
        className='product-preview-image'/>
        </div>
    )
}
