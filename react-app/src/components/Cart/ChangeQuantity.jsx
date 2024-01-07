import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCartItemThunk } from "../../store/cart";
import { CartContext } from "../../context/CartContext";

export default function ChangeQuantity({
  cartId,
  quantity,
  productId,
  available,
}) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const { quantityChange } = useContext(CartContext);

  const options = [];
  for (let i = 1; i <= available; i++) {
    options.push({ value: i });
  }

  const userQuantityChange = async (updatedQuantity) => {
    await dispatch(
      editCartItemThunk(cartId, updatedQuantity, user.id, productId, available)
    );
    // await dispatch(fetchCart()) //Only way I could get it to re-render without infinite rerender. :| I don't like it, and want to refactor it, but also want to move on and make more progress.
  };

  if (available <= 1) return <></>;

  return (
    <>
      <select
        value={quantity}
        onChange={(e) =>
          user
            ? userQuantityChange(e.target.value)
            : quantityChange(productId, +e.target.value)
        }
        className="border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline"
      >
        {options.map((i) => (
          <option value={i.value}>{i.value}</option>
        ))}
      </select>
    </>
  );
}
