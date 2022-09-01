import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../components/userComponent/Auth/AuthHelper";

const PublicRoute = ({ children, redirectTo }) => {
  return isAuthenticated() ? <Navigate to={redirectTo} /> : children;
};

export default PublicRoute;
