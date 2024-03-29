import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { addCartItemThunk } from "../../store/cart";
import { CartContext } from "../../context/CartContext";

export default function AddToCart({ cart, product, user, quantity, txt }) {
  const dispatch = useDispatch();
  const [btnEnabled, setBtnEndabled] = useState(false);

  const { addToCart } = useContext(CartContext);

  const productCart = (arrOfCarts) =>
    arrOfCarts.filter((currentCart) => currentCart?.productId === product.id);

  const addItem = async (e) => {
    if (!user) {
      addToCart(product, quantity);
      return;
    }
    let theCart = productCart(Object.values(cart.products));
    if (theCart?.quantity === product.available && !txt) {
      return alert("Every available item already in cart.");
    }
    setBtnEndabled(true);
    await dispatch(addCartItemThunk(product.id, user.id, quantity));
    setBtnEndabled(false);
  };

  return (
    <button
      onClick={addItem}
      className="w-full p-2 my-4 text-lg font-bold text-white transition-all duration-300 ease-in-out rounded-full bg-stone-800 active:bg-stone-700 hover:scale-95"
      disabled={btnEnabled}
    >
      {txt ? txt : "Add to cart"}
    </button>
  );
}
