import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { fetchFollowedShops, unfollowShop } from "../store/shops";
import IconX from "./IconX";

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
    <div className=" max-w-lg">
      <div className=" ">
        <h1 className=" baskerville text-3xl text-center mb-12">
          Confirm Unfollow
        </h1>
        <h3>
          Are you sure you want to unfollow this shop? It will disappear off
          your followed shops list.
        </h3>
      </div>
      <div className="flex flex-col mt-12 items-center">
        <button
          className="flex flex-row justify-center items-center p-3 uppercase text-white rounded-lg my-3 w-64 bg-emerald-600 hover:scale-95 active:bg-emerald-800 transition-all duration-300 ease-in-out"
          onClick={handleUnfollow}
        >
          <i className="fas fa-regular fa-heart mr-3"></i>Unfollow Shop
        </button>

        <button className="flex flex-row justify-center p-3 uppercase text-white rounded-lg my-3 w-64 bg-red-600 hover:scale-95 active:bg-red-800 transition-all duration-300 ease-in-out" onClick={closeModal}>
          <span className="mr-3">
            <IconX />
          </span>Cancel
        </button>
      </div>
    </div>
  );
}
