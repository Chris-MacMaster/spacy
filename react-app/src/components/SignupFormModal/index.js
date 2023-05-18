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
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [bio, setBio] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [ disable, setDisable] = useState(true)
	const { closeModal } = useModal();
	const [ hasSubmitted, setHasSubmitted ] = useState(false)

	useEffect(() => {
		const err = []
		if (!email.includes('@') || !email.includes('.')) err.push('Please enter a valid email.')
		if (password.length < 6 || !password) err.push('Passwords must be at least 6 characters.')
		if (username.length < 4) err.push('Usernames must be at least 4 characters.')
		if (firstName.length < 3) err.push('Please enter a valid first name.')
		if (lastName.length < 3) err.push('Please enter a valid last name.')
		if (bio.length < 20) err.push('Please enter a short bio.')
		if (confirmPassword !== password || confirmPassword.length < 6) err.push('ConfirmPassword must be 6 characters and match password')
		setErrors(err)
	}, [email, password, username, firstName, lastName, bio, confirmPassword])

	useEffect(() =>{
		if (!email || !username || !password || !confirmPassword || password.length < 6 || username.length < 4 || confirmPassword !== password) setDisable(true)
		else setDisable(false)
	}, [disable, email, password, confirmPassword, username])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmitted(true)
		if (!errors.length) {
			const data = await dispatch(signUp(username,
				email,
				password,
				firstName,
				lastName,
				bio
				));
			if (data) setErrors(data);
			else closeModal();
		} else {
			return alert('Please correct input errors')
		}
	};

	return (
		<div className="signup-modal">
			<h1 className="signup-title">Sign Up</h1>
			<form onSubmit={handleSubmit}
			className="signup-form">

					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="signup-input"
						placeholder="Email"
					/>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="signup-input"
						placeholder="Username"
					/>

				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
					className="signup-input"
					placeholder="First Name"
				/>

				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
					className="signup-input"
					placeholder="Last Name"
				/>

				<textarea
					type="text"
					value={bio}
					onChange={(e) => setBio(e.target.value)}
					required
					className="signup-input signup-bio"
					placeholder="Please enter a short bio"
				/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="signup-input"
						placeholder="Password"
					/>

					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						className="signup-input"
						placeholder="Verify Password"
					/>
		<ul>
          {hasSubmitted && errors.length && errors?.map((error, idx) =>(
		  <li key={idx} className="errors">{error}</li>
		  ))}
        </ul>
				<button type="submit"
				id='register-button'>Register</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
