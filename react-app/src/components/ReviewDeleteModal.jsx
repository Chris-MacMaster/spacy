import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { deleteReview, fetchProductReviews } from "../store/review";
import { fetchOneProduct } from "../store/product";
import IconTrashCan from "./Icons/IconTrashCan";
import IconX from "./Icons/IconX";

export default function DeleteReviewModal({ reviewId, product }) {
  const { closeModal } = useModal();

  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    await dispatch(deleteReview(reviewId));
    await dispatch(fetchProductReviews(product.id)).then(
      dispatch(fetchOneProduct(product.id))
    );
    closeModal();
  };

  return (
    <div className="max-w-lg">
      <h1 className="mb-12 text-3xl text-center  baskerville">
        Confirm Delete
      </h1>
      <h3>Are you sure you want to delete this review?</h3>
      <div className="flex flex-col items-center mt-12">
        <button
          onClick={handleClick}
          className="flex flex-row items-center justify-center w-64 p-3 my-3 font-bold text-white uppercase transition-all duration-300 ease-in-out rounded-lg bg-emerald-600 hover:scale-95 active:bg-emerald-800"
        >
          <span className="mr-3">
            <IconTrashCan />
          </span>
          Delete Review
        </button>
        <button
          onClick={closeModal}
          className="flex flex-row justify-center w-64 p-3 my-3 font-bold text-white uppercase transition-all duration-300 ease-in-out bg-red-600 rounded-lg hover:scale-95 active:bg-red-800"
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
