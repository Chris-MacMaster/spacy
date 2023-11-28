import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  fetchOneProduct,
  followProductShop,
  unfollowProductShop,
} from "../../store/product";
import { fetchProductReviews } from "../../store/review";
import { fetchCart } from "../../store/cart";
import ReviewIndexItem from "../Reviews";
import AddToCart from "../Cart/AddToCart";
import { useHistory } from "react-router-dom";
import "./ProductDetail.css";
import OpenModalButton from "../OpenModalButton";
import ShopPoliciesModal from "../ShopPoliciesModal";
import LoadingIcon from "../LoadingIcon";
import ProductImageSlider from "../ProductImageSlider";
import { fetchOneShop, followShop, unfollowShop } from "../../store/shops";
import { CartContext } from "../../context/CartContext";
import { numberInCart } from "./_numberInCart";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, cart] = useSelector((state) => [state.session.user, state.cart]);
  const [showMenu, setShowMenu] = useState(false); //for opening modal
  const ulRef = useRef(); //for modal
  const { productId } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [shopLoaded, setShopLoaded] = useState(false);
  const [chosenImage, setChosenImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(0);
  const { cartItems } = useContext(CartContext);
  //modal components
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

  //dispatching state
  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchOneProduct(productId));
      await dispatch(fetchProductReviews(productId));
      await dispatch(fetchCart());
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch, productId]);

  const product = useSelector((state) => state.products.singleProduct);
  const reviewState = useSelector((state) => state.reviews.productReviews);
  const shopFollow = useSelector((state) => state.products?.singleProduct.Shop);
  const productReviews = Object.values(reviewState).sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );

  console.log('PRODUCT REVIEWS', productReviews)
  useEffect(() => {
    setInCart(numberInCart(user, cart, cartItems, product.id));
  }, [cart, cartItems, product.id, user]);

  useEffect(() => {
    const loadShop = async () => {
      if (!Object.values(product).length) return;
      await dispatch(fetchOneShop(product.shopId));
      return setShopLoaded(true);
    };
    loadShop();
  }, [product, dispatch]);

  const shop = useSelector((state) => state.shops.singleShop);
  const shopsReviews = shopLoaded
    ? shop &&
      shop.Products &&
      shop.Products.length &&
      shop.Products.map((ele) => ele.Reviews).flat()
    : null;
  const avgRating = shopsReviews
    ? shopsReviews.reduce((acc, ele) => ele?.stars + acc, 0) /
      shopsReviews.length
    : null;
  if (!hasLoaded || !shopLoaded) return <LoadingIcon />;
  const handleClick = () => history.push(`/product-reviews/${productId}/new`);

  const handleFollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(followShop(product.Shop.id));
    dispatch(followProductShop(product.id));
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // updates db
    dispatch(unfollowShop(product.Shop.id));
    // updates singleProduct state
    dispatch(unfollowProductShop(product.id));
  };

  const options = [];
  for (let i = 1; i <= product.available; i++) {
    options.push({ value: i });
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 max-w-screen-lg min-h-screen product-columns mx-4 gap-2 mt-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-around">
            <div className=" flex flex-col">
              {product &&
                product.ProductImages &&
                product.ProductImages.map((img, i) => (
                  <img
                    className={`w-[5vmin] h-[5vmin] object-cover rounded-lg m-[.4vmin] hover:opacity-100 transition-all ease-in-out duration-200 cursor-pointer ${
                      chosenImage === i
                        ? "outline outline-4 outline-indigo-700 outline-offset-1 opacity-100"
                        : "opacity-80"
                    }`}
                    alt=""
                    key={i}
                    src={img.url}
                    onClick={(e) => setChosenImage(i)}
                  />
                ))}
            </div>

            <ProductImageSlider
              data={product.ProductImages}
              chosenImage={chosenImage}
              setChosenImage={setChosenImage}
            />
          </div>

          <div className="">
            <div className="marcellus text-[3vmin]">
              {productReviews && productReviews.length ? (
                <p className="">
                  {productReviews.length === 1 ? (
                    <span>{"1 Review"}</span>
                  ) : productReviews.length > 1 ? (
                    <> {productReviews.length} Reviews</>
                  ) : null}
                  {Array(5)
                    .fill(1)
                    .map((s, i) =>
                      i < product.avgRating ? (
                        <i
                          className="fa-solid fa-star m-1 text-[2.5vmin]"
                          key={i}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-star text-gray-500 m-1 text-[2.5vmin]"
                          key={i}
                        ></i>
                      )
                    )}{" "}
                </p>
              ) : (
                <p>
                  New!{" "}
                  <i className="fa-solid fa-star gold-star-product-deets" />{" "}
                </p>
              )}
            </div>
            <hr></hr>
            {user &&
            user.id !== product?.Shop?.ownerId &&
            !productReviews.length ? (
              <div>
                <button
                  className=" font-bold p-3 px-8 text-white uppercase bg-orange-700 transition ease-in-out duration-200 rounded-md hover:scale-95 active:bg-orange-900"
                  onClick={handleClick}
                >
                  Post a Review
                </button>
              </div>
            ) : user &&
              product.Shop?.ownerId !== user.id &&
              !productReviews?.some((r) => r.userId === user.id) ? (
              <div>
                <button
                  className=" font-bold p-3 px-8 text-white uppercase bg-orange-700 transition ease-in-out duration-200 rounded-md hover:scale-95 active:bg-orange-900"
                  onClick={handleClick}
                >
                  Post a Review
                </button>
              </div>
            ) : null}
          </div>
          {/* reviews... */}
          <div className="">
            {productReviews && productReviews.length > 0
              ? productReviews
                  .sort(
                    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
                  )
                  .map((review) => (
                    <ReviewIndexItem
                      review={review}
                      key={review.id}
                      product={product}
                    />
                  ))
              : null}
          </div>
        </div>

        <div className="">
          <div className="text-[2vmin] text-green-600 font-bold">
            {inCart > 0 && <>{inCart} in your cart </>}
          </div>
          <div className="text-[3vmin] thasadith font-bold">
            ${product.price}
          </div>
          <div className="text-[3vmin] thasadith font-bold">{product.name}</div>

          <div className="store-info">
            <NavLink
              to={`/shops/${product.Shop.id}`}
              className="flex font-bold text-[2vmin] hover:underline"
            >
              <div>{product.Shop.name}</div>
              <i className="fa-solid fa-certificate text-fuchsia-700 m-1"></i>
            </NavLink>

            <div className="store-sales">
              {product && product.Shop && product.Shop.sales} sales
              {Array(5)
                .fill(1)
                .map((s, i) =>
                  s <= avgRating ? (
                    <i className="fa-solid fa-star " key={i}></i>
                  ) : (
                    <i className="fa-solid fa-star text-slate-600" key={i}></i>
                  )
                )}
            </div>
            {user && user.id !== product?.Shop?.ownerId && (
              <div className="">
                {product.Shop &&
                  product.Shop.Followed &&
                  product.Shop.Followed.Status &&
                  product.Shop.Followed.Status === "Not Followed" && (
                    <div className=" cursor-pointer w-fit" onClick={handleFollow}>
                      <i className="fa-regular fa-heart mx-2"></i>Follow{" "}
                    </div>
                  )}
                {shopFollow &&
                  shopFollow.Followed &&
                  shopFollow.Followed.Status &&
                  shopFollow.Followed.Status === "Followed" && (
                    <div className=" cursor-pointer w-fit" onClick={handleUnfollow}>
                      <i className="fas fa-regular fa-heart text-red-600 mx-2"></i>
                      Unfollow{" "}
                    </div>
                  )}
              </div>
            )}
          </div>

          <div className="purchase-buttons">
            {product.available > 0 && (
              <span className=" text-[1.5vmin]">Quantity</span>
            )}
            {product.available > 0 && (
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className=" w-full bg-slate-200 border-neutral-500 border-2 rounded-xl p-2 text-[2vmin] drop-shadow-lg mb-8 transition-all duration-200 ease-in-out focus:outline focus:outline-2 focus:outline-cyan-400"
              >
                {options.map((i) => (
                  <option value={i.value}>{i.value}</option>
                ))}
              </select>
            )}
            {product.available > 0 ? (
              <AddToCart
                product={product}
                cart={cart}
                user={user}
                quantity={quantity}
              />
            ) : (
              <button className="button out-of-stock"> Out of stock </button>
            )}
          </div>
          <div className="product-info-b">
            <div className="free-shipping-div">
              {product.freeShipping === true ? (
                <div className="shipping-div">
                  <img
                    src="https://i.imgur.com/oCqcfHM.png"
                    alt=""
                    className="truck-icon"
                  />
                  <span id="p-icon">
                    Hooray this product has free shipping!
                  </span>
                </div>
              ) : (
                "This product does not have free shipping."
              )}
            </div>
            <div className="prod-description">
              <p className="prod-description-p">Description</p>
              <p className="prod-description-text">{product.description}</p>
            </div>
            <OpenModalButton
              buttonText={
                <button className="m-0 mt-[3vmin] font-bold p-3 text-white text-[2vmin] w-[30vmin] marcellus bg-slate-700 transition ease-in-out duration-200 rounded-full hover:scale-95 active:bg-slate-900">
                  View Shop Policies
                </button>
              }
              onClick={openMenu}
              onItemClick={closeMenu}
              modalComponent={<ShopPoliciesModal shop={product.Shop} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
