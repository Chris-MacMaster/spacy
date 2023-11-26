import { NavLink, useHistory } from "react-router-dom";
import "./ShopProductCard.css";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/product";
import { fetchOneShop } from "../../store/shops";
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
    <div className="shop-product-card">
      <NavLink
        to={`/products/${product.id}`}
      >
        <img
          src={`${product.ProductImages[0].url}`}
          alt="preview"
          className="shop-product-preview-image"
        />
        <div className="shop-product-bottom">
          <div className="shop-product-info">
            <div className="shop-product-name">{product.name}</div>
            <div className="shop-product-price">${product.price}</div>
          </div>
          {user && user.id === shop.ownerId ? (
            <div className="shop-product-buttons">
              <button
                id="shop-delete-button"
                onClick={handleDelete}
                className="user-delete-product"
              >
                <i class="fa-solid fa-trash-can" />
              </button>
              <button
                id="shop-edit-button"
                onClick={handleEdit}
                className="user-edit-product"
              >
                <i class="fa-solid fa-pen-to-square" />
              </button>
            </div>
          ) : null}
        </div>
      </NavLink>
    </div>
  );
}
