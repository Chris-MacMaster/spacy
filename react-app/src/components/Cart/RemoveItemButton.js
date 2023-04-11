import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import { addCartItemThunk } from "../../store/cart"

export default function RemoveFromCart({product}){

    const dispatch = useDispatch()

    const [user, cart] = useSelector(state => [state.session.user, Object.values(state.cartReducer.products)])

    useEffect(() =>{
        dispatch(fetchCart())
    },[dispatch, user])

    const addItem = (e) => {
        // console.log("!!!!!", product)

        return dispatch(addCartItemThunk(product.id, user.id))
    }
    console.log(cart)

    return (
        <button onClick={addItem} className="remove-from-cart-button">
            Remove
        </button>
    )
}
