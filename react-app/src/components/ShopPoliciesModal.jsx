import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchShops } from "../store/shops";
import IconPadlock from "./IconPadlock";

export default function ShopPoliciesModal({ shop }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  return (
    <div className="  max-w-sm">
      <h1 className=" baskerville text-xl">
        Shop Policies for {shop.name}
      </h1>
      <p className=" my-3">
        {shop.policies}
      </p>
      <h3 className=" font-bold text-lg marcellus">Cancellations</h3>
      <p className=" italic my-3">Cancellations: accepted</p>
      <p className=" my-3">
        Request a cancellation: before item has shipped
      </p>
      <h3 className=" font-bold text-lg marcellus">Payments</h3>
      <p className="shop-policies-lock flex my-3">
          <IconPadlock />
        <span className="shop-pol-lock-text">Secure options</span>
      </p>
      <div className=" flex flex-col items-center">
        <img
          src="https://i.imgur.com/QfGSupn.png"
          alt="credit-cards"
          className=" max-w-xs my-3"
        />
        <p className="my-3">
          Accepts Spacey gift cards and Republic Credits
        </p>
        <p className=" text-xs text-slate-600">
          Spacey keeps your payment information secure. Spacey shops never
          recevie your credit card information.
        </p>
      </div>
    </div>
  );
}
