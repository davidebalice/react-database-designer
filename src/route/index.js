import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../pages/Auth/forgotPassword";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Dashboard from "../pages/dashboard/Dashboard";
import Add from "../pages/databases/Add";
import Info from "../pages/info/Info";
import Databases from "../pages/databases/Databases";
import Sql from "../pages/sql/Sql";
import Edit from "../pages/databases/Edit";
import Designer from "../pages/designer/Designer";

export function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/databases" element={<Databases />} />
        <Route path="/database/add" element={<Add />} />
        <Route path="/database/edit/:id" element={<Edit />} />
        <Route path="/designer" element={<Designer />} />
        <Route path="/designer/:id" element={<Designer />} />
        <Route path="/sql" element={<Sql />} />
        <Route path="/sql/:id" element={<Sql />} />
        <Route path="/login" element={<Login />} />
        <Route path="/info" element={<Info />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}
