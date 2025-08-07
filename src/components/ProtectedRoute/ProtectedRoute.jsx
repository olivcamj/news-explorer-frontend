import React from "react";
import { Navigate } from "react-router-dom";

// This component can take a component as a prop

const ProtectedRoute = ({ children, isLoggedIn }) =>
  isLoggedIn ? children : <Navigate to="/" replace />;

export default ProtectedRoute;
