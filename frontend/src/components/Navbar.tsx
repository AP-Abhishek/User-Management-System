import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {

  const { user } = useAuth();

  return (
    <>
      <nav className="flex-center">
        <ul className="flex gap-4">
          {
            user?.role === "admin" && (
              <>
                <Link to={"/users"}>Users</Link>
                <Link to={"/roles"}>Roles</Link>
              </>
            )
          }
        </ul>
      </nav>
    </>
  )
}

export default Navbar;