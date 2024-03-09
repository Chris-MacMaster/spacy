import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchShops } from "../store/shops";
import IconPadlock from "./Icons/IconPadlock";

export default function ShopPoliciesModal({ shop }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  return (
    <div className="max-w-sm ">
      <h1 className="text-xl baskerville">
        Shop Policies for {shop.name}
      </h1>
      <p className="my-3 ">
        {shop.policies}
      </p>
      <h3 className="text-lg font-bold marcellus">Cancellations</h3>
      <p className="my-3 italic ">Cancellations: accepted</p>
      <p className="my-3 ">
        Request a cancellation: before item has shipped
      </p>
      <h3 className="text-lg font-bold marcellus">Payments</h3>
      <p className="flex my-3 shop-policies-lock">
          <IconPadlock />
        <span className="shop-pol-lock-text">Secure options</span>
      </p>
      <div className="flex flex-col items-center ">
        <img
          src="https://i.imgur.com/QfGSupn.png"
          alt="credit-cards"
          className="max-w-xs my-3 "
        />
        <p className="my-3">
          Accepts Spacey gift cards and Republic Credits
        </p>
        <p className="text-xs text-slate-600">
          Spacey keeps your payment information secure. Spacey shops never
          recevie your credit card information.
        </p>
      </div>
    </div>
  );
}
