import React, { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import { addCartItemThunk } from "../../store/cart"
import { CartContext } from "../../context/CartContext"

export default function AddToCart({cart, product, user, quantity}){
    const dispatch = useDispatch()
    const [btnEnabled, setBtnEndabled] = useState(false)

    const { addToCart, cartItems } = useContext(CartContext)

    const productCart = (arrOfCarts) => arrOfCarts.filter(currentCart => currentCart?.productId === product.id)
    console.log(cartItems)
    const cartItem = Object.values(cartItems).filter(item => item.productId === product.id)[0]
    const addItem = async (e) => {
        if(!user) {
            addToCart(product, quantity)
            return
        }
        console.log(cart)
        let theCart = productCart(Object.values(cart.products))
        if(theCart?.quantity === product.available) {
            return alert("Every available item already in cart.")
        }
        setBtnEndabled(true)
        await dispatch(addCartItemThunk(product.id, user.id, quantity))
        await dispatch(fetchCart())
        setBtnEndabled(false)
    }

    console.log(productCart(Object.values(cart.products))[0])
    console.log(cartItem)
    return (
        <div className="add-to-cart-div">

        <button onClick={addItem} className='add-to-cart-button' disabled={btnEnabled}>
            Add to cart
        </button>
        {/* <div className="in-your-cart">
            {user ? (Object.values(cart.products).length ? `${productCart(Object.values(cart.products))[0]?.quantity} currently in cart` : <></>)
            :
            cartItem ? `${product.quantity} currently in cart` : <></>}
        </div> */}
        </div>
    )
}
