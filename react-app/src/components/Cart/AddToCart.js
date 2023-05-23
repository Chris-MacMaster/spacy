import React, { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import { addCartItemThunk } from "../../store/cart"
import { CartContext } from "../../context/CartContext"

export default function AddToCart({cart, product, user}){
    const dispatch = useDispatch()
    const [btnEnabled, setBtnEndabled] = useState(false)

    const { addToCart } = useContext(CartContext)

    const productCart = (arrOfCarts) => {
        return arrOfCarts.reduce((acc, currentCart) => {
            if (currentCart.productId === product.id) {
                return currentCart
            } else {
                return acc;
            }
        }, null)
    }

    const addItem = async (e) => {
        if(!user) {
            addToCart(product)
            return
        }

        let theCart = productCart(Object.values(cart.products))
        if(theCart?.quantity === product.available) {
            return alert("Every available item already in cart.")
        }
        setBtnEndabled(true)
        await dispatch(addCartItemThunk(product.id, user.id))
        await dispatch(fetchCart())
        setBtnEndabled(false)
    }

    return (
        <button onClick={addItem} className={`add-to-cart-button`} disabled={btnEnabled}>
            Add to cart
        </button>
    )
}
