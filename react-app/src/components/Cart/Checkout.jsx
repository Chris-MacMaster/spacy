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
    alert(
      "We have pinged your position to a backward planet in the Milky-Way galaxy. Please check your local Spacey distribution center in 7-10 years with agreed up on payment"
    );
  };

  return (
    <button onClick={checkout} className=" bg-stone-900 text-white p-3 rounded-full w-full my-4 font-bold text-xl marcellus transition duration-300 ease-in-out hover:scale-95 active:bg-stone-800">
      Proceed to checkout
    </button>
  );
}
