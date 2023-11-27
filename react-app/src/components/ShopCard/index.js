import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../store/product";
import { fetchProductReviews } from "../../store/review";
import { NavLink } from "react-router-dom";
import OpenModalButton from '../OpenModalButton'
import { useRef } from 'react'
import { useState } from "react";
import UnfollowShopModal from '../UnfollowShopModal'
import { unfollowShop } from "../../store/shops";

export default function ShopCard({ shop }) {
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);

  // option modal
  const ulRef = useRef(); //for modal
  const [showMenu, setShowMenu] = useState(false);
  // modal components
  const openMenu = () => {
      if (showMenu) return
      setShowMenu(true)
  }
  useEffect(() => {
      if (!showMenu) return;
      const closeMenu = e => {
          if (!ulRef.current.contains(e.target)) {
              setShowMenu(false);
          }
      }
      document.addEventListener('click', closeMenu)
  }, [showMenu])
  const closeMenu = () => setShowMenu(false)

  useEffect(() => {
    const loadData = async () => {
      dispatch(fetchProducts());
      dispatch(fetchProductReviews());
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch]);

  const handleUnfollow = (e) => {
    e.preventDefault();
    dispatch(unfollowShop(shop.id));
  };

  const products = useSelector((state) => state.products.allProducts);
  const reviews = useSelector((state) => state);
  if (!hasLoaded || !products || !reviews) return null;
  const filteredProducts = Object.values(products).filter(
    (p) => p.shopId === shop.id
  );
  const reviewedProducts = filteredProducts.filter(
    (p) => typeof p.avgRating != "string"
  );
  const shopRating =
    reviewedProducts.reduce(
      (acc, p) =>
        typeof p.avgRating === "string" ? acc + 0 : acc + p.avgRating,
      0
    ) / reviewedProducts.length;
  return (
    <div className="border-[1px] border-slate-300 rounded-xl relative flex flex-col justify-center content-center shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
      <div className="grid grid-cols-4 gap-1 relative rounded-t-xl overflow-hidden">
        {filteredProducts
          ? filteredProducts
              .map((p, i) => (
                <NavLink to={`/products/${p.id}`}>
                  <img
                    className="h-[15vmin] w-full object-cover transition-all duration-300 ease-in-out hover:opacity-60"
                    src={`${p.ProductImages[1].url}}`}
                    key={`im${i}`}
                    alt="shopcardimg"
                  ></img>
                </NavLink>
              ))
              .slice(0, 4)
          : null}
      </div>
      <div className="flex flex-row justify-between p-3">
        <NavLink to={`/shops/${shop.id}`} className="flex">
          <img
            className="object-cover w-[7vmin] h-[7vmin] rounded-lg"
            src={`${shop.ShopImage.url}`}
            alt="shop-card-logo-alt"
          ></img>
          <div className=" ml-2">
            <span className=" font-bold">{shop.name}</span>
            <div className="shop-card-stars">
              {Array(5)
                .fill(1)
                .map((s, i) =>
                  s <= shopRating ? (
                    <i
                      className="fa-solid fa-star text-black"
                      key={i}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-star text-slate-600"
                      key={i}
                    ></i>
                  )
                )}{" "}
              {filteredProducts.length} items
            </div>
          </div>
        </NavLink>

        <div className="self-center rounded-full border-[1px] border-slate-300 shadow-lg text-red-600 cursor-pointer px-1" title="Unfollow">
          {/* <i
            onClick={handleUnfollow}
            className="fa-solid fa-heart landing-shop-heart"
          ></i> */}

          {/* need to hook up to icon without Unfollow text */}
          <div className='unfollow-shop-modal'>
                    <OpenModalButton
                        buttonText={<i className="fa-solid fa-heart landing-shop-heart" ></i>}
                        onClick={openMenu}
                        className='shop-pol-modal'
                        onItemClick={closeMenu}
                        modalComponent={<UnfollowShopModal shopId={shop.id} />} />
                </div>
        </div>
      </div>
    </div>
  );
}
