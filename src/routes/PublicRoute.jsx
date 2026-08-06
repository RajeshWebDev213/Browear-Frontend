import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {

  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return children;
  }

  return user?.role === "admin"
    ? <Navigate to="/admin" replace />
    : <Navigate to="/" replace />;

};

export default PublicRoute;