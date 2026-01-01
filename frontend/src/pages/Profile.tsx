import { useEffect, useState } from "react";

type UserData = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	role: string;
	isActive: boolean;
}

const Profile = () => {

	const [editing, setEditing] = useState<boolean>(false);
	const [changingPassword, setChangingPassword] = useState<boolean>(false);

	const [id, setId] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [role, setRole] = useState<string>("");
	const [isActive, setIsActive] = useState<boolean>(false);
	const [originalData, setOriginalData] = useState<UserData | null>(null);

	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleChangePassword = () => setChangingPassword(true);

	const handleEditProfile = () => {
		setEditing(true);
		setOriginalData({
			firstName,
			lastName,
			username,
			email,
			password,
			role,
			isActive
		});
	}

	const handleCancel = () => {
		setEditing(false);
		if (!originalData) {
			throw new Error("Unable to get original data.");
		}
		setFirstName(originalData.firstName);
		setLastName(originalData.lastName);
		setUsername(originalData.username);
		setEmail(originalData.email);
		setPassword("********");
		setRole(originalData.role);
		setIsActive(originalData.isActive);
	};

	const handleSave = async () => {
		setError(null);
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				},
				body: JSON.stringify({
					firstName,
					lastName,
					username,
					email
				}),
			});

			const data = await res.json();

			if (res.ok) {
				setFirstName(data.user.firstName);
				setLastName(data.user.lastName);
				setUsername(data.user.username);
				setEmail(data.user.email);

				setEditing(false);
				setOriginalData(null);
				setSuccess("Profile updated successfully.")
			} else {
				setError(data.error || "Failed to update profile.");
			}
		} catch (err) {
			throw new Error("Unable to connect to backend.");
		}
	};

	const handleChangePasswordForm = async () => {
		setError(null);
		if (password === "") {
			setError("Password cannot be empty.");
			return;
		}
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile/password`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				},
				body: JSON.stringify({
					password
				}),
			});

			const data = await res.json();

			if (res.ok) {
				setChangingPassword(false);
				setPassword("");
				setSuccess("Password updated successfully.")
			} else {
				setError(data.error || "Failed to update profile.");
			}
		} catch (err) {
			throw new Error("Unable to connect to backend.");
		}
	}

	useEffect(() => {
		const getProfile = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				});
				const data = await res.json();

				if (res.ok) {
					setId(data._id);
					setFirstName(data.firstName);
					setLastName(data.lastName);
					setUsername(data.username);
					setEmail(data.email);
					setPassword("");
					setRole(data.role);
					setIsActive(data.is_active);
				} else {
					setError(data.error || "Failed to fetch user.");
				}
			} catch (err) {
				throw new Error("Unable to connect to backend.");
			}
		};

		getProfile();
	}, []);

	const buttonClasses = "bg-sky-600 text-white px-3 py-1.5 rounded-md self-start hover:bg-sky-700 hover:cursor-pointer transition-all ease-linear active:bg-sky-900";
	const labelClasses = "block md:my-2";
	const spanClasses = "ml-0.5 block md:text-lg text-sm font-semibold text-sky-600"
	const inputClasses = `px-3 py-1.5 my-2 w-full rounded-md md:text-lg  ${editing ? "focus:outline-sky-200 bg-background" : "focus:outline-none cursor-default bg-stone-200"}`;

	return (
		<>
			<div className="px-12 py-8 flex gap-8">
				<section className="w-1/3 p-2 flex items-center flex-col">
					<h1 className="self-start text-2xl font-semibold text-sky-700">Profile</h1>
					<img src="profile.png" alt="profile" className="size-64 my-6" />
					<span className="text-sm text-stone-500 italic">id: {id}</span>
					<span className="mt-2 font-semibold">{role.toUpperCase()}</span>
					<span className={`mt-2 px-2 py-1 text-white rounded-sm ${isActive ? "bg-green-500" : "bg-red-500"}`}>{isActive ? "Active" : "Inactive"}</span>
				</section>
				<section className="w-2/3 p-2">
					<div>
						<section className="flex gap-4 justify-end">
							{
								editing ? (
									<>
										<button className={`bg-red-600 text-white px-3 py-1.5 rounded-md self-start hover:bg-red-700 hover:cursor-pointer transition-all ease-linear active:bg-red-900`} onClick={handleCancel}>Cancel</button>
										<button className={`bg-green-600 text-white px-3 py-1.5 rounded-md self-start hover:bg-green-700 hover:cursor-pointer transition-all ease-linear active:bg-green-900`} onClick={handleSave}>Save</button>
									</>
								) : (
									<>
										<button className={buttonClasses} onClick={handleChangePassword}>Change Password</button>
										<button className={buttonClasses} onClick={handleEditProfile}>Edit Profile</button>
									</>
								)
							}
						</section>
						<form
							action="POST"
							className="flex flex-col"
						>
							<label htmlFor="firstname" className={labelClasses}>
								<span className={spanClasses}>First Name</span>
								<input id="firstname" type="text" className={inputClasses} value={firstName} onChange={(e) => setFirstName(e.target.value)} readOnly={!editing} />
							</label>
							<label htmlFor="lastname" className={labelClasses}>
								<span className={spanClasses}>Last Name</span>
								<input id="lastname" type="text" className={inputClasses} value={lastName} onChange={(e) => setLastName(e.target.value)} readOnly={!editing} />
							</label>
							<label htmlFor="username" className={labelClasses}>
								<span className={spanClasses}>Username</span>
								<input id="username" type="text" className={inputClasses} value={username} onChange={(e) => setUsername(e.target.value)} readOnly={!editing} />
							</label>
							<label htmlFor="email" className={labelClasses}>
								<span className={spanClasses}>E-mail</span>
								<input id="email" type="email" className={inputClasses} value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!editing} />
							</label>
						</form>
					</div>
				</section>
			</div>
			{
				changingPassword && (
					<div className="fixed top-40 left-1/2 -translate-1/2 bg-background w-1/2 rounded-xl p-4 backdrop-blur-md shadow-[0_0_3px] shadow-sky-600">
						<form method="PUT">
							<label htmlFor="password" className={labelClasses}>
								<span className={spanClasses}>Enter New Password</span>
								<input id="password" type="password" className={"px-3 py-1.5 my-2 w-full rounded-md md:text-lg bg-white focus:outline-sky-300"} value={password} onChange={(e) => setPassword(e.target.value)} />
							</label>
							<section className="flex gap-4 justify-end">
								<button className="bg-red-600 text-white px-3 py-1.5 rounded-md self-start hover:bg-red-700 hover:cursor-pointer transition-all ease-linear active:bg-red-900" onClick={() => { setChangingPassword(false); setPassword(""); }}>Cancel</button>
								<button className="bg-green-600 text-white px-3 py-1.5 rounded-md self-start hover:bg-green-700 hover:cursor-pointer transition-all ease-linear active:bg-green-900" onClick={handleChangePasswordForm}>Change</button>
							</section>
						</form>
					</div>
				)
			}
		</>
	)
}

export default Profile;
