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
      <h1 className="text-2xl baskerville">Log In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mt-4 font-bold">Email</label>
        <input
          type="text"
          value={email}
          className="p-2 transition duration-200 ease-in-out border-2 border-gray-300 rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="mt-4 font-bold">Password</label>
        <input
          type="password"
          value={password}
          className="p-2 transition duration-200 ease-in-out border-2 border-gray-300 rounded-xl bg-slate-100 focus-within:bg-white focus:outline-2 focus:outline-cyan-300 focus:outline"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit submit-login"
          className="p-2 mt-4 font-bold text-white transition-all duration-300 ease-in-out rounded-full bg-stone-900 w-72 hover:bg-stone-800 active:scale-95"
        >
          Log In
        </button>
      </form>
      <div className="demo-user">
        <form onSubmit={demoUser}>
          <button
            type="submit submit-login"
            className="p-2 mt-4 font-bold text-white transition-all duration-300 ease-in-out rounded-full bg-stone-900 w-72 hover:bg-stone-800 active:scale-95"
          >
            Demo User
          </button>
        </form>
      </div>
      {errors?.map((error, idx) => (
        <div
          className="flex flex-row p-3 my-2 text-red-900 bg-red-300 rounded-xl"
          key={`${idx}error`}
        >
          <IconAlert />
          {error}
        </div>
      ))}
      <hr></hr>
    </div>
  );
}

export default LoginFormModal;
