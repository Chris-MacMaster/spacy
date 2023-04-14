import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import { addCartItemThunk } from "../../store/cart"

export default function AddToCart({product}){

    const dispatch = useDispatch()

    const [user, cart] = useSelector(state => [state.session.user, Object.values(state.cartReducer.products)])

    useEffect(() =>{
        dispatch(fetchCart())
    },[dispatch, user])

    const addItem = (e) => {
        if(!user) return (
            alert("We are woefully sorry to inform you that due to recent attacks by space pirates we can only allow logged in users to add items to cart!")
        )
        return dispatch(addCartItemThunk(product.id, user.id))
    }
    // console.log(cart)

    return (
        <button onClick={addItem} className="add-to-cart-button">
            Add to cart
        </button>
    )
}

/*
    button is on a productDetail page, so product state
*/
