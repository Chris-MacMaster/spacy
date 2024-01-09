import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStorePuchases } from "../../store/purchase";
import { useParams } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";

export default function StoreOrders() {
  const purchases = useSelector((state) => state.purchases.shopPurchases);
  const dispatch = useDispatch();
  const params = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchStorePuchases(+params.shopId));
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch, params.shopId]);

  if (!hasLoaded) return <LoadingIcon />;
  if (!purchases) return;
  let sortedPurchases = groupItemsBySellDate(purchases);

  return (
    <div className="purchase-div">
      {purchases &&
        Object.keys(sortedPurchases).map((el) => {
          return (
            <>
              <div>{el}</div>
              <div>
                {sortedPurchases[el].map((el) => (
                  <>{el.productName}</>
                ))}
              </div>
            </>
          );
        })}
    </div>
  );
}

function groupItemsBySellDate(orders) {
  if (!orders) return null;
  const groupedItems = {};

  for (const key in orders) {
    const date = new Date(orders[key].createdAt);
    if (!groupedItems[date]) groupedItems[date] = [];
    groupedItems[date].push(orders[key]);
  }

  return groupedItems;
}
