import { NavLink, useParams, useHistory } from "react-router-dom";
import "./ShopDetails.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneShop,
  fetchShops,
  followShop,
  followSingleShop,
  unfollowShop,
  unfollowSingleShop,
} from "../../store/shops";
import ShopProductCard from "../ShopProductCard.jsx";
import { authenticate } from "../../store/session";
import LoadingIcon from "../LoadingIcon.jsx";
import IconTruck from "../IconTruck";
import IconEnvelope from "../IconEnvelope";
import IconSpeechBubble from "../IconSpeechBubble";
import IconWrenchScrewDriver from "../IconWrenchScrewDriver";
import IconClipboard from "../IconClipboard.jsx";

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

  return (
    <div className="flex flex-col items-center mx-4">
      <div className=" min-h-screen max-w-screen-lg my-4">
        <div className=" p-4 flex flex-row justify-between bg-stone-300 w-fit rounded-md">
          <div className="flex flex-row text-[1.5vmin]">
            <img
              src={`${shop?.ShopImages?.url}`}
              alt="shoplogo"
              className=" object-cover rounded-lg w-[10vmin] h-[10vmin]"
            ></img>
            <div className="w-[35vmin] mx-3">
              <h2 className="text-[2vmin] marcellus font-bold">{shop.name}</h2>
              <div className="  my-3">{shop.description}</div>
              <div className=" my-3">
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

          <div className="text-center leading-4 flex flex-col items-center">
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
              className="flex flex-row justify-center items-center p-3 px-6 my-3 rounded-full bg-slate-500 font-bold text-white  hover:scale-95 active:bg-slate-700 drop-slate-lg transition-all ease-in-out duration-300 "
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
            className="rounded-xl bg-fuchsia-600 active:bg-fuchsia-800 text-white uppercase px-8 hover:scale-95 transition-all duration-300 ease-in-out my-4 flex flex-row font-bold p-3"
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
                  className="rounded-xl bg-emerald-600 active:bg-emerald-800 text-white uppercase px-8 hover:scale-95 transition-all duration-300 ease-in-out my-4 p-3"
                  onClick={handleFollow}
                >
                  <i className="fa-regular fa-heart shop-heart mr-3"></i>Follow
                  Shop
                </button>
              )}
            {shop &&
              shop.Followed &&
              shop.Followed.Status &&
              shop.Followed.Status === "Followed" && (
                <button
                  className="rounded-xl bg-emerald-600 active:bg-emerald-800 text-white uppercase px-8 p-3 hover:scale-95 transition-all duration-300 ease-in-out my-4"
                  onClick={handleUnfollow}
                >
                  <i className="fas fa-regular fa-heart shop-heart text-red-600 mr-3"></i>
                  Unfollow Shop
                </button>
              )}
          </div>
        )}

        <div className=" flex flex-row gap-2">
          <div className=" text-[1.5vmin] leading-7">
            {/* <div className="mapped-categories">
              {shop.Products
                ? shop.Products.map((p, i) => (
                    <div className=" border-b-2 border-transparent hover:border-b-slate-400 transition-all ease-in-out duration-200">
                      <span className="category-list" key={`catp${i}`}>
                        {p.category}
                      </span>
                      <span className="catgory-number" key={`catn${i}`}>
                        {Math.floor(Math.random() * 100)}
                      </span>
                    </div>
                  ))
                : null}
            </div> */}
            <div className="">
              <button
                className=" w-56 flex bg-cyan-600 active:bg-cyan-800 my-4 rounded-xl font-bold text-white hover:scale-95 transition-all duration-300 ease-in-out p-3"
                onClick={() => (window.location = `mailto:${shop.Owner.email}`)}
              >
                <span className="mr-3">
                  {" "}
                  <IconClipboard />{" "}
                </span>{" "}
                Request Custom Order
              </button>
              <button
                className=" w-56 flex bg-cyan-600 active:bg-cyan-800 my-4 rounded-xl font-bold text-white hover:scale-95 transition-all duration-300 ease-in-out p-3"
                onClick={() => (window.location = `mailto:${shop.Owner.email}`)}
              >
                <span className="mr-3">
                  <IconSpeechBubble />
                </span>{" "}
                Contact shop owner
              </button>
            </div>
          </div>
          <div className="item-card-display">
            <h3 className="marcellus font-bold text-[2vmin] mb-[2vmin]">
              Featured Items
            </h3>
            <div className="item-cards">
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
          <h3 className="review-title">Reviews</h3>

          <div className="mapping-reviews">
            {allReviews
              ? allReviews.map((r, i) => (
                  <>
                    <div className="review-header" key={`reviewdivheader${i}`}>
                      <img
                        src="https://i.imgur.com/mMEwXsu.png"
                        alt="usericon"
                        className="user-icon"
                      ></img>
                      <div className="shop-deets-user-deets">
                        <p className="username" key={`username${i}`}>
                          {r.Reviewer.firstName} on {r.createdAt.slice(0, -12)}
                        </p>
                        <div className="shop-deets-stars">
                          {new Array(5)
                            .fill(1)
                            .map((s, j) =>
                              j <= r.stars ? (
                                <i className="fa-solid fa-star gold-star"></i>
                              ) : (
                                <i className="fa-solid fa-star blank-star"></i>
                              )
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="iterated-review" key={`div${i}`}>
                      {r.ReviewImages && r.ReviewImages.url ? (
                        <img
                          className="review-image"
                          src={`${r.ReviewImages.url}`}
                          alt="reviewimg"
                          key={`reviewimage${i}`}
                        ></img>
                      ) : null}
                      <p className="review-paragraph" key={`review${i}`}>
                        {r.review}
                      </p>
                      <NavLink
                        to={`/products/${r.productId}`}
                        style={{ textDecoration: "none" }}
                      >
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
                            className="product-ref-img"
                            alt="productreviewed"
                            key={`productreviewedimg${i}`}
                          ></img>
                          <div
                            className="reviewed-item-name"
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
                    <div className="feedback" key={`feedback${i}`}>
                      <p className="helpful" key={`helpful${i}`}>
                        <i
                          className="fa-solid fa-thumbs-up"
                          key={`thumb${i}`}
                        ></i>
                        Is this review helpful?
                      </p>
                      <p className="report" key={`report${i}`}>
                        <i className="fa-solid fa-flag" key={`flag${i}`}></i>
                        Report this review
                      </p>
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
