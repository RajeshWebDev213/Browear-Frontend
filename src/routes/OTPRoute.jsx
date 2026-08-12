import { Navigate } from "react-router-dom";

const OTPRoute = ({ children }) => {
  const otpAccess = sessionStorage.getItem("otpAccess");

  return otpAccess
    ? children
    : <Navigate to="/signup" replace />;
};

export default OTPRoute;