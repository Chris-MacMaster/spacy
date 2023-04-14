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
        alert("We have pinged your position to a backward planet in the Milky-Way galaxy. Please check your local Spacey distribution center in 7-10 years with agreed up on payment")
        return dispatch(checkoutCartThunk())

    }

    return (
        <button onClick={checkout} className="checkout-cart-button">
            Checkout!
        </button>
    )
}
