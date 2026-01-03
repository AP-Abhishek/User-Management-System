import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const { user } = useAuth();
  return (
    <>
      <header className="w-full md:px-12 px-4 md:py-4 py-2 flex items-center justify-between bg-background border-b-4 border-sky-900">
        <section className="flex-center">
          <Link to={"/"}>
            <img
              className="md:size-16 size-8"
              src="favicon.png"
              alt="logo"
            />
          </Link>
          <h1 className="md:text-3xl text-base font-semibold md:mx-4 mx-1 cursor-default">User Management System</h1>
        </section>
        <section className="flex gap-8">
          <Navbar />
          <div className="flex-center rounded-full">
            <p className="md:block hidden mx-2 font-semibold text-base">Hey, {user?.username}</p>
            <Link className="flex-center rounded-full" to="/profile">
              <img className="flex-center md:size-14 size-8 rounded-full" src="profile.png" alt="profile" />
            </Link>
          </div>
        </section>
      </header>
    </>
  )
}

export default Header;