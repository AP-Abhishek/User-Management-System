import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const { user } = useAuth();
  return (
    <>
      <header className="w-full px-12 py-4 flex items-center justify-between bg-background border-b-4 border-sky-900">
        <section className="flex-center">
          <Link to={"/"}>
            <img
              className="size-16"
              src="favicon.png"
              alt="logo"
            />
          </Link>
          <h1 className="text-3xl font-semibold mx-4 cursor-default">User Management System</h1>
        </section>
        <section className="flex gap-8">
          <Navbar />
          <button className="flex-center rounded-full">
            <p className="mx-2 font-semibold">Hey, {user?.username}</p>
            <Link className="flex-center rounded-full" to="/profile">
              <img className="flex-center size-14 rounded-full" src="profile.png" alt="profile" />
            </Link>
          </button>
        </section>
      </header>
    </>
  )
}

export default Header;