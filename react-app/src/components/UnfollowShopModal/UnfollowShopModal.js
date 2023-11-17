import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchFollowedShops, unfollowShop } from "../../store/shops";
import "./UnfollowShopModal.css";

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
    <div className="wholeModal whole-unfollow">
      <div className="text">
        <h1>Confirm Unfollow</h1>
        <h3>
          Are you sure you want to unfollow this shop? It will disappear off
          your followed shops list.
        </h3>
      </div>
      <div className="buttons unfollow-shop-modal-buttons">
        <div>
          <button
            className="favorite-shop unfollow-button"
            onClick={handleUnfollow}
          >
            <i className="fas fa-regular fa-heart shop-heart"></i>Unfollow Shop
          </button>
        </div>

        <div>
          <button className="favorite-shop" onClick={closeModal}>
            {/* <i className="fa-regular fa-heart shop-heart"
                    ></i> */}
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
