import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCartThunk } from "../../store/cart";
import { CartContext } from "../../context/CartContext";

export default function CheckoutCart({ setPurchased, cartItems }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { clearCart } = useContext(CartContext);

  const checkout = async (e) => {
    if (user) dispatch(checkoutCartThunk());
    else {
      await fetch("/api/purchases/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItems),
      });

      clearCart();
    }
    setPurchased(true);
  };

  return (
    <a href="#thank-you">
      <button
        onClick={checkout}
        className="w-full p-3 my-4 text-xl font-bold text-white transition duration-300 ease-in-out rounded-full bg-stone-900 marcellus hover:scale-95 active:bg-stone-800"
      >
        Proceed to checkout
      </button>
    </a>
  );
}
