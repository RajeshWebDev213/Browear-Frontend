import { useContext } from "react";

import { Navigate } from "react-router-dom";

import Loader from "../components/common/Loader";

import { AuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {

  const {

    user,

    loading,

  } = useContext(AuthContext);

  if (loading) {

    return <Loader />;

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