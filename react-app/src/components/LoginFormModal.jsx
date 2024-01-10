import React, { useContext, useState } from "react";
import { login } from "../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { fetchCart } from "../store/cart";
import { CartContext } from "../context/CartContext";
import { addLocalToUserCartThunk } from "../store/cart";
import IconAlert from "./Icons/IconAlert";
function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const { cartItems, clearCart } = useContext(CartContext);

  const validate = () => {
    const err = [];
    if (!email.includes("@") || !email.includes("."))
      err.push("Please enter a valid email.");
    if (password.length < 6 || !password)
      err.push("Passwords must be at least 6 characters");
    setErrors(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    const data = await dispatch(login(email, password));
    if (errors.length) return;
    else if (data) setErrors(data);
    else closeModal();

    await dispatch(fetchCart());
  };

  const demoUser = async (e) => {
    e.preventDefault();
    let email = "carlsagan@user.io";
    let password = "password";
    const data = await dispatch(login(email, password));
    if (data) setErrors(data);
    else closeModal();

    await dispatch(addLocalToUserCartThunk(cartItems));
    clearCart();
    await dispatch(fetchCart());
  };

  return (
    <div className="">
      <h1 className=" baskerville text-2xl">Log In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="font-bold mt-4">Email</label>
        <input
          type="text"
          value={email}
          className=" border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="font-bold mt-4">Password</label>
        <input
          type="password"
          value={password}
          className="  border-2 border-gray-300 rounded-xl p-2 bg-slate-100 focus-within:bg-white transition duration-200 ease-in-out focus:outline-2 focus:outline-cyan-300 focus:outline"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit submit-login"
        className=" rounded-full bg-stone-900 text-white font-bold p-2 mt-4 w-72 hover:bg-stone-800 active:scale-95 transition-all ease-in-out duration-300"
        >
          Log In
        </button>
      </form>
      <div className="demo-user">
        <form onSubmit={demoUser}>
          <button type="submit submit-login"
          className=" rounded-full bg-stone-900 text-white font-bold p-2 mt-4 w-72 hover:bg-stone-800 active:scale-95 transition-all ease-in-out duration-300">
            Demo User
          </button>
        </form>
      </div>
      {errors?.map((error, idx) => (
        <div className="flex flex-row p-3 bg-red-300 text-red-900 rounded-xl my-2" key={`${idx}error`}>
          <IconAlert />
          {error}
        </div>
      ))}
      <hr></hr>
    </div>
  );
}

export default LoginFormModal;
