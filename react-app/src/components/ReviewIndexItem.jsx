import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import { deleteReview, fetchProductReviews } from "../store/review";
// import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "./OpenModalButton";
import DeleteReviewModal from "./ReviewDeleteModal";

const ReviewIndexItem = ({ review, product }) => {
  // const dispatch = useDispatch();
  let user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false)
  const ulRef = useRef();
  // const handleDeleteClick = async (e) => {
  //   e.preventDefault();
  //   await dispatch(deleteReview(review.id));
  //   await dispatch(fetchProductReviews(product.id));
  // };
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = () => setShowMenu(false);

  if (!Object.values(review).length || !product) return null;
  // console.log('REVIEWS', review)
  return (
    <div className="reviewIndexItem">
      <div className=" p-[3vmin]">
        <div className="rev-col-a">
          <div className=" mb-[.5vmin] text-[1.5vmin]">
            {Array(5)
              .fill(1)
              .map((s, i) =>
                i < review.stars ? (
                  <i
                    className="fa-solid fa-star"
                    key={`star${i}`}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-star text-slate-500"
                    key={`star${i}`}
                  ></i>
                )
              )}
            {review.stars} (stars)
          </div>
          <div className="">{review.review}</div>

          <div className="flex flex-row items-center text-[2vmin] my-[1vmin]">
            <img
              src={
                review.User.profilePic
                  ? review.User.profilePic
                  : "https://i.imgur.com/mMEwXsu.png"
              }
              alt="usericon"
              className=" object-cover w-[7vmin] h-[7vmin] mr-3 min-h rounded-full"
            />
            <p className=" relative text-slate-600 text-sm">
              {review.User.firstName} {review.User.lastName}{" "}
              {review.createdAt.slice(0, -12)}
            </p>
          </div>
          {user &&
          Object.values(review).length > 0 &&
          review.userId === user.id ? (
            <div>
              <OpenModalButton
                buttonText={
                  <button
                    className=" p-3 rounded-lg px-8 m-4 uppercase text-white transition-all ease-in-out duration-300 font-bold text-xs bg-red-600 active:bg-red-800 hover:scale-95"
                  >
                    Delete Review
                  </button>
                }
                modalComponent={
                  <DeleteReviewModal reviewId={review.id} product={product} />
                }
                onClick={openMenu}
              onItemClick={closeMenu}
              />

              <NavLink to={`/product-reviews/${review.id}/edit`}>
                <button className=" p-3 rounded-lg px-8 m-4 uppercase text-white transition-all text-xs ease-in-out duration-300 font-bold  bg-cyan-600 active:bg-cyan-800 hover:scale-95">
                  Edit Review
                </button>
              </NavLink>
            </div>
          ) : null}
        </div>
        {review?.ReviewImages ? (
          <img
            className=" rounded-lg w-[20vmin] h-[20vmin] object-cover mx-auto my-4"
            src={review.ReviewImages?.url}
            alt="not loaded"
          />
        ) : null}
      </div>
      <hr />
    </div>
  );
};

export default ReviewIndexItem;
