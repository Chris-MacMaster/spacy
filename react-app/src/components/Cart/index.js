import React, { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/cart"
import './Cart.css'
import LoadingIcon from "../LoadingIcon"
import { CartContext } from "../../context/CartContext"
import TheCart from "./Cart"


export default function DisplayCart(){
  const [user, cart] = useSelector(state => [state.session.user, state.cart.products ?? null])
  const dispatch = useDispatch()
  const [hasLoaded, setHasLoaded] = useState(false)
  const [purchased, setPurchased] = useState(false)
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext)

  useEffect(() => {
    if (user){
      const loadData = async () => {
        await dispatch(fetchCart())
        return setHasLoaded(true)
      }
      loadData()
    } else if (!user){
      setHasLoaded(true)
    }
  }, [dispatch, user])

  if(!hasLoaded) return <LoadingIcon />



  // if (user && !Object.values(cart).length && hasLoaded && !purchased) {
  //   return <h2 className="no-items">You have no items in your cart, don't you want to buy something?</h2>
  // }

  // if (!user && !Object.values(cartItems).length && hasLoaded && !purchased) {
  //   return <h2 className="no-items">You have no items in your cart, don't you want to buy something?</h2>
  // }

  return <>{user ? <TheCart cart={cart} user={user}/> : <TheCart cart={cartItems} user={user}/> }</>
}
