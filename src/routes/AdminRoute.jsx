import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = ({ children }) => {

  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === "admin"
    ? children
    : <Navigate to="/" replace />;

};

export default AdminRoute;