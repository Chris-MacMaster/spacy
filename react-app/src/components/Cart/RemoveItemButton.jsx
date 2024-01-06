import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItemThunk } from "../../store/cart";
import { CartContext } from "../../context/CartContext";

export default function RemoveItemButton({ cartId, productId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { removeFromLocalCart } = useContext(CartContext);

  const removeItem = (e) => {
    return dispatch(removeCartItemThunk(cartId));
  };

  return (
    <button
      onClick={() => (user ? removeItem() : removeFromLocalCart(productId))}
      className="p-[2vmin] font-bold bg-orange-600 flex justify-center items-center rounded-lg hover:scale-90 active:bg-orange-800 mx-4 transition-all duration-200 ease-in-out text-white"
    >
      Remove
    </button>
  );
}
