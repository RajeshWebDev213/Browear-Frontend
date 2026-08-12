import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import brand from "../../assets/logo/browear-1.png";
import { validateEmail, validatePassword } from "../../utils/validation";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const HandleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      login(data.user);

      if (location.state?.from === "buy") {
        navigate("/checkout");
      } else if (data.user.role === "admin") {
        console.log("Going to the admin panel");
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={brand} alt="Browear" className="h-10 w-auto" />
        </div>

        <div className="mt-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Welcome Back
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to your Browear account.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 border-l-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={HandleLogin} className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Email Address
            </label>
            <div className="relative mt-2">
              <Mail
                size={17}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-b border-gray-300 bg-transparent py-2.5 pl-7 text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-black"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-gray-400 transition-colors hover:text-black"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative mt-2">
              <Lock
                size={17}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border-b border-gray-300 bg-transparent py-2.5 pl-7 pr-8 text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 bg-black text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Login
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Signup */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?
          <Link
            to="/signup"
            className="ml-2 font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-black"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;