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

  if (!user) {
    return (
      <button
        onClick={() => removeFromLocalCart(productId)}
        className="remove-from-cart-button"
      >
        Remove
      </button>
    );
  }

  return (
    <button
      onClick={removeItem}
      className="remove-from-cart-button loading-bar"
    >
      Remove
    </button>
  );
}
