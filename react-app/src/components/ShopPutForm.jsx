import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editShop, fetchOneShop } from "../store/shops";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import IconAlert from "./IconAlert";
export default function PutShopForm() {
  const dispatch = useDispatch();
  const { shopId } = useParams();
  const formData = new FormData();
  //data
  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [policies, setPolicies] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const shopState = useSelector((state) => state.shops.singleShop);

  const [ogUrl, setOgUrl] = useState("");

  useEffect(() => {
    const err = {};
    if (!name || name.length < 4)
      err.name = "Please enter a valid name, at least 4 characters.";
    if (!streetAddress || streetAddress.length < 6)
      err.streetAddress =
        "Please enter a valid street address, at least 6 characters";
    if (!city || city.length < 4)
      err.city = "Please enter a valid city, at least 4 characters";
    if (!state) err.state = "Please enter a valid state";
    if (!country) err.country = "Please enter a valid country";
    if (!description || description.length < 20)
      err.description =
        "Please enter a valid shop description, at least 20 characters";
    if (!category || category.length < 3)
      err.category = "Please enter a shop category";
    if (!policies || policies.length < 30)
      err.policies = "Please enter shop policies about returns or shipping";
    // if (!urlChecka(url) || !url) err.url = 'Please enter a shop image to represent your shop'
    setErrors(err);
  }, [
    name,
    streetAddress,
    city,
    state,
    country,
    description,
    category,
    policies,
    url,
  ]);

  useEffect(() => {
    setName(shopState && shopState.name ? shopState.name : "");
    setStreetAddress(
      shopState && shopState.streetAddress ? shopState.streetAddress : ""
    );
    setCity(shopState && shopState.city ? shopState.city : "");
    setState(shopState && shopState.state ? shopState.state : "");
    setCountry(shopState && shopState.country ? shopState.country : "");
    setDescription(
      shopState && shopState.description ? shopState.description : ""
    );
    setCategory(shopState && shopState.category ? shopState.category : "");
    setPolicies(shopState && shopState.policies ? shopState.policies : "");
    setUrl(
      shopState && shopState.ShopImages && shopState.ShopImages.url
        ? shopState.ShopImages.url
        : ""
    );
    setOgUrl(
      shopState && shopState.ShopImages && shopState.ShopImages.url
        ? shopState.ShopImages.url
        : ""
    );
  }, [shopState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (Object.values(errors).length) return;
    const data = {
      name,
      street_address: streetAddress,
      city,
      state,
      country,
      description,
      category,
      policies,
      // url
    };

    formData.append("image", url);
    formData.append("ogImage", ogUrl);
    for (let key in data) {
      formData.append(`${key}`, data[key]);
    }
    dispatch(editShop(formData, shopId));
    dispatch(fetchOneShop(shopId));
    history.push(`/users/${user.id}`);
  };
  if (shopState && user.id !== shopState.ownerId) return null;

  return (
    <div className="m-8 min-h-screen max-w-screen-lg mx-auto">
      <h1 className=" text-center text-4xl marcellus">Edit Your Shop</h1>

      <div className="flex justify-center items-center rounded-lg">
        <form
          onSubmit={handleSubmit}
          className=" grid grid-cols-2 mt-4 gap-4 drop-shadow-lg max-w-3xl shadow-2xl p-8 m-4 rounded-xl border-[1px] border-slate-300"
        >
          <div className="create-shop-name create-shop-label">
            <label className=" font-bold text-2xl thasadith text-cyan-600">
              Name
            </label>
            <div className="text-xs text-slate-600">
              Choose a welcoming name for your shop
            </div>
          </div>
          <div className="create-shop-input">
            <input
              type="text"
              value={name}
              className=" w-full border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline"
              onChange={(e) => setName(e.target.value)}
            ></input>
            {hasSubmitted && errors.name && (
              <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2"> <IconAlert />  {errors.name}</div>
            )}
          </div>

          <label className=" font-bold text-2xl thasadith text-cyan-600">Street Address</label>

          <div className="create-shop-input">
            <input
              className=" w-full border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            ></input>
            {hasSubmitted && errors.streetAddress && (
              <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2"> <IconAlert />  {errors.streetAddress}</div>
            )}
          </div>

          <label className=" font-bold text-2xl thasadith text-cyan-600">City</label>

          <div className="create-shop-input">
            <input
              className=" w-full border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
            {hasSubmitted && errors.city && (
              <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2"> <IconAlert />  {errors.city}</div>
            )}
          </div>

          <label className=" font-bold text-2xl thasadith text-cyan-600">State</label>

          <div className="create-shop-input">
            <input
              className=" w-full border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            ></input>
            {hasSubmitted && errors.state && (
              <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2"> <IconAlert />  {errors.state}</div>
            )}
          </div>

          <label className=" font-bold text-2xl thasadith text-cyan-600">Country</label>

          <div className="create-shop-input">
            <input
              type="text"
              value={country}
              className=" w-full border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline"
              onChange={(e) => setCountry(e.target.value)}
            ></input>
            {hasSubmitted && errors.country && (
              <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2"> <IconAlert />  {errors.country}</div>
            )}
          </div>

          <div className="create-shop-label-grid create-shop-description">
            <label className=" font-bold text-2xl thasadith text-cyan-600">Description</label>
            <div className="text-xs text-slate-600">
              Start building you brand by giving a brief description of your
              shop and what you're known for.
            </div>
          </div>

          <div className="create-shop-input">
            <textarea
          className="w-full border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline"

              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {hasSubmitted && errors.description && (
              <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2"> <IconAlert />  {errors.description}</div>
            )}
          </div>

          <div className="create-shop-label-grid create-shop-category">
            <label className=" font-bold text-2xl thasadith text-cyan-600">Category</label>
            <div className="text-xs text-slate-600">
              Providing a category helps you get shown in search results!
            </div>
          </div>

          <div className="create-shop-input">
            <input
              type="text"
              value={category}
              className="w-full border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline"

              onChange={(e) => setCategory(e.target.value)}
            ></input>
            {hasSubmitted && errors.category && (
              <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2"> <IconAlert />  {errors.category}</div>
            )}
          </div>

          <div className="create-shop-label-grid">
            <label className=" font-bold text-2xl thasadith text-cyan-600">Policies</label>
            <div className="text-xs text-slate-600">
              Give your customers an idea of the sort of service they can expect
              from you.
            </div>
          </div>

          <div className="create-shop-input">
            <textarea
          className="w-full border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline"

              type="text"
              value={policies}
              onChange={(e) => setPolicies(e.target.value)}
            ></textarea>
            {hasSubmitted && errors.policies && (
              <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2"> <IconAlert />  {errors.policies}</div>
            )}
          </div>

          <div className="create-shop-label-grid">
            <label className=" font-bold text-2xl thasadith text-cyan-600">Image URL</label>
            <div className="text-xs text-slate-600">
              Images are mandatory, show off your logo or a good representation
              of your business!
            </div>
          </div>

          <div className="create-shop-input">
            <input
              className="create-shop-input-field category-input aws-upload h-fit"
              type="file"
              // value={url}
              onChange={(e) => setUrl(e.target.files[0])}
            ></input>
            {hasSubmitted && errors.url && (
              <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2"> <IconAlert />  {errors.url}</div>
            )}
          </div>

          <div className="create-shop-div">
            <input
              onClick={handleSubmit}
              className=" bg-orange-600 active:bg-orange-800 w-full p-3 rounded-lg text-white uppercase font-bold hover:scale-95 transition-all ease-in-out duration-300 cursor-pointer"
              type="submit"
              value="Create Shop"
            />
          </div>

          {/* <button type='submit' className='favorite-shop submit-create-shop'>Submit Shop</button> */}
        </form>
      </div>
    </div>
  );
}
