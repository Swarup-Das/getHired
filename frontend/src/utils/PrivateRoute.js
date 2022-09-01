import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../components/userComponent/Auth/AuthHelper";

const PrivateRoute = ({ children, redirectTo }) => {
  return !isAuthenticated() ? <Navigate to={redirectTo} /> : children;
};

export default PrivateRoute;
