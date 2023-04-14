import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import RemoveItemButton from "./RemoveItemButton"
import CheckoutCart from "./Checkout"
import ChangeQuantity from "./ChangeQuantity"
import { groupItemsByStore, totalCost } from "./_helpers"
import { NavLink } from "react-router-dom"
import PaymentMethod from "./PaymentMethods"
import './Cart.css'

export default function DisplayCart(){
  const [user, cart] = useSelector(state => [state.session.user, state.cartReducer.products ?? null])

    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    useEffect(() =>{
      dispatch(fetchCart())
      .then(() => setLoaded(true))
    },[dispatch, user])

    if(!user) return (
    <div className="no-user-no-cart">
    <h1>Due to recent cart theft by space pirates, only verified users are permitted a cart</h1>
    </div>
    )

    if(!loaded) return <h2 className="loading-cart">Loading Cart...</h2>

    if (!Object.values(cart).length && loaded) {
      console.log(Object.values(cart))
      return <h2>You have no items in your cart, don't you want to buy something?</h2>
    }

    // if(loaded && !Object.values(cart).length === 0) return <h2>You have no items in your cart, don't you want to buy something?</h2>

    const itemsByStore = groupItemsByStore(cart)
    // const checkoutPrice = totalCost(cart)
    console.log(Object.values(cart).length)

    return(
     <>
    {/* <>{(!cart) ? 4 : (
      <></>
    )}</> */}
    <div className="order-page">
      <div className="shopping-bar">
          <div className="cart-quantity">
            <h2>{Object.values(cart).length} items in your cart</h2>
          </div>
          <div>
          <h4>Keep shopping</h4>
          </div>
        </div>
      <div className="cart-content">
        <div className="names-are-hard">
        {Object.keys(itemsByStore).map((storeName) => (
            <div key={storeName} className="shop-info">
              <div className="contact-us-bar">
                <div className="shop-title-and-image">
                <img src={itemsByStore[storeName][0].shopImage} alt="preview" className="cart-shop-icon"/>
                <h3>{storeName}</h3>
                </div>
                <div className="contact-shop">
                  <NavLink to={`/shops/${itemsByStore[storeName][0].shopId}`} className="contact-shop">
                    <h4 className="">Contact Shop</h4>
                  </NavLink>
                </div>
              </div>
              <ul>
                {itemsByStore[storeName].map((product, index) => (
                  <li key={index} className="cart-product">
                    <div className="cart-product-image-div">
                    <img src={product.productImage} alt="preview" className="cart-product-image"/>
                    </div>
                    <div className="cart-product-info">

                    {product.name}. {product.description}
                    <ChangeQuantity cartId={product.cartId} quantity={product.quantity} productId={product.productId} available={product.available}/>
                    <RemoveItemButton cartId={product.cartId}/>
                    ${(product.price * product.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </div>
          <div className="checkout-div">
            {/* <h3>How you'll pay</h3>
            <h3>We're sorry to inform you that the only way you can pay currently is with depleted uranium</h3>
            <p>Item(s) total: ${totalCost(cart)}</p> */}
            <PaymentMethod totalCost={totalCost(cart)}/>
            <CheckoutCart/>
          </div>
        </div>
    </div>
    </>
    )
}
