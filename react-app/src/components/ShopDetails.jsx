import { NavLink, useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneShop,
  fetchShops,
  followShop,
  followSingleShop,
  unfollowShop,
  unfollowSingleShop,
} from "../store/shops.js";
import ShopProductCard from "./ShopProductCard.jsx";
import { authenticate } from "../store/session.js";
import LoadingIcon from "./LoadingIcon.jsx";
import IconTruck from "./Icons/IconTruck.jsx";
import IconEnvelope from "./Icons/IconEnvelope.jsx";
import IconSpeechBubble from "./Icons/IconSpeechBubble.jsx";
import IconWrenchScrewDriver from "./Icons/IconWrenchScrewDriver.jsx";

export default function ShopDetails() {
  const { shopId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchOneShop(shopId));
      await dispatch(fetchShops());
      await dispatch(authenticate());
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch, shopId]);

  const shop = useSelector((state) => state.shops.singleShop);
  const user = useSelector((state) => state.session.user);

  if (!hasLoaded) return <LoadingIcon />;

  const allReviews =
    shop && shop.Products
      ? shop.Products.map((p) => p.Reviews)
          .flat()
          .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      : null;

  const handleCreate = (e) => {
    e.preventDefault();
    history.push(`/products/forms/create-product/${shopId}`);
  };

  const handleFollow = async (e) => {
    e.preventDefault();
    // updates db join table
    dispatch(followShop(shop.id));
    // updates followed status in state
    dispatch(followSingleShop(shop.id));
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // updates db join table
    dispatch(unfollowShop(shop.id));
    // updates followed status in state
    dispatch(unfollowSingleShop(shop.id));
  };
  console.log("all reviews", allReviews);
  return (
    <div className="flex flex-col items-center mx-4">
      <div className="max-w-screen-lg min-h-screen my-4 ">
        <div className="flex flex-row justify-between p-4 rounded-md bg-stone-300 w-fit">
          <div className="flex flex-row text-[1.5vmin]">
            <img
              src={`${shop?.ShopImages?.url}`}
              alt="shoplogo"
              className=" object-cover rounded-lg w-[10vmin] h-[10vmin]"
            ></img>
            <div className="w-[35vmin] mx-3">
              <h2 className="text-[2vmin] marcellus font-bold">{shop.name}</h2>
              <div className="my-3 ">{shop.description}</div>
              <div className="my-3 ">
                {shop.state}, {shop.country}
              </div>
              <div className="sanserif-text">
                <span className="text-purple-700">
                  <i className="fa-solid fa-certificate starseller"></i>Star
                  Seller!{" "}
                </span>{" "}
                | {Math.floor(Math.random() * 20000)}{" "}
                <span className="">| Sales {shop.avgReview} </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row text-[1.3vmin] gap-4 items-center">
            <div className="">
              <div className="font-bold flex flex-row text-[1.5vmin] items-center">
                <span className="text-purple-700 ">
                  <IconTruck />
                </span>
                Smooth shipping
              </div>
              <span className="text-[1.5vmin]">
                Has a history of shipping on time with tracking.
              </span>
            </div>

            <div className="">
              <div className="font-bold flex flex-row text-[1.5vmin] items-center">
                <span className="text-purple-700 ">
                  <IconEnvelope />
                </span>
                Speedy Replies
              </div>
              <span className="text-[1.5vmin]">
                Has a history of replying to messages quickly.
              </span>
            </div>

            {/* <div className="rave-reviews accolades">
              <div className="bold-text flex text-[1.5vmin]">
                <i className="fa-solid fa-comments purple-icon" />
                Rave Reviews
              </div>
              <span className="accolades-description">
                Average review rating is 4.8 or higher
              </span>
            </div> */}
          </div>

          <div className="flex flex-col items-center leading-4 text-center">
            <img
              className="rounded-full object-cover w-[10vmin] h-[10vmin] m-3"
              src={
                shop.Owner.profilePic
                  ? shop.Owner.profilePic
                  : shop.ShopImages.url
                  ? shop.ShopImages.url
                  : "https://i.imgur.com/mMEwXsu.png"
              }
              alt="user"
            ></img>
            <div className="text-[2vmin]">{shop?.Owner?.firstName}</div>
            <button
              className="flex flex-row items-center justify-center p-3 px-6 my-3 font-bold text-white transition-all duration-300 ease-in-out rounded-full bg-slate-500 hover:scale-95 active:bg-slate-700 drop-slate-lg "
              onClick={() => (window.location = `mailto:${shop.Owner.email}`)}
            >
              <span className="mr-2">
                <IconSpeechBubble />
              </span>
              Contact
            </button>
          </div>
        </div>

        {user && user.id === shop.ownerId ? (
          <button
            onClick={handleCreate}
            className="flex flex-row p-3 px-8 my-4 font-bold text-white uppercase transition-all duration-300 ease-in-out rounded-xl bg-fuchsia-600 active:bg-fuchsia-800 hover:scale-95"
          >
            <span className="mr-3">
              <IconWrenchScrewDriver />
            </span>
            Create Product
          </button>
        ) : (
          <div className="">
            {shop &&
              shop.Followed &&
              shop.Followed.Status &&
              shop.Followed.Status === "Not Followed" && (
                <button
                  className="p-3 px-8 my-4 text-white uppercase transition-all duration-300 ease-in-out rounded-xl bg-emerald-600 active:bg-emerald-800 hover:scale-95"
                  onClick={handleFollow}
                >
                  <i className="mr-3 fa-regular fa-heart shop-heart"></i>Follow
                  Shop
                </button>
              )}
            {shop &&
              shop.Followed &&
              shop.Followed.Status &&
              shop.Followed.Status === "Followed" && (
                <button
                  className="p-3 px-8 my-4 text-white uppercase transition-all duration-300 ease-in-out rounded-xl bg-emerald-600 active:bg-emerald-800 hover:scale-95"
                  onClick={handleUnfollow}
                >
                  <i className="mr-3 text-red-600 fas fa-regular fa-heart shop-heart"></i>
                  Unfollow Shop
                </button>
              )}
          </div>
        )}

        <div className="flex flex-row gap-2 ">
          <div className="item-card-display">
            <h3 className="marcellus font-bold text-[2vmin] mb-[2vmin]">
              Featured Items
            </h3>
            <div className="flex flex-row flex-wrap gap-4 ">
              {shop.Products
                ? shop.Products.map((product) => (
                    <ShopProductCard
                      product={product}
                      key={`product${product.id}`}
                      shop={shop}
                      user={user}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="review-section">
          <h3 className="mb-20 text-4xl marcellus">Reviews</h3>
          <div className="">
            {allReviews
              ? allReviews.map((r, i) => (
                  <>
                    <div className="flex flex-row" key={`reviewdivheader${i}`}>
                      <img
                        src={
                          r.Reviewer.profilePic
                            ? r?.Reviewer?.profilePic
                            : "https://i.imgur.com/mMEwXsu.png"
                        }
                        alt="usericon"
                        className="object-cover h-[7vmin] w-[7vmin] rounded-full mr-3"
                      ></img>
                      <div className="flex flex-col justify-center">
                        <p className="text-lg" key={`username${i}`}>
                          {r.Reviewer.firstName} on {r.createdAt.slice(0, -12)}
                        </p>
                        <div className="">
                          {new Array(5)
                            .fill(1)
                            .map((s, j) =>
                              j <= r.stars ? (
                                <i className="fa-solid fa-star"></i>
                              ) : (
                                <i className="fa-solid fa-star text-slate-500"></i>
                              )
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="iterated-review" key={`div${i}`}>
                      {r.ReviewImages && r.ReviewImages.url ? (
                        <img
                          className=" object-cover h-[23vmin] w-[23vmin] rounded-lg mx-auto my-8"
                          src={`${r.ReviewImages.url}`}
                          alt="reviewimg"
                          key={`reviewimage${i}`}
                        ></img>
                      ) : null}
                      <p className="review-paragraph" key={`review${i}`}>
                        {r.review}
                      </p>
                      <NavLink to={`/products/${r.productId}`}>
                        <div
                          className="product-reviewed"
                          key={`productreviewed${i}`}
                        >
                          <img
                            src={`${
                              shop.Products.filter(
                                (p) => p.id === r.productId
                              )[0].ProductImages[0].url
                            }`}
                            className=" object-cover w-[17vmin] h-[17vmin] rounded-lg m-6"
                            alt="productreviewed"
                            key={`productreviewedimg${i}`}
                          ></img>
                          <div
                            className="mt-[5vmin] text-xl font-bold"
                            key={`revieweditem${i}`}
                          >
                            {
                              shop.Products.filter(
                                (p) => p.id === r.productId
                              )[0].name
                            }
                          </div>
                        </div>
                      </NavLink>
                    </div>

                    <hr key={`hr${i}`}></hr>
                  </>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
