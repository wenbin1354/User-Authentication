import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

// sign up a user with first name, last name, email, and password and put the data into sql database with post request
function SignUpPage() {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const fieldChanged = (name) => {
		return (event) => {
			let { value } = event.target;
			setData((prevData) => ({ ...prevData, [name]: value }));
		};
	};

	const signUp = async (e) => {
		e.preventDefault();
		let { firstName, lastName, email, password } = data;

		try {
			let response = await fetch("/api/auth/signup", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
				}),
			});

			if (response.ok) {
				setSuccess(true);
			} else {
				setError(true);
			}
		} catch (error) {
			console.error("Server error while creating a new user", error);
            console.log("\n data: \n", data);
			setError(true);
		}
	};

	if (success) return <Navigate to="/" />;

	return (
		<div className="col-10 col-md-8 col-lg-7">
			{error && <ErrorAlert details={"Failed to save the content"} />}
			<form onSubmit={signUp}>
				<div className="form-row">
					<input
						type="text"
						className="form-control"
						name="firstName"
						placeholder="First Name"
						value={data.firstName}
						onChange={fieldChanged("firstName")}
						autoFocus
					/>
				</div>
				<div className="form-row">
					<input
						type="text"
						className="form-control"
						name="lastName"
						placeholder="Last Name"
						value={data.lastName}
						onChange={fieldChanged("lastName")}
						autoFocus
					/>
				</div>
				<div className="form-row">
					<input
						type="email"
						className="form-control"
						name="email"
						placeholder="Email"
						value={data.email}
						onChange={fieldChanged("email")}
						autoFocus
					/>
				</div>
				<div className="form-row">
					<input
						type="password"
						className="form-control"
						name="password"
						placeholder="Password"
						value={data.password}
						onChange={fieldChanged("password")}
						autoFocus
					/>
				</div>
				<div className="form-row">
					<button type="submit" className="btn btn-primary">
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
}

export default SignUpPage;
