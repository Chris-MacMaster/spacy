import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"

export default function DisplayCart(){

    const dispatch = useDispatch()

    const [user, cart] = useSelector(state => [state.session.user, Object.values(state.cartReducer.products)])

    useEffect(() =>{
        dispatch(fetchCart())
    },[dispatch, user])

    console.log(cart[0])
    if(!cart) return <h2>You have no items in your cart, don't you want to buy something?</h2>

    return (
        <div>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        <div>
                            {item.name} {item.price}
                        </div>
                        <div>
                        <img src={item.productImage}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
