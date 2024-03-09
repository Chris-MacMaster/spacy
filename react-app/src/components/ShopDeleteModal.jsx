import { useDispatch } from "react-redux";
import { deleteShopRequest, fetchShops } from "../store/shops";
import IconX from "./Icons/IconX";
import IconTrashCan from "./Icons/IconTrashCan";
import { useModal } from "../context/Modal";
import { useState } from "react";
import IconAlert from "./Icons/IconAlert";

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
    e.preventDefault();
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
    <form className="max-w-lg ">
      <h1 className="mb-12 text-3xl text-center baskerville">
        Confirm Unfollow
      </h1>
      <h3>
        Are you sure you want to delete this shop? All items in the shop will be
        deleted as well.
      </h3>
      <div className="flex flex-col items-center mt-12">
        <button
          className="flex flex-row items-center justify-center w-64 p-3 my-3 text-white uppercase transition-all duration-300 ease-in-out rounded-lg bg-emerald-600 hover:scale-95 active:bg-emerald-800"
          onClick={deleteShop}
        >
          <span className="mr-3">
            <IconTrashCan />
          </span>
          Delete Shop
        </button>

        <button
          className="flex flex-row justify-center w-64 p-3 my-3 text-white uppercase transition-all duration-300 ease-in-out bg-red-600 rounded-lg hover:scale-95 active:bg-red-800"
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
              className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl"
              key={`shop-delete-modal-error${i}`}
            >
              <IconAlert /> {err}
            </div>
          ))}
      </div>
    </form>
  );
}
