import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useEffect } from "react";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [ disable, setDisable] = useState(true)
	const { closeModal } = useModal();


	const validate = () => {
		const err = []
		if (!email.includes('@') || !email.includes('.')) err.push('Please enter a valid email.')
		if (password.length < 6 || !password) err.push('Passwords must be at least 6 characters')
		if (username.length < 4) err.push('Usernames must be at least 4 characters')
		if (confirmPassword !== password || confirmPassword.length < 6) err.push('ConfirmPassword must be 6 characters and match password')
		setErrors(err)
	}

	useEffect(() =>{
		if (!email || !username || !password || !confirmPassword || password.length < 6 || username.length < 4 || confirmPassword !== password) setDisable(true)
		else setDisable(false)
	}, [disable, email, password, confirmPassword, username])

	const handleSubmit = async (e) => {
		e.preventDefault();
		validate()
		if (errors.length) return
		if (password === confirmPassword && !errors.length) {
			const data = await dispatch(signUp(username, email, password));
			if (data) setErrors(data);
			else closeModal();
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-modal">
			<h1 className="signup-title">Sign Up</h1>
			<form onSubmit={handleSubmit}
			className="signup-form">

				<label className="signup-label">
					Email
				</label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="signup-input"
					/>
				<label className="signup-label">
					Username
				</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="signup-input"
					/>
				<label className="signup-label">
					Password
				</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="signup-input"
					/>
				<label className="signup-label">
					Confirm Password
				</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						className="signup-input"
					/>
		<ul>
          {errors?.map((error, idx) => <li key={idx} className="errors">{error}</li>)}
        </ul>
				<button type="submit"
				id='register-button'>Register</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
