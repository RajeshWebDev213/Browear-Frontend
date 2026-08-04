import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    // Also reject accidentally stored "undefined"
    if (!token || token === "undefined") {
      localStorage.removeItem("token");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/api/auth/account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {

        if (!res.ok) {
          throw new Error("Invalid token");
        }

        return res.json();
      })

      .then((data) => {

        // Restore logged-in user after refresh
        setUser(data);

      })

      .catch((error) => {

        console.error("Authentication error:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

      })

      .finally(() => {

        setLoading(false);

      });

  }, []);


  // Only update frontend authentication state
  const login = (userData) => {

    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

  };


  const logout = () => {

    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};