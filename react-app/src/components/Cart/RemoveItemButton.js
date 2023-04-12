import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart, removeCartItemThunk } from "../../store/cart"

export default function RemoveItemButton({cartId}){

    const dispatch = useDispatch()

    const [user, cart] = useSelector(state => [state.session.user, Object.values(state.cartReducer.products)])

    useEffect(() =>{
        dispatch(fetchCart())
    },[dispatch, user])

    const removeItem = (e) => {
        console.log(cartId)
        return dispatch(removeCartItemThunk(cartId))
    }


    return (
        <button onClick={removeItem} className="remove-from-cart-button">
            Remove
        </button>
    )
}
