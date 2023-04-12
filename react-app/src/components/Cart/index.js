import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import RemoveItemButton from "./RemoveItemButton"
import CheckoutCart from "./Checkout"
import ChangeQuantity from "./ChangeQuantity"
import { groupItemsByStore } from "./helper"

export default function DisplayCart(){

    const dispatch = useDispatch()

    const [user, cart] = useSelector(state => [state.session.user, state.cartReducer.products])

    useEffect(() =>{
        dispatch(fetchCart())
    },[dispatch, user])
    console.log("!!!!fdsafdsa!!!", cart)
    if(!Object.values(cart)) return <h2>You have no items in your cart, don't you want to buy something?</h2>

    // const itemsByStore = groupItemsByStore(cart)
    // console.log( Object.values(itemsByStore))
    // for (const i of Object.values(itemsByStore)) console.log(typeof i)
    return (
        <div>
            <ul>
                {Object.values(cart).map((product, i )=> (
                    <li key={product.id}>
                        <div>
                        {product.name} {product.price}~~{product.quantity}
                        </div>
                        <div>
                        <ChangeQuantity cartId={product.id} quantity={product.quantity} productId={product.id}/>
                        </div>
                        <div>
                        <RemoveItemButton cartId={product.id}/>
                        <CheckoutCart />
                        </div>
                        <div>
                        <img src={product.productImage} alt='preview'/>
                        </div>
                    </li>
                ))}
                {/* {itemsByStore.map((i) =>(
                   <> {console.log(i)} </>
                ))} */}
            </ul>
        </div>
    )
}
