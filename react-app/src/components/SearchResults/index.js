import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../../store/search";
import { NavLink, useParams } from "react-router-dom";

import "./SearchResults.css";
import LoadingIcon from "../LoadingIcon";

function SearchResults() {
  const { parameters } = useParams();
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);
  const products = useSelector((state) => state.search.searchResults);
  useEffect(() => {
    const loadData = async () => {
      await dispatch(getSearchResults(parameters));
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch, parameters]);
  // put products in dependency array to fix search bar bug

  if (!hasLoaded) return <LoadingIcon />;

  return (
    <div className="search-results-div">
      <div className="est-arrival">
        <span className="est-arrival-time">Esitmated Arrival Time </span>
        <span className="est-arrival-any">Any time</span>
      </div>
      <div className="search-result-display">
        {Object.values(products).map((product, i) => (
          <NavLink
            to={`/products/${product.id}`}
            style={{ textDecoration: "none" }}
            key={`linked${i}`}
          >
            <div className="search-product-card" key={`prod-card-${i}`}>
              <div className="search-result-image-div" key={`image-div-${i}`}>
                <img
                  className="search-result-img"
                  src={product.ProductImages[0].url}
                  alt="not found"
                  key={`img${i}`}
                />
              </div>

              <div className="search-product-text" key={`prod-text-${i}`}>
                <p className="search-product-name" key={`prod-name-${i}`}>
                  {product.name}
                </p>
                <p className="search-results-stars" key={`prod-stars${i}`}>
                  {typeof product.avgRating === "number" ? (
                    Array(5)
                      .fill(1)
                      .map((s, i) =>
                        i < product.avgRating ? (
                          <i
                            className="fa-solid fa-star search-results-stars-gold search-stars"
                            key={i}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-star search-results-stars-black grey-search-stars"
                            key={i}
                          ></i>
                        )
                      )
                  ) : (
                    <span className="search-new-product" key={`new${i}`}>
                      New!{" "}
                      <i
                        className="fa-solid fa-star search-results-stars-gold "
                        key={`icon${i}`}
                      />{" "}
                    </span>
                  )}{" "}
                  {product.sales}
                  <span className="search-star-seller" key={`star-seller${i}`}>
                    <i
                      className="fa-solid fa-certificate search-badge"
                      key={`badge${i}`}
                    ></i>
                    Star Seller
                  </span>
                </p>

                <p className="search-result-price" key={`price${i}`}>
                  ${product.price}
                </p>
                <p className="search-result-shop" key={`shop${i}`}>
                  {product.shop.name}
                </p>
                <p className="search-more-like" key={`morelikethis${i}`}>
                  More Like This{" "}
                  <i
                    className="fa-solid fa-arrow-right search-more-like"
                    key={`arrow${i}`}
                  ></i>
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
