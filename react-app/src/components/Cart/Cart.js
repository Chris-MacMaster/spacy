import { groupItemsByStore, totalCost } from "./_helpers"
import React, { useState,  } from "react"
import RemoveItemButton from "./RemoveItemButton"
import CheckoutCart from "./Checkout"
import ChangeQuantity from "./ChangeQuantity"
import { NavLink } from "react-router-dom"
import PaymentMethod from "./PaymentMethods"
import './Cart.css'

export default function TheCart({cart}){
  const [purchased, setPurchased] = useState(false)

  const itemsByStore = groupItemsByStore(cart)

  return(
  <div className="cart-wrapper-div">
  <div className="order-page">
    <div className="shopping-bar">
      <div className="cart-quantity">
        <h2 hidden={purchased}>{Object.values(cart).length} items in your cart</h2>
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

    {!Object.values(cart).length &&
    <div className="empty-cart">
      <h2>Your Cart is empty</h2>
      <p>Discover something unique to fill it up</p>
    </div>}
    {Object.values(cart).length !== 0 ?
    (<div className="cart-content">
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
                      <div className="cart-product-info-top">
                        <NavLink to={`/products/${product.id}`}
                          style={{ "text-decoration": "none"}}>{product.name}</NavLink>
                      </div>
                      <ChangeQuantity cartId={product.cartId} quantity={product.quantity} productId={product.productId} available={product.available}/>
                      <p></p>
                      <RemoveItemButton cartId={product.cartId} productId={product.id}/>
                    </div>
                    <div>
                    <div className="item-description"><p>{product.description}</p></div>
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

        <div className="thank-you-div" hidden={!purchased}>
          <h2>Thank you for your purchase</h2>
        </div>

        </div>

        { !purchased && <div className="checkout-div">
          <PaymentMethod totalCost={totalCost(cart)}/>
          <CheckoutCart setPurchased={setPurchased} cartItems={cart}/>
        </div>}
      </div>) : <></>}
  </div>
  </div>
  )
}
