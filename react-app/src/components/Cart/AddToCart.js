import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import { addCartItemThunk } from "../../store/cart"

export default function AddToCart({cart, product}){

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const [showBubble, setShowBubble] = useState(false)

    useEffect(() =>{
        dispatch(fetchCart())
    },[dispatch, user])



    const addItem = (e) => {
        if(!user) return (
            alert("We are woefully sorry to inform you that due to recent attacks by space pirates we can only allow logged in users to add items to cart!")
        )
        dispatch(addCartItemThunk(product.id, user.id))
        setShowBubble(true);
        setTimeout(() => {
          setShowBubble(false);
        }, 1000);
    }

    if (cart && product) {
        console.log("!!!!!!!!")
        console.log(cart, product)
        let x;
        for (const i in cart.products) {
            console.log(cart.products[i])
            if (product.id = cart.products[i].id) {
                console.log(product.available)
                console.log(cart.products[i].quantity)
            }
        }
    }

    return (
        <button onClick={addItem} className={`add-to-cart-button ${showBubble ? 'show' : ''}`}>
            Add to cart
                <div className={`the-bubble ${showBubble ? 'show' : ''}`}>
                    <p>BLAHBLAH</p>
                </div>
        </button>
    )
}

/*
    button is on a productDetail page, so product state
*/
