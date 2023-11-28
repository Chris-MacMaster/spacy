
export default function ProductCard({ product }) {
  if (!product.ProductImages[0].url) return null;

  return (
    <div className="shadow-lg rounded-md relative w-full h-[30vmin] overflow-hidden hover:shadow-2xl transition-all ease-in-out duration-300">
      {/* <div className="product-tooltip-heart product-tool-tips">
        <i className="fa-regular fa-heart"></i>
      </div> */}
      <div className="absolute bottom-3 left-3 bg-white p-2 rounded-lg shadow-lg border-[1px] border-slate-300 font-bold text-xs">
        ${product.price}
      </div>
      <img
        src={`${product.ProductImages[0].url}`}
        alt="preview"
        className="object-cover h-full w-full"
      />
    </div>
  );
}
