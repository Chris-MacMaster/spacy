import React, { useState, useContext } from "react"
import { useDispatch } from "react-redux"
import { addCartItemThunk } from "../../store/cart"
import { CartContext } from "../../context/CartContext"

export default function AddToCart({cart, product, user, quantity, txt}){
    const dispatch = useDispatch()
    const [btnEnabled, setBtnEndabled] = useState(false)

    const { addToCart} = useContext(CartContext)

    const productCart = (arrOfCarts) => arrOfCarts.filter(currentCart => currentCart?.productId === product.id)

    // const cartItem = Object.values(cartItems).filter(item => item.productId === product.id)[0]
    const addItem = async (e) => {
        if(!user) {
            addToCart(product, quantity)
            return
        }
        let theCart = productCart(Object.values(cart.products))

        if(theCart?.quantity === product.available && !txt) {
            return alert("Every available item already in cart.")
        }
        setBtnEndabled(true)
        await dispatch(addCartItemThunk(product.id, user.id, quantity))
        setBtnEndabled(false)
    }

    return (
        <div className="add-to-cart-div">
            <button onClick={addItem} className='add-to-cart-button' disabled={btnEnabled}>
                {txt ? txt : 'Add to cart'}
            </button>
        </div>
    )
}
