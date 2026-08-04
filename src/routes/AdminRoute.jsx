import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import FullScreenLoader from "../components/common/FullScreenLoader";

function AdminRoute({ children }) {

  const { user, loading } = useAuth();

  if (loading) {

    return <FullScreenLoader />;

  }

  if (!user) {

    return <Navigate to="/login" replace />;

  }

  if (user.role !== "admin") {

    return <Navigate to="/" replace />;

  }

  return children;

}

export default AdminRoute;