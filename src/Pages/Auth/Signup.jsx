import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import brand from "../../assets/logo/browear-1.png";

import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const sendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/send-otp", {
        email,
        password,
      });

      const data = response.data;

      sessionStorage.setItem("otpAccess", "true");

      navigate("/otp", {
        state: {
          email,
          password,
          demoOtp: data.otp,
        },
      });
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to send OTP.");
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
            Get Started
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Join Browear and discover premium fashion.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 border-l-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={sendOTP} className="mt-8 space-y-6">
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
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Create Password
            </label>
            <div className="relative mt-2">
              <Lock
                size={17}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
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

          {/* Send OTP Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 bg-black text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Send OTP
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?
          <Link
            to="/login"
            className="ml-2 font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-black"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;