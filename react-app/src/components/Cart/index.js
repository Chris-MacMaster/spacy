import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import RemoveItemButton from "./RemoveItemButton"
import ChangeQuantity from "./ChangeQuantity"
export default function DisplayCart(){

    const dispatch = useDispatch()

    const [user, cart] = useSelector(state => [state.session.user, Object.values(state.cartReducer.products)])

    useEffect(() =>{
        dispatch(fetchCart())
    },[dispatch, user])
    console.log(cart)
    if(!cart.length) return <h2>You have no items in your cart, don't you want to buy something?</h2>

    return (
        <div>
            <ul>
                {cart.map((product, i )=> (
                    <li key={product.id}>
                        <div>
                        {product.name} {product.price}~~{cart[i].quantity}
                        </div>
                        <div>
                        <ChangeQuantity cartId={cart[i].id} quantity={cart[i].quantity} productId={product.id}/>
                        </div>
                        <div>
                        <RemoveItemButton cartId={cart[i].id}/>
                        </div>
                        <div>
                        <img src={product.productImage} alt='preview'/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
