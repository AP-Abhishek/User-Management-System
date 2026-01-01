import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Role from "./pages/Role";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout";
import Forbidden from "./pages/Forbidden";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import { Bounce, ToastContainer } from "react-toastify";

export default function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />

              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/users" element={<User />} />
                <Route path="/roles" element={<Role />} />
              </Route>

              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}

      />
    </BrowserRouter >
  )
}
