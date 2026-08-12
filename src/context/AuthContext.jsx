import {
  createContext,
  useEffect,
  useState,
} from "react";

import * as authService from "../services/authService";

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

  

  const token = sessionStorage.getItem("token");

  

  if (!token) {

    

    setLoading(false);

    return;

  }

  
  try {

  

   

const data = await authService.getAccount();



    

    setUser(data.user);

  } catch (err) {



  alert(err.response?.status);

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

  sessionStorage.setItem(
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

    sessionStorage.removeItem("token");

    sessionStorage.removeItem("user");

    sessionStorage.removeItem("otpAccess");

    sessionStorage.removeItem("personalAccess");

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