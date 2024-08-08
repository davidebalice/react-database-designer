import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../pages/Auth/forgotPassword";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import AddDemo from "../pages/demos/AddDemo";
import Demo from "../pages/demos/Demo";
import Demos from "../pages/demos/Demos";
import EditDemo from "../pages/demos/EditDemo";
import Designer from "../pages/designer/Designer";
import Profile from "../pages/profile/Profile";
import AddUser from "../pages/users/AddUser";
import EditUser from "../pages/users/EditUser";
import PhotoUser from "../pages/users/PhotoUser";
import Users from "../pages/users/Users";

export function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Designer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/demos" element={<Demos />} />
        <Route path="/demo/:id" element={<Demo />} />
        <Route path="/add/demo/" element={<AddDemo />} />
        <Route path="/edit/demo/:id" element={<EditDemo />} />

        <Route path="/users" element={<Users />} />
        <Route path="/add/user/" element={<AddUser />} />
        <Route path="/edit/user/:id" element={<EditUser />} />
        <Route path="/photo/user/:id" element={<PhotoUser />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
