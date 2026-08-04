import { Navigate } from "react-router-dom";

const OtpRoute = ({ children }) => {
  const otpAccess = localStorage.getItem("otpAccess");
  return otpAccess ? children : <Navigate to="/Signup" />;
};

export default OtpRoute;