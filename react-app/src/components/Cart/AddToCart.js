import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import { addCartItemThunk } from "../../store/cart"

export default function AddToCart({cart, product}){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    useEffect(() =>{
        dispatch(fetchCart())
    },[dispatch, user])
    const addItem = async (e) => {
        if(!user) return (
            alert("We are woefully sorry to inform you that due to recent attacks by space pirates we can only allow logged in users to add items to cart!")
        )
        await dispatch(addCartItemThunk(product.id, user.id))
        await dispatch(fetchCart())
    }
    return (
        <button onClick={addItem} className={`add-to-cart-button`}>
            Add to cart
        </button>
    )
}
