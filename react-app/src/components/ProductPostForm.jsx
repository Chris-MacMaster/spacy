//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeProduct } from "../store/product";
import { fetchShops } from "../store/shops";
import IconDropFile from './Icons/IconDropFile'
import IconAlert from "./Icons/IconAlert";
export default function ProductPostForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { shopId } = useParams();
  const formData = new FormData();
  const [name, setName] = useState("");
  const [available, setAvailable] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [freeShipping, setFreeShipping] = useState(false);
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState(null);

  //validation
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    let e = {};
    setErrors(e);
    if (!name) e.name = "Must submit a name";
    if (!available || available < 0)
      e.available = "Must submit a value for available.";
    if (!price || price < 0) e.price = "Must submit a price.";
    if (!category) e.category = "Must submit a category";
    if (!description) e.description = "Must submit a description";
  }, [name, available, price, category, description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (Object.values(errors).length) return;

    const newProduct = {
      name,
      shop_id: shopId,
      description,
      category,
      available,
      freeShipping,
      price,
    };
    for (let key in newProduct) {
      formData.append(`${key}`, newProduct[key]);
    }

    Object.values(url).forEach((file, index) => {
      console.log("looping through the images");
      formData.append(`file${index}`, file);
    });

    dispatch(makeProduct(formData));
    dispatch(fetchShops());
    history.push(`/shops/${shopId}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setUrl(e.dataTransfer.files);
  };

  const handleCheck = (e) => {
    freeShipping === true ? setFreeShipping(false) : setFreeShipping(true);
  };

  return (
    <div className="max-w-screen-lg min-h-screen m-8 mx-auto">
      <h1 className="text-4xl text-center marcellus">Listing details</h1>
      <p className="my-4 text-xs text-center text-slate-600">
        Tell the world all about your item and why they'll love it
      </p>
      <div className="flex items-center justify-center rounded-lg">
        <form
          className=" grid grid-cols-2 mt-4 gap-4 drop-shadow-lg max-w-3xl shadow-2xl p-8 m-4 rounded-xl border-[1px] border-slate-300"
          onSubmit={handleSubmit}
        >
          <div className="create-product-label-side">
            <label className="text-2xl font-bold  thasadith text-cyan-600">Title</label>
            <div className="text-xs text-slate-600">
              Choose a name for your product. Incldue keywords that a buyer
              would use to search for your item.
            </div>
          </div>

          <div className="create-product-input-side">
            <input
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300  rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Title"
            />
            {hasSubmitted && errors.name && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl"> <IconAlert /> {errors.name}</div>
            )}
          </div>

          <div className="create-product-label-side">
            <label className="text-2xl font-bold  thasadith text-cyan-600">Description</label>
            <div className="my-3 text-xs text-slate-600">
              Start with a brief overview that describes your item's findes
              feature. Shopper will only see the first few lines of your
              description at first, so make it count!
            </div>
            <div className="my-3 text-xs text-slate-600">
              Not sure what else to say? Shoppers also like hearing about your
              process, and the story behind the item!
            </div>
          </div>

          <div className="create-product-input-side">
            <textarea
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300  rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=""
            />
            {hasSubmitted && errors.description && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl"> <IconAlert /> {errors.description}</div>
            )}
          </div>

          <div className="create-product-label-side">
            <label className="text-2xl font-bold  thasadith text-cyan-600">Available</label>
            <div className="text-xs text-slate-600">
              How many do you currently have in stock?
            </div>
          </div>

          <div className="create-product-input-side">
            <input
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300  rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="number"
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
              placeholder="Available"
            />
            {hasSubmitted && errors.available && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl"> <IconAlert /> {errors.available}</div>
            )}
          </div>

          <div className="create-product-label-side">
            <label className="text-2xl font-bold  thasadith text-cyan-600">Price</label>
            <div className="text-xs text-slate-600">
              Please dont use denominations other than Empire or New Republic
              Credits
            </div>
          </div>

          <div className="create-product-input-side">
            <input
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300  rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
            {hasSubmitted && errors.price && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl"> <IconAlert /> {errors.price}</div>
            )}
          </div>

          <div className="create-product-label-side">
            <label className="text-2xl font-bold  thasadith text-cyan-600">Category</label>
            <div className="text-xs text-slate-600">
              Select a category from the options below.
            </div>
          </div>

          <div className="create-product-input-side">
            <select
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300  rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">--Please choose a category--</option>
              <option value="Accessories">Accessories</option>
              <option value="Apparel">Apparel</option>
              <option value="Collectibles">Collectibles</option>
              <option value="Food">Food</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Lighting">Lighting</option>
              <option value="Wall Art">Wall Art</option>
            </select>
            {hasSubmitted && errors.category && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl"> <IconAlert /> {errors.category}</div>
            )}
          </div>

          <div className="create-product-label-side">
            <label className="text-2xl font-bold  thasadith text-cyan-600">Free Shipping</label>
            <div className="text-xs text-slate-600">
              Check the box to indicate whether or not your product is shipped
              for free.
            </div>
          </div>

          <div className="create-product-input-side">
            <input
              className="w-8 h-8 "
              type="checkbox"
              value={freeShipping}
              onChange={handleCheck}
              placeholder="Description"
            />
            {hasSubmitted && errors.freeShipping && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl"> <IconAlert /> {errors.freeShipping}</div>
            )}
          </div>

          <div className="create-product-label-side">
            <label className="text-2xl font-bold  thasadith text-cyan-600">Image URL</label>
            <div className="text-xs text-slate-600">
              {" "}
              Provide a url, pictures are necessary! Nobody wants to buy
              something sight unseen!
            </div>
          </div>

          <div className="create-product-input-side">
            {" "}
            <input
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300  rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="file"
              accept="image/*"
              onChange={(e) => setUrl(e.target.files[0])}
              placeholder="URL"
            />
            {hasSubmitted && errors.url1 && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl"> <IconAlert /> {errors.url1}</div>
            )}

          <div
            className="relative flex flex-row items-center justify-center h-20 my-2 border-2 border-dashed rounded-lg bg-slate-300 border-slate-500 text-slate-700 group"
            draggable={true}
            // draggable='true'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="bg-white rounded-xl shadow-xl border-[1.5px] border-slate-300 absolute font-bold transition-all opacity-0 p-3 right-64 group-hover:opacity-100 tooltip w-60">Choose File or Drag and Drop File Here</div>
            <IconDropFile />
          </div>
          </div>

          <input
            onClick={handleSubmit}
            className="w-full p-3 font-bold text-white uppercase transition-all duration-300 ease-in-out bg-orange-600 rounded-lg cursor-pointer  active:bg-orange-800 hover:scale-95"
            type="submit"
            value="Create Product"
          />
        </form>
      </div>
    </div>
  );
}

export const urlCheck = (url) => {
  return (
    url.endsWith("jpeg") ||
    url.endsWith("jpg") ||
    url.endsWith("svg") ||
    url.endsWith("png") ||
    url.endsWith("gif") ||
    url.endsWith("bmp")
  );
};
