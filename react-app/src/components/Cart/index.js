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
    if(!Object.values(cart).length) return <h2>You have no items in your cart, don't you want to buy something?</h2>

    const itemsByStore = groupItemsByStore(cart)

    return Object.keys(itemsByStore).map((storeName) => (
        <div key={storeName}>
          <h2>{storeName}</h2>
          <ul>
            {itemsByStore[storeName].map((product, index) => (
              <li key={`${storeName}-product-${index}`}>
                {product.name}, {}
              </li>
            ))}
          </ul>
        </div>
      ));
}
