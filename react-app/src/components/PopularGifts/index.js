import "./PopularGifts.css";

export default function PopularGifts({ product }) {
  return (
    <div className="popular-product-card">
        <img
          className=" h-[20vmin] rounded-xl object-cover w-full"
          src={product.ProductImages[2]?.url}
          alt="not found"
        />

      <div className="popular-product-text">
        <div className="text-[1.7vmin] text-gray-700">{product.name}</div>
        <div className="text-[1.5vmin]">
          {typeof product.avgRating === "number" ? (
            Array(5)
              .fill(1)
              .map((s, i) =>
                i < product.avgRating ? (
                  <i
                    className="fa-solid fa-star "
                    key={i}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-star "
                    key={i}
                  ></i>
                )
              )
          ) : (
            <span className="search-new-product">
              New! <i className="fa-solid fa-star" />{" "}
            </span>
          )}{" "}
          {product.sales}

        </div>

        <div className="font-bold text-[1.3vmin]">${product.price}</div>
      </div>
    </div>
  );
}
