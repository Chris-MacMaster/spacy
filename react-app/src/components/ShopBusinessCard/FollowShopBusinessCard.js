import { useDispatch } from "react-redux";
import "./ShopBusinessCard.css";
import {
  deleteShopRequest,
  fetchOneShop,
  followShop,
  unfollowShop,
} from "../../store/shops";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function FollowShopBusinessCard({ shop }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCreate = (e) => {
    e.preventDefault();
    history.push(`/products/forms/create-product/${shop.id}`);
  };
  // const onClickEditShop = async (id) => {
  //     dispatch(fetchOneShop(shop.id))
  //     history.push(`/shops/edit/${shop.id}`)
  // }
  const onClickDeleteShop = async (e) => {
    await dispatch(deleteShopRequest(shop.id));
  };

  const handleFollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(followShop(shop.id));
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(unfollowShop(shop.id));
  };

  if (!shop) return null;
  return (
    <div className="shop-business-card">
      <NavLink to={`/shops/${shop.id}`}>
        <img
          className="user-manage-shop-pic"
          src={`${
            shop && shop.ShopImage && shop.ShopImage.url
              ? shop.ShopImage.url
              : "https://i.imgur.com/bdSjZyV.png"
          }`}
          alt="user-manage-shop-pic"
        ></img>
      </NavLink>
      <div className="user-manage-business-text">
        <NavLink to={`/shops/${shop.id}`} style={{ textDecoration: "none" }}>
          <h3 className="user-manage-shop-name">{shop.name}</h3>
          <span>{shop.sales} | </span>
          <span>On Spacey since {shop.createdAt.slice(0, -12)}</span>
        </NavLink>
        <div className="user-manage-buttons">
          {/* <button className='user-manage-button user-manage-delete '
                        onClick={handleFollow}>
                        <i className="fa-solid fa-trash-can" />Follow
                    </button> */}
          <button
            onClick={handleUnfollow}
            className="user-manage-button user-manage-create"
          >
            <i className="fas fa-regular fa-heart unfollow-heart "></i>
            Unfollow
          </button>
        </div>
      </div>
    </div>
  );
}
