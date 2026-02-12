import { Navigate } from "react-router-dom";

const PersonalRoute = ({ children }) => {
  const personalAccess = localStorage.getItem("personalAccess");
  return personalAccess ? children : <Navigate to="/Signup" />;
};

export default PersonalRoute;
