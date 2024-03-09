import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPuchases } from "../store/purchase";
import { NavLink, useHistory } from "react-router-dom/";
import LoadingIcon from "./LoadingIcon";
import AddToCart from "./Cart/AddToCart";
import { deleteReview } from "../store/review";

export default function UserPurchases() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [purchases, cart, user] = useSelector((state) => [
    state.purchases.userPurchases,
    state.cart,
    state.session.user,
  ]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchUserPuchases());
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch]);

  const toReview = (productId) =>
    history.push(`/product-reviews/${productId}/new`);
  const toEditReview = (reviewId) =>
    history.push(`/product-reviews/${reviewId}/edit`);

  const handleDeleteClick = async (e, reviewId) => {
    e.preventDefault();
    await dispatch(deleteReview(reviewId));
    await dispatch(fetchUserPuchases());
  };

  if (!hasLoaded) return <LoadingIcon />;
  let sortedPurchases = groupItemsBySellDateThenStore(purchases);
  return (
    <div className="flex flex-col items-center justify-center ">
      <h2 className="mt-8 text-3xl font-bold marcellus ">Purchases</h2>
      {console.log(sortedPurchases)}
      {purchases &&
        Object.keys(sortedPurchases).map((el) => (
          <div className="flex flex-col items-center m-4 ">
            {Object.values(sortedPurchases[el]).map((item) => (
              <div className="m-2 w-[50vw] min-w-96 rounded-lg">
                <div className="purchase-shop-wrapper">
                  <div className="flex justify-between p-4">
                    <span className=" text-slate-600">
                      Purchased from{" "}

                      <NavLink to={`/shops/${item[0].shopId}`}>
                        {item[0].shopName}
                      </NavLink>{" "}
                      <p></p>
                      on {el.slice(0, 25)}
                    </span>
                    <span className="font-bold underline ">
                      $
                      {item
                        .reduce((acc, el) => acc + el.quantity * el.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="item-map-div border-[1px] border-slate-300 rounded-lg mt-2 shadow-lg">
                  {item.map((el) => (
                    // <div className="purchase-item-div">
                    <div className="gap-4 p-4 my-2 rounded-lg purchase-container">

                        <img
                          className="object-cover rounded-lg aspect-square"
                          src={el.productImage}
                          alt={`ele${el.productName}`}
                        />
                      <div className="flex flex-col">

                          <NavLink
                            className="text-xl font-bold hover:underline visited:text-slate-700"
                            to={`/products/${el.productId}`}
                          >
                            {el.productName}
                          </NavLink>

                        {el.review ? (
                          <div className="p-2 rounded-lg bg-stone-200">
                            <div className="">
                              <span>
                                {Array(5)
                                  .fill(1)
                                  .map((s, i) =>
                                    i < el.stars ? (
                                      <i
                                        className="text-black fa-solid fa-star"
                                        key={`star${i}`}
                                      ></i>
                                    ) : (
                                      <i
                                        className="fa-solid fa-star text-slate-500"
                                        key={`star${i}`}
                                      ></i>
                                    )
                                  )}
                              </span>
                            </div>
                            <div className="my-4">{el.review}</div>
                            <div className="flex flex-row justify-between">
                            <button
                              className="p-2 font-bold text-white uppercase transition duration-200 ease-in-out bg-green-700 rounded-lg hover:scale-90 active:bg-green-900"
                              onClick={() => toEditReview(el.reviewId)}
                            >
                              Edit
                            </button>
                            <button
                              className="p-2 font-bold text-white uppercase transition duration-200 ease-in-out bg-red-700 rounded-lg hover:scale-90 active:bg-red-900"
                              onClick={(e) => handleDeleteClick(e, el.reviewId)}
                            >
                              Delete
                            </button>
                              </div>
                          </div>
                        ) : (
                            <button
                            className="p-2 font-bold text-white transition duration-200 ease-in-out bg-blue-700 rounded-lg hover:scale-90 active:bg-blue-900"
                            onClick={() => toReview(el.productId)}
                            >
                              Review this item
                            </button>
                        )}

                        <div className="flex items-center justify-between ">
                          <div className="w-40">

                          <AddToCart
                            cart={cart}
                            product={{ id: el.productId }}
                            quantity={1}
                            user={user}
                            txt="Buy again"
                          />
                          </div>
                          <div className="">${el.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

function groupItemsBySellDateThenStore(purchases) {
  //This function takes a normalized object contatining all the purchases and then
  //bundles them together first by date, then by store.
  ///It returns an object that looks like this
  /*
    {date1: { store1: [item1, item2], store2: [item3]}, date2: {store3: [item1]}}
    or thereabouts.
    */
  const groupedItems = {};
  if (!purchases) return null;
  for (const key in purchases) {
    const date = new Date(purchases[key].createdAt);
    if (!groupedItems[date]) {
      groupedItems[date] = {};
    }
    if (!groupedItems[date][purchases[key].shopName]) {
      groupedItems[date][purchases[key].shopName] = [];
    }
    groupedItems[date][purchases[key].shopName].push(purchases[key]);
  }
  return groupedItems;
}
