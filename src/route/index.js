import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../pages/Auth/forgotPassword";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Dashboard from "../pages/dashboard/Dashboard";
import Databases from "../pages/databases/Databases";
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
        <Route path="/" element={<Dashboard />} />
        <Route path="/databases" element={<Databases />} />
        <Route path="/designer/:id" element={<Designer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/users" element={<Users />} />
        <Route path="/add/user/" element={<AddUser />} />
        <Route path="/edit/user/:id" element={<EditUser />} />
        <Route path="/photo/user/:id" element={<PhotoUser />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

/*

  <Route path="/demos" element={<Demos />} />
        <Route path="/demo/:id" element={<Demo />} />
        <Route path="/add/demo/" element={<AddDemo />} />
        <Route path="/edit/demo/:id" element={<EditDemo />} />

*/
