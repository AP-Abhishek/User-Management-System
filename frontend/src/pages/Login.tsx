import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {

	const sectionClasses = "md:w-1/2 w-full h-full md:p-12 p-8";
	const labelClasses = "block md:my-4";
	const spanClasses = "ml-0.5 block md:text-lg text-sm font-semibold text-sky-600"
	const inputClasses = "bg-background px-3 py-1.5 my-2 w-full rounded-md md:text-lg focus:outline-sky-200";
	const headingClasses = "md:mt-8 mt-4 md:text-3xl text-lg font-bold tracking-wide cursor-default text-sky-800";

	const { login } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();

		const userData = {
			email,
			password
		}

		try {
			const res = await fetch("http://localhost:5000/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			const data = await res.json();

			if (res.ok) {
				login(data.token, data.user);
				navigate("/");
			} else {
				setError(data.error || "Login failed");
			}
		} catch (err) {
			throw new Error("Unable to connect to backend.");
		}
	}

	return (
		<>
			<div className="w-full h-screen bg-background flex-center flex-col md:flex-row">
				<section className={sectionClasses}>
					<div className="p-4 w-full h-full flex-center flex-col rounded-md bg-sky-50 shadow-[0_0_1px] shadow-sky-500">
						<img src="favicon.png" alt="icon" className="md:size-24 size-16 mt-2" />
						<h1 className={headingClasses}>
							User Management System
						</h1>
						<p className="md:my-8 my-4 md:px-28 px-12 md:text-lg text-sm indent-4 leading-6 text-justify tracking-wide cursor-default">
							A robust full-stack solution built with React and Express. Efficiently manage user lifecycles, monitor active profiles, and enforce security policies through a centralized administrative interface.
						</p>
					</div>
				</section>
				<section className={sectionClasses}>
					<div className="p-4 w-full h-full flex-center flex-col rounded-md bg-sky-50 shadow-[0_0_1px] shadow-sky-500">
						<h1 className={headingClasses}>
							Welcome, User...!
						</h1>
						<form method="POST" className="md:p-8 px-2 py-6 mt-4 w-full h-full flex flex-col md:justify-center justify-around">
							{error && <p className="text-red-500 text-sm font-bold">{error}</p>}
							<label htmlFor="email" className={labelClasses}>
								<span className={spanClasses}>Enter your E-mail</span>
								<input
									id="email"
									type="email"
									className={inputClasses}
									maxLength={128}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</label>
							<label htmlFor="password" className={labelClasses}>
								<span className={spanClasses}>Enter your Password</span>
								<input
									id="password"
									type="password"
									className={inputClasses}
									maxLength={128}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</label>
							<button
								type="submit"
								className="my-2 bg-sky-600 text-white px-3 py-1.5 rounded-md self-start hover:bg-sky-700 hover:cursor-pointer transition-all ease-linear active:bg-sky-900"
								onClick={handleLogin}
							>
								Login
							</button>
						</form>
					</div>
				</section>
			</div>
		</>
	)
}

export default Login;