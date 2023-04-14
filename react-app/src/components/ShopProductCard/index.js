import { NavLink, useHistory } from 'react-router-dom'
import './ShopProductCard.css'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../store/product'

export default function ShopProductCard({ product }) {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleDelete = (e) => {
        console.log("button clicked")
        e.preventDefault()
        dispatch(deleteProduct(product.id))
    }

    const handleEdit = (e) => {
        e.preventDefault()
        history.push(`/products/forms/edit-product/${product.id}`)
    }

    if (!product.ProductImages[0].url) return null

    return (
        <div className='shop-product-card'>
            <NavLink to={`/products/${product.id}`}
        style={{ textDecoration: 'none' }}>
            <img src={`${product.ProductImages[0].url}`}
            alt='preview'
            className='shop-product-preview-image'/>
            <div className='shop-product-bottom'>
                <div className='shop-product-info'>
                    <p className='shop-product-name'>
                        {product.name}
                    </p>
                    <p className='shop-product-price'>
                        ${product.price}
                    </p>
                </div>
                <div className='shop-product-buttons'>
                    <button id='shop-delete-button' onClick={handleDelete} className='favorite-shop'>Delete Product</button>
                    <button id='shop-edit-button' onClick={handleEdit} className='favorite-shop'>Edit Product</button>
                </div>
            </div>
            </NavLink>
        </div>
    )
}
