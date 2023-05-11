import { NavLink, useHistory } from 'react-router-dom'
import './ShopProductCard.css'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../store/product'
import { fetchOneShop } from '../../store/shops'
// import { authenticate } from '../../store/session'

export default function ShopProductCard({ product, user, shop }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteProduct(product.id))
        dispatch(fetchOneShop(product.shopId))
    }

    const handleEdit = (e) => {
        e.preventDefault()
        history.push(`/products/forms/edit-product/${product.id}`)
    }

    if (!product.ProductImages[0]?.url) return null

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
                {user && user.id === shop.ownerId ? (

                <div className='shop-product-buttons'>
                    <button id='shop-delete-button' onClick={handleDelete} className='user-delete-product'>Delete</button>
                    <button id='shop-edit-button' onClick={handleEdit} className='user-edit-product'>Edit</button>
                </div>
                ) : null}
            </div>
            </NavLink>
        </div>
    )
}
