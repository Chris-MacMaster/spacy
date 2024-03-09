import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { fetchFollowedShops, unfollowShop } from "../store/shops";
import IconX from "./Icons/IconX";

export default function UnfollowShopModal({ shopId }) {
  const { closeModal } = useModal();

  const dispatch = useDispatch();

  const handleUnfollow = (e) => {
    e.preventDefault();
    dispatch(unfollowShop(shopId))
      .then(closeModal)
      .then(dispatch(fetchFollowedShops()));
  };

  return (
    <div className="max-w-lg ">
      <div className="">
        <h1 className="mb-12 text-3xl text-center baskerville">
          Confirm Unfollow
        </h1>
        <h3>
          Are you sure you want to unfollow this shop? It will disappear off
          your followed shops list.
        </h3>
      </div>
      <div className="flex flex-col items-center mt-12">
        <button
          className="flex flex-row items-center justify-center w-64 p-3 my-3 text-white uppercase transition-all duration-300 ease-in-out rounded-lg bg-emerald-600 hover:scale-95 active:bg-emerald-800"
          onClick={handleUnfollow}
        >
          <i className="mr-3 fas fa-regular fa-heart"></i>Unfollow Shop
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
      </div>
    </div>
  );
}
