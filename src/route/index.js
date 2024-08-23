import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../pages/Auth/forgotPassword";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Dashboard from "../pages/dashboard/Dashboard";
import Add from "../pages/databases/Add";
import Databases from "../pages/databases/Databases";
import Sql from "../pages/sql/sql";
import Edit from "../pages/databases/Edit";
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
        <Route path="/database/add" element={<Add />} />
        <Route path="/database/edit/:id" element={<Edit />} />
        <Route path="/designer/:id" element={<Designer />} />
        <Route path="/sql/:id" element={<Sql />} />
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
