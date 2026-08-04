import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FullScreenLoader from "../components/common/FullScreenLoader";

const ProtectedRoute = ({ children }) => {

  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return <FullScreenLoader />;
  }

  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;