import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

type ProtectedRouteProps = {
	allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {

	const { user, isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate replace to="/login" />
	}

	if (allowedRoles && !allowedRoles.includes(user?.role || "")) {
		return <Navigate replace to="/forbidden" />
	}

	return <Outlet />;
}

export default ProtectedRoute;