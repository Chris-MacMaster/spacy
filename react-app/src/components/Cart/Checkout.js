import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart, checkoutCartThunk } from "../../store/cart"

export default function CheckoutCart(){
    const dispatch = useDispatch()
    const [user] = useSelector(state => [state.session.user])

    useEffect(() =>{
        dispatch(fetchCart())
    },[dispatch, user])

    const checkout = (e) => {
        console.log()
        return dispatch(checkoutCartThunk())
    }


    return (
        <button onClick={checkout} className="checkout-cart-button">
            Checkout!
        </button>
    )
}
