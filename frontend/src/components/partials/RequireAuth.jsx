import React from "react";
import { AuthContext } from "../Backend/context/Auth";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default RequireAuth;
