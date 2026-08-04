import React, { useContext, useState } from "react";  
import { Link,useLocation,useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";              

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
const HandleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Email and password are required");
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:3000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    // Debug
    console.log("LOGIN RESPONSE:", data);
    console.log("TOKEN FROM BACKEND:", data.token);

    // Check error BEFORE storing anything
    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Make sure token actually exists
    if (!data.token) {
      console.error("Backend did not return a token");
      alert("Authentication error: token not received");
      return;
    }

    // Save authentication data
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log(
      "TOKEN SAVED:",
      localStorage.getItem("token")
    );

    // Temporarily remove this until we check AuthContext
    // login(data.user);
     login(data.user);
    alert("Login successful");

    if (location.state?.from === "buy") {
      navigate("/Checkout");
    } else if (data.user.role === "admin") {
      navigate("/adminpanel");
    } else {
      navigate("/");
    }

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    setError("Login failed. Please try again.");
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white px-6 py-8 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <h1 className="text-2xl sm:text-3xl text-black text-center">
            Login to <span className="font-extrabold">BROWEAR</span>
          </h1>
          <img
            src="/browear-1.png" 
            className="w-12 sm:w-16"
            alt="logo"
          />
        </div>

        <p className="text-center text-gray-600 mt-2">
          Login to your Browear account
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5 mt-6" onSubmit={HandleLogin}>
          <input
          id="emailbox"
            type="email"
            placeholder="Enter your email"
            className="w-full h-10 bg-white outline-none border-2 border-blue-950 rounded px-2 focus:ring-2 focus:ring-blue-400"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
          id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full h-10 bg-white outline-none border-2 border-blue-950 rounded px-2 focus:ring-2 focus:ring-blue-400"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full h-10 bg-black text-white rounded font-semibold hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
