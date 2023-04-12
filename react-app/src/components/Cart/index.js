import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import RemoveItemButton from "./RemoveItemButton"
export default function DisplayCart(){

    const dispatch = useDispatch()

    const [user, cart] = useSelector(state => [state.session.user, Object.values(state.cartReducer.products)])

    useEffect(() =>{
        dispatch(fetchCart())
    },[dispatch, user])

    console.log("!?!?!?!?????", cart[0])
    if(!cart) return <h2>You have no items in your cart, don't you want to buy something?</h2>

    return (
        <div>
            <ul>
                {cart.map((product, i )=> (
                    <li key={product.id}>
                        <div>
                            {product.name} {product.price}~~{cart[i].quantity}
                        </div>
                        <div>
                        <RemoveItemButton cartId={cart[i].id}/>
                        </div>
                        <div>
                        <img src={product.productImage}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
