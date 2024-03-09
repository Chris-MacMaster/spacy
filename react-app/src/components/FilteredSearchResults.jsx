import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getFilteredSearchResults } from "../store/search";

function FilteredSearchResults() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const products = useSelector((state) => state.search.filteredSearch);
  useEffect(() => {
    dispatch(getFilteredSearchResults(category));
  }, [dispatch, category]);

  if (!products) return null;

  return (
    <div className="mx-4">
    <div className="max-w-screen-lg min-h-screen mx-auto ">
      <div className="p-2 my-4 text-sm border-2 border-black border-solid rounded-full  w-fit">
        <span className="font-bold">Esitmated Arrival Time: </span>
        <span className="">Any time</span>
      </div>
      <div className="flex flex-row flex-wrap gap-2 ">
        {Object.values(products).map((product, i) => (
          <NavLink to={`/products/${product.id}`} key={`linked${i}`}>
            <div className="" key={`prod-card-${i}`}>
                <img
                  className="object-cover w-40 h-32 rounded-lg "
                  src={product.ProductImages[0].url}
                  alt="not found"
                  key={`img${i}`}
                />

              <div className="" key={`prod-text-${i}`}>
                <p className="" key={`prod-name-${i}`}>
                  {product.name}
                </p>
                <p className="" key={`prod-stars${i}`}>
                  {typeof product.avgRating === "number" ? (
                    Array(5)
                      .fill(1)
                      .map((s, i) =>
                        i < product.avgRating ? (
                          <i
                            className="text-sm fa-solid fa-star"
                            key={i}
                          ></i>
                        ) : (
                          <i
                            className="text-sm fa-solid fa-star"
                            key={i}
                          ></i>
                        )
                      )
                  ) : (
                    <span className="text-sm" key={`new${i}`}>
                      New!{" "}
                      <i
                        className="text-sm fa-solid fa-star"
                        key={`icon${i}`}
                      />{" "}
                    </span>
                  )}{" "}
                  {product.sales}
                  <span
                    className="text-xs font-bold"
                    key={`star-seller${i}`}
                  >
                    <i
                      className="text-sm text-purple-700 fa-solid fa-certificate"
                      key={`badge${i}`}
                    ></i>
                    Star Seller
                  </span>
                </p>

                <p className="font-bold" key={`price${i}`}>
                  ${product.price}
                </p>
                <p className="text-sm " key={`shop${i}`}>
                  {product.shop.name} <i
                    className="fa-solid fa-arrow-right"
                    key={`arrow${i}`}
                  ></i>
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  </div>
  );
}

export default FilteredSearchResults;
