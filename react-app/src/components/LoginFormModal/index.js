import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { fetchCart } from "../../store/cart";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

	const validate = () => {
		const err = []
		if (!email.includes('@') || !email.includes('.')) err.push('Please enter a valid email.')
		if (password.length < 6 || !password) err.push('Passwords must be at least 6 characters')
		setErrors(err)
	}

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate()
    const data = await dispatch(login(email, password));
    if (errors.length) return
    else if (data) setErrors(data);
    else closeModal()
    await dispatch(fetchCart())
  };

  const demoUser = async (e) => {
    e.preventDefault();
    let email = "carlsagan@user.io"
    let password = "password"
    const data = await dispatch(login(email, password));
    if (data) setErrors(data);
    else closeModal()
    await dispatch(fetchCart())
  };

  return (
    <div className="login-modal">
      <h1 className="login-title">Log In</h1>
      <form onSubmit={handleSubmit}
      className="login-form">

        <label className="login-label">Email</label>
          <input
            type="text"
            value={email}
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label className="login-label">Password</label>
        <input
            type="password"
            value={password}
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit submit-login"
        id="submit-login">Log In</button>
      </form>
      <div className="demo-user">
        <form onSubmit={demoUser}>
          <button type="submit submit-login"
          id="demo-user">Demo User</button>
        </form>
      </div>
      <p className="login-trouble">Trouble Signing In?</p>
      {errors?.map((error, idx) => (
            <p classNames='errors' key={`${idx}error`} >{error}</p>
            ))}
      <hr></hr>
    </div>
  );
}

export default LoginFormModal;
