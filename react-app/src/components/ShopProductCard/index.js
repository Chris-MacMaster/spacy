import './ShopProductCard.css'

export default function ShopProductCard({ product }) {
    if (!product.ProductImages[0].url) return null

    return (
        <div className='shop-product-card'>
        <div className='product-tooltip-heart product-tool-tips'>
        <i className="fa-regular fa-heart"></i></div>
        <img src={`${product.ProductImages[0].url}`}
        alt='preview'
        className='shop-product-preview-image'/>
        <p className='product-name'>
            {product.name}
        </p>
        <p className='shop-product-price'>
            ${product.price}
        </p>
        </div>
    )
}