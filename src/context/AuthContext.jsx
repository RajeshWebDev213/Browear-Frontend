import {
  createContext,
  useEffect,
  useState,
} from "react";

import { getAccount } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  // -----------------------
  // Restore Login
  // -----------------------

  useEffect(() => {

    const restoreUser = async () => {

      const token =
        localStorage.getItem("token");

      if (!token || token === "undefined") {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

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

      }

      catch (err) {

        console.error(
          "Authentication Error",
          err
        );

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        setUser(null);

      }

      finally {

        setLoading(false);

      }

    };

    restoreUser();

  }, []);

  // -----------------------
  // Login
  // -----------------------

  const login = (userData) => {

    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

  };

  // -----------------------
  // Logout
  // -----------------------

  const logout = () => {

    setUser(null);

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

  };

  // -----------------------

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};