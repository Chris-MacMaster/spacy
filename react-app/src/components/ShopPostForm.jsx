import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShop } from "../store/shops";
import { useHistory } from "react-router-dom";
import IconAlert from "./Icons/IconAlert";

export default function PostShopForm() {
  const history = useHistory();
  const dispatch = useDispatch();
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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const user = useSelector((state) => state.session.user);

  const formData = new FormData();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (Object.values(errors).length) return;
    const newShop = {
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
    for (let key in newShop) {
      formData.append(`${key}`, newShop[key]);
    }
    await dispatch(createShop(formData));
    history.push(`/users/${user.id}`);
  };

  return (
    <div className="max-w-screen-lg min-h-screen m-8 mx-auto">
      <h1 className="text-4xl text-center marcellus">Create New Shop</h1>

      <div className="flex items-center justify-center rounded-lg">
        <form
          onSubmit={handleSubmit}
          className=" grid grid-cols-2 mt-4 gap-4 drop-shadow-lg max-w-3xl shadow-2xl p-8 m-4 rounded-xl border-[1px] border-slate-300"
        >
          <div className="create-shop-name create-shop-label">
            <label className="text-2xl font-bold thasadith text-cyan-600">
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
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300 rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              onChange={(e) => setName(e.target.value)}
            ></input>
            {hasSubmitted && errors.name && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
                {" "}
                <IconAlert /> {errors.name}
              </div>
            )}
          </div>

          <label className="text-2xl font-bold thasadith text-cyan-600">
            Street Address
          </label>

          <div className="create-shop-input">
            <input
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300 rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            ></input>
            {hasSubmitted && errors.streetAddress && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
                {" "}
                <IconAlert /> {errors.streetAddress}
              </div>
            )}
          </div>

          <label className="text-2xl font-bold thasadith text-cyan-600">
            City
          </label>

          <div className="create-shop-input">
            <input
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300 rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
            {hasSubmitted && errors.city && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
                {" "}
                <IconAlert /> {errors.city}
              </div>
            )}
          </div>

          <label className="text-2xl font-bold thasadith text-cyan-600">
            State
          </label>

          <div className="create-shop-input">
            <input
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300 rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            ></input>
            {hasSubmitted && errors.state && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
                {" "}
                <IconAlert /> {errors.state}
              </div>
            )}
          </div>

          <label className="text-2xl font-bold thasadith text-cyan-600">
            Country
          </label>

          <div className="create-shop-input">
            <input
              type="text"
              value={country}
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300 rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              onChange={(e) => setCountry(e.target.value)}
            ></input>
            {hasSubmitted && errors.country && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
                {" "}
                <IconAlert /> {errors.country}
              </div>
            )}
          </div>

          <div className="create-shop-label-grid create-shop-description">
            <label className="text-2xl font-bold thasadith text-cyan-600">
              Description
            </label>
            <div className="text-xs text-slate-600">
              Start building you brand by giving a brief description of your
              shop and what you're known for.
            </div>
          </div>

          <div className="create-shop-input">
            <textarea
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300 rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {hasSubmitted && errors.description && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
                {" "}
                <IconAlert /> {errors.description}
              </div>
            )}
          </div>

          <div className="create-shop-label-grid create-shop-category">
            <label className="text-2xl font-bold thasadith text-cyan-600">
              Category
            </label>
            <div className="text-xs text-slate-600">
              Providing a category helps you get shown in search results!
            </div>
          </div>

          <div className="create-shop-input">
            <input
              type="text"
              value={category}
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300 rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              onChange={(e) => setCategory(e.target.value)}
            ></input>
            {hasSubmitted && errors.category && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
                {" "}
                <IconAlert /> {errors.category}
              </div>
            )}
          </div>

          <div className="create-shop-label-grid">
            <label className="text-2xl font-bold thasadith text-cyan-600">
              Policies
            </label>
            <div className="text-xs text-slate-600">
              Give your customers an idea of the sort of service they can expect
              from you.
            </div>
          </div>

          <div className="create-shop-input">
            <textarea
              className="w-full p-2 transition duration-200 ease-in-out border-2 border-gray-300 rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
              type="text"
              value={policies}
              onChange={(e) => setPolicies(e.target.value)}
            ></textarea>
            {hasSubmitted && errors.policies && (
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
                {" "}
                <IconAlert /> {errors.policies}
              </div>
            )}
          </div>

          <div className="create-shop-label-grid">
            <label className="text-2xl font-bold thasadith text-cyan-600">
              Image URL
            </label>
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
              <div className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl">
                {" "}
                <IconAlert /> {errors.url}
              </div>
            )}
          </div>

          <div className="create-shop-div">
            <input
              onClick={handleSubmit}
              className="w-full p-3 font-bold text-white uppercase transition-all duration-300 ease-in-out bg-orange-600 rounded-lg cursor-pointer active:bg-orange-800 hover:scale-95"
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
