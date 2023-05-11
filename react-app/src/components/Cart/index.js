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
  const [user, cart] = useSelector(state => [state.session.user, state.cart.products ?? null])

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

    const itemsByStore = groupItemsByStore(cart)

    return(
     <>
    <div className="order-page">
      <div className="shopping-bar">
        <div className="cart-quantity">
          <h2>{Object.values(cart).length} items in your cart</h2>
        </div>
        <div className="keep-shopping-div">
        <NavLink to='/' className='keep-shopping-link'>
        <h4 className="keep-shopping-text">Keep shopping</h4>
        </NavLink>
        </div>
      </div>
      <div className="purchase-protection">
      <i className="fa-regular fa-handshake"></i>
        <p className="etsy-purchase-protection">Spacey purchase protection:</p> <p>Shop confidently knowing if something goes wrong, we've got your back!</p>
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
              {itemsByStore[storeName].freeShipping ? (
                <>
                <p className="cart-grey-text"> Free shipping on this order.</p>
                  {/* <hr className="cart-divider"></hr> */}
                </>
              ) : null}

                {itemsByStore[storeName].map((product, index) => (
                  <li key={index} className="cart-product">
                    <NavLink to={`/products/${product.productId}`}>
                    <div className="cart-product-image-div">
                    <img src={product.productImage} alt="preview" className="cart-product-image"/>
                    </div>
                    </NavLink>
                    <div className="placeholder-name">
                      <div className="cart-product-info">
                        {/* {console.log(product)} */}
                        <div className="cart-product-info-top">
                          <NavLink to={`/products/${product.id}`}
                            style={{ "text-decoration": "none"}}>{product.name}</NavLink>
                        </div>
                        <ChangeQuantity cartId={product.cartId} quantity={product.quantity} productId={product.productId} available={product.available}/>
                        <p></p>
                        <RemoveItemButton cartId={product.cartId}/>
                      </div>
                      <div>
                      <div className="item-description"><p>{product.description}</p></div>
                      {/* <div><p>...</p></div> */}
                      </div>
                      <div className="cost-block">
                        <span>${(product.price * product.quantity).toFixed(2)}</span>
                        <span className="single-item-cost">
                        {product.quantity > 1 ? `(${product.price} each)`: null}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}

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
