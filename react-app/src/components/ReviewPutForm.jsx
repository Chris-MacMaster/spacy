import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editReview, getOneReview } from "../store/review";
import LoadingIcon from "./LoadingIcon";
import IconAlert from "./Icons/IconAlert";

export default function ReviewPutForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const reviewToEdit = useSelector((state) => state.reviews.singleReviewGet);
  const user = useSelector((state) => state.session.user);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getOneReview(reviewId));
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch, reviewId]);

  const [review, setReview] = useState(reviewToEdit.review || "");
  const [stars, setStars] = useState(reviewToEdit.stars || "");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (Object.values(reviewToEdit).length) {
      setReview(reviewToEdit.review);
      setStars(reviewToEdit.stars);
    }
  }, [reviewToEdit]);

  useEffect(() => {
    const e = {};
    setErrors(e);
    if (!review) e.review = "Must submit a review";
    if (review.length < 40)
      e.reviewLength = "Review must be at least 40 characters";
    if (!stars) e.stars = "Must submit a value for stars.";
  }, [review, stars, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (Object.values(errors).length) return;
    await dispatch(editReview(reviewId, review, stars));
    history.push(`/products/${reviewToEdit.Product.id}`);
  };
  if (!hasLoaded) return <LoadingIcon />;
  if (
    !Object.values(reviewToEdit).length ||
    !user ||
    !Object.keys(reviewToEdit.Product).includes("ProductImages") ||
    !Object.keys(reviewToEdit.Product).includes("Shop")
  ) {
    return null;
  }

  return (
    <>
      <div className=" min-h-screen flex flex-col items-center">
        <form
          className="max-w-screen-lg flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row my-12">
            {reviewToEdit.Product.ProductImages.length > 0 ? (
              <img
                src={reviewToEdit.Product.ProductImages[0].url}
                alt="not loading"
                className="object-cover w-[20vmin] h-[20vmin] rounded-lg"
              />
            ) : null}
            <div className=" ml-6 ">
              <p className=" thasadith text-2xl">
                {reviewToEdit.Product.Shop.name}
              </p>
              <p className=" font-bold marcellus text-xl">
                {reviewToEdit.Product.name}
              </p>
            </div>
          </div>

          <h2 className="thasadith font-bold text-center text-3xl">
            My review
          </h2>
          <p className=" text-xs text-slate-600 my-3 text-center">
            What did you like about this product?
          </p>
          <p className=" text-xs text-slate-600 my-3 text-center">
            Help others by sending your feedback.
          </p>

          <div className="flex flex-row justify-center">
            {[1, 2, 3, 4, 5].map((ele, i) => (
              <span
                className={`review-span`}
                onClick={() => setStars(ele)}
                key={"star" + ele}
              >
                <i
                  className={`fa-solid fa-star text-xl mx-1 ${
                    stars >= ele
                      ? ` text-yellow-600 hover:contrast-50`
                      : `text-slate-400 hover:contrast-0`
                  }`}
                  key={ele}
                ></i>
              </span>
            ))}
          </div>

          {hasSubmitted && errors.stars && (
            <div className="error">* {errors.stars}</div>
          )}

          <textarea
            name="review"
            className=" border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline my-2 w-full"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {hasSubmitted && errors.review && (
            <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2">
              <IconAlert /> {errors.review}
            </div>
          )}

          {hasSubmitted && errors.reviewLength && (
            <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2">
              <IconAlert /> {errors.reviewLength}
            </div>
          )}
          <div className="flex flex-row items-center justify-center">
            <label className=" font-bold text-2xl thasadith text-cyan-600">
              Image
            </label>
            <input
              type="file"
              name="url"
              accept="image/*"
              onChange={(e) => setUrl(e.target.files[0])}
            ></input>
          </div>

          {hasSubmitted && errors.imageURL && (
            <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2">
              <IconAlert /> {errors.imageURL}
            </div>
          )}

          <button
            className="bg-orange-700 font-bold text-white p-3 px-8 rounded-lg uppercase active:bg-orange-800 hover:scale-95 transition-all ease-in-out duration-300 mx-auto"
            type="submit"
          >
            Post your review
          </button>
        </form>
      </div>
    </>
  );
}
