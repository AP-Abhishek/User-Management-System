import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Role from "./pages/Role";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout";
import Forbidden from "./pages/Forbidden";

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<User />} />
          <Route path="/roles" element={<Role />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  )
}
