import { useDispatch } from "react-redux";
import { deleteShopRequest, fetchShops } from "../store/shops";
import IconX from "./IconX";
import IconTrashCan from "./IconTrashCan";
import { useModal } from "../context/Modal";
import { useState } from "react";
import IconAlert from "./IconAlert";

export default function ShopDeleteModal({ shopId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validate = async () => {
    const err = [];
    if (shopId === 1) err.push("Deleting this shop is forbidden");
    if (err.length > 0) setErrors([err]);
    setHasSubmitted(true);
    return errors;
  };
  const deleteShop = async (e, shopId) => {
    e.preventDefault()
    await validate();
    if (shopId === 1 || errors.length > 0) {
      return;
    } else {
      await dispatch(deleteShopRequest(shopId));
      await dispatch(fetchShops());
      closeModal();
    }
  };
  return (
    <form className=" max-w-lg">
        <h1 className=" baskerville text-3xl text-center mb-12">
          Confirm Unfollow
        </h1>
        <h3>
          Are you sure you want to delete this shop? All items in the
          shop will be deleted as well.
        </h3>
      <div className="flex flex-col mt-12 items-center">
        <button
          className="flex flex-row justify-center items-center p-3 uppercase text-white rounded-lg my-3 w-64 bg-emerald-600 hover:scale-95 active:bg-emerald-800 transition-all duration-300 ease-in-out"
          onClick={deleteShop}
        >
          <span className="mr-3">
            <IconTrashCan />
          </span>
          Delete Shop
        </button>

        <button
          className="flex flex-row justify-center p-3 uppercase text-white rounded-lg my-3 w-64 bg-red-600 hover:scale-95 active:bg-red-800 transition-all duration-300 ease-in-out"
          onClick={closeModal}
        >
          <span className="mr-3">
            <IconX />
          </span>
          Cancel
        </button>
        {errors.length > 0 &&
          hasSubmitted &&
          errors.map((err, i) => (
            <div
              className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2"
              key={`shop-delete-modal-error${i}`}
            >
              <IconAlert /> {err}
            </div>
          ))}
      </div>
    </form>
  );
}
