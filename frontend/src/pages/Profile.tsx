import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";

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

  const { logout } = useAuth();

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
        toast.success(data.message || "Profile updated successfully.");
      } else {
        toast.error(data.error || "Failed to update profile.");
      }
    } catch (err) {
      toast.error("Network Error: Could not reach the server.");
    }
  };

  const handleChangePasswordForm = async () => {
    if (password === "") {
      toast.error("Password cannot be empty.");
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
        toast.success(data.message || "Password updated successfully.");
      } else {
        toast.error(data.error || "Failed to update profile.");
      }
    } catch (err) {
      toast.error("Network Error: Could not reach the server.");
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
          toast.error(data.error || "Failed to fetch user.");
        }
      } catch (err) {
        toast.error("Network Error: Could not reach the server.");
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
        <section className="w-1/3 p-2 flex items-center flex-col border-r-2 border-stone-200 pr-8">
          <h1 className="self-start text-2xl font-semibold text-sky-700">Profile</h1>
          <img src="profile.png" alt="profile" className="size-64 my-6" />
          <span className="text-sm text-stone-500 italic">id: {id}</span>
          <span className="mt-2 font-semibold">{role?.toUpperCase()}</span>
          <span className={`mt-2 px-2 py-1 text-white rounded-sm ${isActive ? "bg-green-500" : "bg-red-500"}`}>
            {isActive ? "Active" : "Inactive"}
          </span>
        </section>

        <section className="w-2/3 p-2 pl-4">
          <div>
            <section className="flex gap-4 justify-end">
              {editing ? (
                <>
                  <button className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition-all" onClick={handleCancel}>Cancel</button>
                  <button className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-all" onClick={handleSave}>Save</button>
                </>
              ) : (
                <>
                  <button className={buttonClasses} onClick={() => setChangingPassword(true)}>Change Password</button>
                  <button className={buttonClasses} onClick={handleEditProfile}>Edit Profile</button>
                  <button className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition-all" onClick={logout}>Logout</button>
                </>
              )}
            </section>

            <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
              <label className={labelClasses}>
                <span className={spanClasses}>First Name</span>
                <input
                  type="text"
                  className={inputClasses}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value.replace(/[^A-Za-z]/g, ""))}
                  readOnly={!editing}
                />
              </label>
              <label className={labelClasses}>
                <span className={spanClasses}>Last Name</span>
                <input
                  type="text"
                  className={inputClasses}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value.replace(/[^A-Za-z]/g, ""))}
                  readOnly={!editing}
                />
              </label>
              <label className={labelClasses}>
                <span className={spanClasses}>Username</span>
                <input
                  type="text"
                  className={inputClasses}
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/[^A-Za-z0-9._]/g, ""))}
                  readOnly={!editing}
                />
              </label>
              <label className={labelClasses}>
                <span className={spanClasses}>E-mail</span>
                <input
                  type="email"
                  className={inputClasses}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!editing}
                />
              </label>
            </form>
          </div>
        </section>
      </div>

      {changingPassword && (
        <div className="fixed top-40 left-1/2 -translate-x-1/2 bg-background w-1/2 rounded-xl p-4 backdrop-blur-md shadow-[0_0_3px] shadow-sky-600 z-50">
          <form onSubmit={(e) => e.preventDefault()}>
            <label className={labelClasses}>
              <span className={spanClasses}>Enter New Password</span>
              <input
                type="password"
                className="px-3 py-1.5 my-2 w-full rounded-md md:text-lg bg-white focus:outline-sky-300 border border-stone-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </form>
          <section className="flex gap-4 justify-end mt-4">
            <button className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700" onClick={() => { setChangingPassword(false); setPassword(""); }}>Cancel</button>
            <button className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700" onClick={handleChangePasswordForm}>Change</button>
          </section>
        </div>
      )}
    </>
  );
}

export default Profile;
