import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/product";
import { authenticate } from "../store/session";
import { fetchOneShop, fetchShops } from "../store/shops";
import ProductCard from "./ProductCard";
import { NavLink, useHistory } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";
import PopularGifts from "./PopularGifts";
import { fetchCart } from "../store/cart";
import { getSearchResults } from "../store/search";

function Landing({ isLoaded }) {
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);

  const history = useHistory();

  const products = useSelector((state) => state.products.allProducts);
  const user = useSelector((state) => state.session.user);
  const under30arr = Object.values(products).filter(
    (p) => parseInt(p.price) < 30
  );
  const under30 = under30arr[Math.floor(Math.random() * under30arr.length)];
  const others = Object.values(products).filter((p) => p !== under30);
  const title = [
    "Creating Change",
    "Gifts for Her",
    "Gifts for Him",
    "Gifts for Kids",
    "Gifts Under $30",
  ];

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchProducts());
      await dispatch(authenticate());
      await dispatch(fetchShops());
      await dispatch(fetchOneShop(1));
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (user) dispatch(fetchCart());
  }, [dispatch, user]);

  const handleSubmitJewelry = async (e) => {
    e.preventDefault();
    await dispatch(getSearchResults("Jewelry"));
    await dispatch(fetchCart());
    history.push(`/search/${"Jewelry"}`);
  };

  const handleSubmitAdventureOutfitting = async (e) => {
    e.preventDefault();
    await dispatch(getSearchResults("Adventure Outfitting"));
    await dispatch(fetchCart());
    history.push(`/search/${"Adventure Outfitting"}`);
  };

  const handleSubmitRationsandFoodstuffs = async (e) => {
    e.preventDefault();
    await dispatch(getSearchResults("Rations and Foodstuffs"));
    await dispatch(fetchCart());
    history.push(`/search/${"Rations and Foodstuffs"}`);
  };

  const handleSubmitFurnitureandDecor = async (e) => {
    e.preventDefault();
    await dispatch(getSearchResults("Furniture and Decor"));
    await dispatch(fetchCart());
    history.push(`/search/${"Furniture and Decor"}`);
  };

  const handleSubmitAdventureOutfittingexclaim = async (e) => {
    e.preventDefault();
    await dispatch(getSearchResults("Adventure Outfitting!"));
    await dispatch(fetchCart());
    history.push(`/search/${"Adventure Outfitting!"}`);
  };

  const handleSubmitOnSale = async (e) => {
    e.preventDefault();
    await dispatch(getSearchResults("On Sale"));
    await dispatch(fetchCart());
    history.push(`/search/${"On Sale"}`);
  };

  if (!hasLoaded) return <LoadingIcon />;

  const rand1 = products[13]
    ? products[13]
    : others[Math.floor(Math.random() * others.length)];
  const rand2 = products[7]
    ? products[7]
    : others[Math.floor(Math.random() * others.length)];
  const rand3 = products[2]
    ? products[2]
    : others[Math.floor(Math.random() * others.length)];
  const rand4 = products[14]
    ? products[14]
    : others[Math.floor(Math.random() * others.length)];

  return (
    <div className="flex flex-col items-center content-center justify-center min-h-screen mx-4">
      <div className=" absolute top-0 w-screen h-[33vmin] bg-sky-200 z-0"></div>
      <div className="max-w-screen-lg z-[1]">
        <div className="justify-center w-full ">
          {!user ? (
            <h1 className=" marcellus text-center m-8 text-[4vmin]">
              Incredible style and decor, plus one-of-a-kind gifts right this
              way
            </h1>
          ) : (
            <h1 className=" marcellus text-center m-[3vmin] text-[4vmin]">
              Welcome back {user.firstName}
            </h1>
          )}

          <div className="flex flex-row justify-between ">
            <div
              className="border-b-4 border-b-transparent transition ease-in-out duration-200 font-bold text-center hover:scale-95 hover:border-b-slate-800 w-[12vmin] cursor-pointer"
              onClick={handleSubmitJewelry}
            >
              <img
                src="https://i.imgur.com/NtSDPdE.png"
                alt="product"
                className=" object-cover rounded-full aspect-square w-[12vmin]"
              ></img>

              <p className="break-words text-[1.8vmin] mt-2">Jewelry</p>
            </div>
            <div
              className="border-b-4 border-b-transparent transition ease-in-out duration-200 font-bold text-center hover:scale-95 hover:border-b-slate-800 w-[12vmin] cursor-pointer"
              onClick={handleSubmitAdventureOutfitting}
            >
              <img
                src="https://i.imgur.com/bKS0Vs5.jpg"
                alt="product"
                className=" object-cover rounded-full aspect-square w-[12vmin]"
              ></img>
              <p className=" break-words text-[1.8vmin] mt-2">Adventure Outfitting</p>
            </div>
            <div
              className="border-b-4 border-b-transparent transition ease-in-out duration-200 font-bold text-center hover:scale-95 hover:border-b-slate-800 w-[12vmin] cursor-pointer"
              onClick={handleSubmitRationsandFoodstuffs}
            >
              <img
                src="https://i.imgur.com/WQ691xR.png"
                alt="product"
                className=" object-cover rounded-full aspect-square w-[12vmin]"
              ></img>
              <p className=" text-[1.8vmin] mt-2">Rations and Foodstuffs</p>
            </div>
            <div
              className="border-b-4 border-b-transparent transition ease-in-out duration-200 font-bold text-center hover:scale-95 hover:border-b-slate-800 w-[12vmin] cursor-pointer"
              onClick={handleSubmitFurnitureandDecor}
            >
              <img
                src="https://i.imgur.com/KWP0Qte.png"
                alt="product"
                className=" object-cover rounded-full aspect-square w-[12vmin]"
              ></img>
              <p className=" text-[1.8vmin] mt-2">Furniture and Decor</p>
            </div>
            <div
              className="border-b-4 border-b-transparent transition ease-in-out duration-200 font-bold text-center hover:scale-95 hover:border-b-slate-800 w-[12vmin] cursor-pointer"
              onClick={handleSubmitAdventureOutfittingexclaim}
            >
              <img
                src="https://i.imgur.com/pePufdv.jpg"
                alt="product"
                className=" object-cover rounded-full aspect-square w-[12vmin]"
              ></img>
              <p className=" text-[1.8vmin] mt-2">Holiday Gifts!</p>
            </div>
            <div
              className="border-b-4 border-b-transparent transition ease-in-out duration-200 font-bold text-center hover:scale-95 hover:border-b-slate-800 w-[12vmin] cursor-pointer"
              onClick={handleSubmitOnSale}
            >
              <img
                src="https://i.imgur.com/gdYYdaQ.png"
                alt="product"
                className=" object-cover rounded-full aspect-square w-[12vmin]"
              ></img>
              <p className=" text-[1.8vmin] mt-2">On Sale</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-3 mt-12 landing-columns">
          <div className=" p-[3vmin] shadow-xl rounded-lg">
            <p className=" text-[2vmin]">
              Sponsored <i className="fa-solid fa-question"/>
            </p>
            <h2 className="text-[4vmin] marcellus">By Spacey Sellers</h2>
          </div>

          {[
            products["5"],
            products["6"],
            products["7"],
            products["8"],
            products["12"],
            products["1"],
          ].map((product) =>
            product?.ProductImages[1]?.url ? (
              <NavLink
                to={`/products/${product.id}`}
                key={`navlink${product.id}`}
              >
                <ProductCard product={product} key={`${product.id}`} />
              </NavLink>
            ) : null
          )}

          <div className="flex flex-col justify-center p-3 rounded-lg shadow-xl marcellus">
            <span className=" text-[2vmin] ">
              Fun fact: behind every sponsored item there is an intelligent
              lifeform hoping you'll check out their shop
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-[6vmin]">
          <div className="relative w-full">
            <h2 className="thasadith text-[3vmin] font-bold">
              Shop our selections{" "}
              <i className="fa-solid fa-arrow-right text-[3vmin]"></i>
            </h2>
            <h3 className="thasadith text-[3vmin]">
              Curated hand-picked by spacey editors
            </h3>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[rand1, rand2, rand3, rand4, under30].map((rand, i) => (
              <NavLink
                to={`/search/filtered-search/${title[i]}`}
                key={i}
                className=" overflow-hidden border-[1px] border-slate-200 rounded-xl transition ease-in-out shadow-md hover:shadow-2xl duration-200"
              >

                  <img
                    src={`${rand?.ProductImages[1]?.url}`}
                    alt="selection-im"
                    key={`img${i}`}
                    className="object-cover aspect-square"
                  ></img>
                  <h3 key={`h3${i}`} className="text-center text-[2vmin] mt-[.5vmin] font-bold thasadith">
                    {title[i]}
                  </h3>
              </NavLink>
            ))}
          </div>
        </div>

        <div className=" my-[6vmin]">
            <h1 className="thasadith text-[3vmin] font-bold">Popular gifts right now</h1>
          <div className="grid grid-cols-4 gap-3">
            {Object.values(products)
              .reverse()
              .map((p, i) => (
                <NavLink
                  to={`/products/${p.id}`}
                >
                  <PopularGifts product={p} key={i} />
                </NavLink>
              ))}
          </div>
        </div>

        <div className="">
          <h1 className="text-center marcellus text-[4vmin] mb-[6vmin]">What is Spacey</h1>
          <div className="flex flex-col gap-6 mb-[6vmin] sm:grid sm:grid-cols-3 sm:gap-4">
            <div className="text-column">
              <h2 className=" thasadith text-[3vmin]">
                A community of explorers and curious minds
              </h2>
              <p className="text-[2vmin] mt-[2vmin] leading-[5vmin] ">
                {" "}
                Spacey is a online marketplace where people come together to
                expand our horizons and the horizons of mankind. Around here we
                think of the final frontier as too vast, too curious, and we're
                a moth to a flame.
              </p>
            </div>
            <div className="text-column">
              <h2 className=" thasadith text-[3vmin]">Support independent creators</h2>
              <p className="text-[2vmin] mt-[2vmin] leading-[5vmin] ">
                {" "}
                There's no centralized warehouse at Spacey, not even a central
                solar systems, just billions of intelligent lifeforms sharing
                technology and selling things they love. We make the whole
                process of connecting with others parsecs away painless, so that
                we can all discover something extraordinary.
              </p>
            </div>
            <div className="text-column">
              <h2 className=" thasadith text-[3vmin]">Peace of mind</h2>
              <p className="text-[2vmin] mt-[2vmin] leading-[5vmin] ">
                {" "}
                Who is out there? When we finally make contact, will they wish
                us harm? Coerce our labor in mining camps on a barely habitable
                moon? Your safety is the highest priority of our dedicated team.
                And if you ever need assistance, we are always ready to step in
                for support and mediate peace between waring galactic
                federations.
              </p>
            </div>
          </div>
          <h2 className=" thasadith text-[4vmin] text-center">
            Have a question? Well, we've got some answers.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Landing;
