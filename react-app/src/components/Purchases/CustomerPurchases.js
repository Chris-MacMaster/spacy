import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPuchases } from "../../store/purchase";
import { NavLink, useHistory } from "react-router-dom/";
import LoadingIcon from "../LoadingIcon";
import "./Purchases.css";
import AddToCart from "../Cart/AddToCart";
import { deleteReview } from "../../store/review";

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
    <div className="purchase-div">
      <h2>Purchases:</h2>
      {console.log(sortedPurchases)}
      {purchases &&
        Object.keys(sortedPurchases).map((el) => (
          <div className="purchase-date-div">
            {Object.values(sortedPurchases[el]).map((item) => (
              <div className="purchase-shop-div">
                <div className="purchase-shop-wrapper">
                  <div className="name-and-cost">
                    <span className="purchase-shop-name">
                      Purchased from{" "}
                      <NavLink to={`/shops/${item[0].shopId}`}>
                        {item[0].shopName}
                      </NavLink>{" "}
                      on {el.slice(0, 25)}
                    </span>
                    <span className="total-cost">
                      $
                      {item
                        .reduce((acc, el) => acc + el.quantity * el.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="follow-this-shop">
                    Follow this shop for updates and special offers
                  </div>
                </div>
                <div className="item-map-div">
                  {item.map((el) => (
                    // <div className="purchase-item-div">
                    <div className="item-container">
                      <div className="purchase-product-img-div one">
                        <img
                          className="purchase-product-img one"
                          src={el.productImage}
                          alt={`ele${el.productName}`}
                        />
                      </div>
                      <div className="item-information">
                        <div className="product-name-div">
                          <NavLink
                            className="product-name-div"
                            to={`/products/${el.productId}`}
                          >
                            {el.productName}
                          </NavLink>
                        </div>

                        {el.review ? (
                          <div className="purchase-review">
                            <div className="rev-stars purchase-stars">
                              <span>
                                {Array(5)
                                  .fill(1)
                                  .map((s, i) =>
                                    i < el.stars ? (
                                      <i
                                        className="fa-solid fa-star gold-star  review-index-stars"
                                        key={`star${i}`}
                                      ></i>
                                    ) : (
                                      <i
                                        className="fa-solid fa-star blank-star review-index-stars"
                                        key={`star${i}`}
                                      ></i>
                                    )
                                  )}
                              </span>
                            </div>
                            <div className="the-review">{el.review}</div>
                            <button
                              className="purchase-edit-review"
                              onClick={() => toEditReview(el.reviewId)}
                            >
                              Edit review
                            </button>
                            <button
                              className="purchase-edit-review"
                              onClick={(e) => handleDeleteClick(e, el.reviewId)}
                            >
                              Delete review
                            </button>
                          </div>
                        ) : (
                          <div className="review-item-button-div">
                            <button
                              className="review-this-item"
                              onClick={() => toReview(el.productId)}
                            >
                              Review this item
                            </button>
                          </div>
                        )}

                        <div className="flx">
                          <AddToCart
                            className="buy-it-again"
                            cart={cart}
                            product={{ id: el.productId }}
                            quantity={1}
                            user={user}
                            txt="Buy this again"
                          />
                          <div className="el-price">${el.price}</div>
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
