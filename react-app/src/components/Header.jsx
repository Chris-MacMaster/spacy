import { Link, NavLink, useHistory } from "react-router-dom";

import { getSearchResults } from "../store/search";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchShops } from "../store/shops";
import { authenticate } from "../store/session";
import { fetchCart } from "../store/cart";

import { CartContext } from "../context/CartContext";
import ProfileButton from "./ProfileButton";

function Header({ isLoaded }) {
  const [parameters, setParameters] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [hasLoaded, setHasLoaded] = useState(false);

  const { cartItems } = useContext(CartContext);
  const itemsInCart = Object.values(cartItems).reduce((acc, el) => {
    return acc + +el.quantity;
  }, 0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(getSearchResults(parameters));
    await dispatch(fetchCart());
    history.push(`/search/${parameters}`);
  };
  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchShops());
      await dispatch(authenticate());
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch]);

  const cart = useSelector((state) =>
    state.cart && state.cart.products ? state.cart.products : null
  );
  const cartTotal = Object.values(cart).reduce(
    (acc, p) => (p?.quantity ? p.quantity + acc : acc + 0),
    0
  );
  const shops = useSelector((state) => state.shops.allShops);
  const user = useSelector((state) => state.session.user);

  if (!hasLoaded) return null;

  const userShop = user
    ? Object.values(shops).filter((s) => s.ownerId === user.id)
    : null;

  return (
    <div className="border-b-2 border-slate-300 z-[2] flex flex-col justify-between items-center relative bg-white pb-[1vmin]">
      <div className="flex flex-row items-center justify-around w-full max-w-screen-lg">
        <Link to={"/"}>
          <img
            src="https://i.imgur.com/nJxi8TL.png"
            alt="logo-png"
            className="object-cover w-[7vmin] mt-[1vmin]"
          ></img>
        </Link>
        <Link to={`/`} className=" text-orange-700 text-[4vmin] baskerville">
          Spacey
        </Link>

        <div className="flex mx-2 z-[1]">
          <form
            onSubmit={handleSubmit}
            className="search-bar-form header-search flex flex-row border-slate-800 border-2 rounded-full z-[1]"
          >
            <input
              className="w-[30vmin] bg-white content-center  rounded-full pl-4 text-[1.5vmin] peer focus-within:outline-none"
              type="text"
              value={parameters}
              onChange={(e) => setParameters(e.target.value)}
              placeholder="Search for anything in the universe"
            ></input>
            <div className="telescope-search flex justify-center items-center content-center px-[2vmin] rounded-r-full cursor-pointer p-2 peer-focus:bg-slate-800 transition duration-300">
              <i
                className="fa-solid fa-magnifying-glass peer-focus:text-white text-[2.3vmin]text-right content-center"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>

        <div className="relative group">
          {user && user?.id && userShop.length > 0 && (
            <NavLink to={`/shops/${userShop[0].id}`} className="">
              <div className="bg-white rounded-xl shadow-xl border-[1.5px] border-slate-300 absolute top-12  font-bold transition-all opacity-0  p-3 right-0 group-hover:opacity-100 tooltip">Shop Manager</div>
              <i className="fa-solid fa-store text-[2.5vmin] text-slate-500 hover:text-slate-800"></i>
            </NavLink>
          )}
        </div>

        <div className="relative hover:cursor-pointer">
          <ProfileButton user={user} />
        </div>
        <div className="relative cart group">
          {user && cartTotal && cartTotal > 0 ? (
            <NavLink to="/cart">
              <div className="absolute font-bold text-[1.2vmin] bottom-[1.5vmin] right-0 bg-orange-300 p-1 rounded-full ">
                {cartTotal}
              </div>
            </NavLink>
          ) : !user && itemsInCart > 0 ? (
            <NavLink to="/cart">
              <div className=" absolute font-bold text-[1.2vmin] bottom-[1.5vmin] right-0 bg-orange-300 p-1 rounded-full ">
                {+itemsInCart}
              </div>
            </NavLink>
          ) : null}
          <NavLink to="/cart" className="group">
            <div className=" bg-white rounded-xl shadow-xl border-[1.5px] border-slate-300 absolute top-12  font-bold transition-all opacity-0 p-3 right-0 group-hover:opacity-100 tooltip">
              Cart
            </div>
            <i className="fa-solid fa-cart-shopping text-[2.5vmin] text-slate-500 hover:text-slate-800"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default Header;
