import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    let email = "carlsagan@user.io"
    let password = "password"
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };


  return (
    <div className="login-modal">
      <h1 className="login-title">Log In</h1>
      <form onSubmit={handleSubmit}
      className="login-form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
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
      <hr></hr>
    </div>
  );
}

export default LoginFormModal;
