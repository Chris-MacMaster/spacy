import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { deleteReview } from "../../store/review";
import { fetchOneProduct } from "../../store/product";

export default function DeleteReviewModal({ reviewId, product }) {
  const { closeModal } = useModal();

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(deleteReview(reviewId))
      .then(closeModal)
      .then(dispatch(fetchOneProduct(product.id)));
  };

  return (
    <div className="wholeModal">
      <div className="text">
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this review?</h3>
      </div>
      <div className="buttons">
        <button onClick={handleClick} className="yesButton">
          {"Yes (Delete Review)"}
        </button>
        <button onClick={closeModal} className="noButton">
          {"No (Keep Review)"}
        </button>
      </div>
    </div>
  );
}
