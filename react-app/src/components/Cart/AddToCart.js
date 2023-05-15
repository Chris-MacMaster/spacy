import React, { useEffect, useState } from "react"
import { createSelectorHook, useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import { addCartItemThunk } from "../../store/cart"

export default function AddToCart({cart, product}){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [btnEnabled, setBtnEndabled] = useState(false)
    useEffect(() =>{
        dispatch(fetchCart())
    },[dispatch, user])

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
        if(!user) return (
            alert("We are woefully sorry to inform you that due to recent attacks by space pirates we can only allow logged in users to add items to cart!")
        )

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
