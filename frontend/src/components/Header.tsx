import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <header className="w-full px-12 py-4 flex items-center justify-between">
        <section className="flex-center">
          <Link to={"/"}>
            <img
              className="size-16"
              src="favicon.png"
              alt="logo"
            />
          </Link>
          <h1 className="text-3xl font-semibold mx-4">User Management System</h1>
        </section>
        <section className="flex gap-8">
          <Navbar />
          <button className="flex-center rounded-full">
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