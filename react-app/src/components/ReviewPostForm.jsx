import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchOneProduct } from "../store/product";
import { createProductReview } from "../store/review";
import { fetchOneShop } from "../store/shops";
import IconAlert from "./Icons/IconAlert";
export default function ReviewPostForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();
  const product = useSelector((state) => state.products.singleProduct);
  const user = useSelector((state) => state.session.user);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    dispatch(fetchOneProduct(productId));
    dispatch(fetchOneShop(product.shopId));
  }, [dispatch, productId, product.shopId]);

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const err = {};
    setErrors(err);
    if (!review) err.review = "Must submit a review";
    if (review.length < 40)
      err.reviewLength = "Review must be at least 40 characters";
    if (!stars) err.stars = "Must submit a value for stars.";
    // if (!url) err.url = "Please upload an image.";
  }, [review, stars, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (Object.values(errors).length) return;
    const reviewData = { product_id: productId, review, stars, url };
    await dispatch(createProductReview(reviewData));
    history.push(`/products/${productId}`);
  };

  if (
    !user ||
    !Object.keys(product).includes("ProductImages") ||
    !Object.keys(product).includes("Shop")
  )
    return null;

  return (
    <>
      <div className="flex flex-col items-center min-h-screen ">
        <form
          className="flex flex-col items-center max-w-screen-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row my-12">
            {product.ProductImages.length > 0 ? (
              <img
                src={product.ProductImages[0].url}
                alt="not loading"
                className="object-cover w-[20vmin] h-[20vmin] rounded-lg"
              />
            ) : null}
            <div className="ml-6 ">
              <p className="text-2xl  thasadith">{product.Shop.name}</p>
              <p className="text-xl font-bold  marcellus">{product.name}</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center thasadith">
            My review
          </h2>
          <p className="my-3 text-xs text-center  text-slate-600">
            What did you like about this product?
          </p>
          <p className="my-3 text-xs text-center  text-slate-600">
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
            className="w-full p-2 my-2 transition duration-200 ease-in-out border-2 border-gray-300  rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {hasSubmitted && errors.review && (
            <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
              <IconAlert /> {errors.review}
            </div>
          )}

          {hasSubmitted && errors.reviewLength && (
            <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
              <IconAlert /> {errors.reviewLength}
            </div>
          )}
          <div className="flex flex-row items-center justify-center">
            <label className="text-2xl font-bold  thasadith text-cyan-600">
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
            <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
              <IconAlert /> {errors.imageURL}
            </div>
          )}

          <button
            className="p-3 px-8 mx-auto font-bold text-white uppercase transition-all duration-300 ease-in-out bg-orange-700 rounded-lg active:bg-orange-800 hover:scale-95"
            type="submit"
          >
            Post your review
          </button>
        </form>
      </div>
    </>
  );
}
