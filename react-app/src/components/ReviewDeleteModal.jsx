import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { deleteReview, fetchProductReviews } from "../store/review";
import { fetchOneProduct } from "../store/product";
import IconTrashCan from "./IconTrashCan";
import IconX from "./IconX";

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
      <h1 className=" baskerville text-3xl text-center mb-12">
        Confirm Delete
      </h1>
      <h3>Are you sure you want to delete this review?</h3>
      <div className="flex flex-col mt-12 items-center">
        <button
          onClick={handleClick}
          className="flex flex-row justify-center items-center p-3 uppercase text-white font-bold rounded-lg my-3 w-64 bg-emerald-600 hover:scale-95 active:bg-emerald-800 transition-all duration-300 ease-in-out"
        >
          <span className="mr-3">
            <IconTrashCan />
          </span>
          Delete Review
        </button>
        <button
          onClick={closeModal}
          className="flex flex-row justify-center p-3 uppercase text-white font-bold rounded-lg my-3 w-64 bg-red-600 hover:scale-95 active:bg-red-800 transition-all duration-300 ease-in-out"
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
