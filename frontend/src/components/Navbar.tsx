import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <>
      <nav className="flex-center">
        <ul className="flex gap-4">
          <Link to={"/users"}>Users</Link>
          <Link to={"/roles"}>Roles</Link>
        </ul>
      </nav>
    </>
  )
}

export default Navbar;