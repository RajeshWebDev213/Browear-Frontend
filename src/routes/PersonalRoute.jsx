import { Navigate } from "react-router-dom";

const PersonalRoute = ({ children }) => {
  const personalAccess = localStorage.getItem("personalAccess");

  return personalAccess
    ? children
    : <Navigate to="/signup" replace />;
};

export default PersonalRoute;