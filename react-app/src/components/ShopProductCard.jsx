import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/product";
import { fetchOneShop } from "../store/shops";
import IconPencilSquare from "./Icons/IconPencilSquare";
import IconTrashCan from "./Icons/IconTrashCan";
// import { authenticate } from '../../store/session'

export default function ShopProductCard({ product, user, shop }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteProduct(product.id));
    // dispatch(fetchOneShop(product.shopId))
    dispatch(fetchOneShop(shop.id));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/products/forms/edit-product/${product.id}`);
  };

  if (!product.ProductImages[0]?.url) return null;

  return (
    <NavLink
      to={`/products/${product.id}`}
      className=" shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 ease-in-out w-fit h-fit border-[1px] border-slate-300"
    >
      <img
        src={`${product.ProductImages[0].url}`}
        alt="preview"
        className="object-cover rounded-t-lg w-44 h-44"
      />
      <div className="relative w-44">
        <div className="mx-2 ">
          <div className="text-sm ">{product.name}</div>
          <div className="font-bold ">${product.price}</div>
        </div>
        {user && user.id === shop.ownerId ? (
          <div className="absolute bottom-0 right-0 flex flex-row justify-end ">
            <button
              onClick={handleDelete}
              className="mx-1 transition-all duration-300 ease-in-out hover:scale-95"
            >
              <IconTrashCan />
            </button>
            <button
              onClick={handleEdit}
              className="mx-1 transition-all duration-300 ease-in-out hover:scale-95"
            >
              <IconPencilSquare />
            </button>
          </div>
        ) : null}
      </div>
    </NavLink>
  );
}
