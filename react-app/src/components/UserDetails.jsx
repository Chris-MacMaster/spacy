import { NavLink, useHistory, useParams } from "react-router-dom";
import "./UserDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authenticate } from "../store/session";
import { fetchShops, fetchFollowedShops } from "../store/shops";
import LoadingIcon from "./LoadingIcon";
import ShopCard from "./ShopCard";
import { deleteShopRequest } from "../store/shops";
import IconWrenchScrewDriver from "./IconWrench";
import IconShop from "./IconShop";
export default function UserDetails() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(authenticate());
      await dispatch(fetchShops());
      await dispatch(fetchFollowedShops());
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);
  const shops = useSelector((state) => state.shops.allShops);
  const followedShopState = useSelector((state) => state.shops.followedShops);
  if (!hasLoaded) return <LoadingIcon />;
  // if (!user || parseInt(user.id) !== parseInt(userId) || !shops) return null;

  const userShops = Object.values(shops).filter(
    (s) => parseInt(s.ownerId) === parseInt(userId)
  );

  const followedShops = Object.values(followedShopState);
  const onClickCreateShop = () => history.push("/shops/new");
  const deleteShop = async (shopId) => {
    await dispatch(deleteShopRequest(shopId));
    await dispatch(fetchShops());
  };
  return (
    <div className=" min-h-screen max-w-screen-lg flex flex-col items-center mx-auto ">
      <div className="flex flex-row w-full">
        <img
          src={
            user && user.profilePic
              ? user.profilePic
              : "https://i.imgur.com/mMEwXsu.png"
          }
          alt="profile pic"
          className=" rounded-full aspect-square object-cover w-[10vmin] my-[3vmin] mr-[1vmin]"
        />
        <div className="flex flex-col justify-center">
          <div className=" marcellus text-[3vmin] ">
            {user.firstName} {user.lastName}
          </div>
          <div className="user-deets-user-shops">
            {userShops &&
              userShops.map((s, i) => (
                <div className="flex flex-row justify-center">
                  <NavLink
                    to={`/shops/${s.id}`}
                    key={`link${i}`}
                    className=" flex flex-row font-bold text-cyan-600 via-fuchsia-700 hover:underline text-[1.8vmin]"
                  >
                    <IconShop />
                    <span key={`shopname${i}`}>{s.name}</span>
                  </NavLink>
                  {user.id === parseInt(userId) ? (
                    <>
                      <button
                        id="shop-delete-button"
                        className="user-delete-product"
                        onClick={(e) => deleteShop(s.id)}
                        key={`shopdel${i}`}
                      >
                        <IconWrenchScrewDriver />
                      </button>
                      <button
                        id="shop-edit-button"
                        className="user-edit-product"
                        onClick={(e) => history.push(`/shops/edit/${s.id}`)}
                        key={`shopedit${i}`}
                      >
                        <i
                          class="fa-solid fa-pen-to-square"
                          key={`editpen${i}`}
                        />
                      </button>
                    </>
                  ) : null}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full">
        <button
          className="flex flex-row font-bold p-3 px-8 text-white uppercase bg-orange-700 transition ease-in-out duration-200 rounded-md hover:scale-95 active:bg-orange-900 "
          onClick={onClickCreateShop}
        >
          <IconWrenchScrewDriver />
          Create Shop
        </button>
      </div>

      <hr></hr>

      <div className="text-[3vmin] mb-[5vmin] font-bold w-full marcellus">Favorite shops</div>
      <div className="flex flex-col items-center w-full">
        <div className=" grid grid-cols-2 items-center gap-2 w-full">
          {followedShops && followedShops.length ? (
            followedShops.map((s, i) => <ShopCard shop={shops[s.id]} />)
          ) : (
            <div>Go follow some shops! </div>
          )}
        </div>
      </div>
    </div>
  );
}
