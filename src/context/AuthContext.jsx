import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  getAccount,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  /*
  ================================
  Restore User
  ================================
  */

const refreshProfile = async () => {

  const token =
    localStorage.getItem("token");

  if (!token) {

    setLoading(false);

    return;

  }

  try {

    const data =
      await getAccount();

    setUser(data);

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

  } catch (err) {

    if (err.response?.status === 401) {

      logout();

    }

  } finally {

    setLoading(false);

  }

};

  useEffect(() => {

    refreshProfile();

  }, []);

  /*
  ================================
  Login
  ================================
  */

const login = (userData) => {

  setUser(userData);

  localStorage.setItem(
    "user",
    JSON.stringify(userData)
  );

  

};

  /*
  ================================
  Logout
  ================================
  */

  const logout = () => {

    setUser(null);

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("otpAccess");

    localStorage.removeItem("personalAccess");

  };

  /*
  ================================
  Provider
  ================================
  */

  return (

    <AuthContext.Provider
      value={{

        user,

        loading,

        isAuthenticated: !!user,

        login,

        logout,

        refreshProfile,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

};