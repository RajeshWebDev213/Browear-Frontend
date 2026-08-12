import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import api from "../../services/api";
import brand from "../../assets/logo/browear-1.png";

import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, demoOtp } = location.state || {};

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);
  const otp = digits.join("");

  const handleDigitChange = (index, value) => {
    const clean = value.replace(/[^0-9]/g, "");
    if (!clean) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    const chars = clean.split("");
    const next = [...digits];
    let i = index;
    for (const ch of chars) {
      if (i > 5) break;
      next[i] = ch;
      i++;
    }
    setDigits(next);

    const focusIndex = Math.min(i, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || !newPassword) {
      setError("OTP and new password are required.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must contain exactly 6 digits.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert("Password reset successfully.");

      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={brand} alt="Browear" className="h-10 w-auto" />
        </div>

        <div className="mt-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Reset Password
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Create a new password
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Verify the OTP sent to
            <span className="ml-1 font-medium text-gray-900">{email}</span>
          </p>
        </div>

        {/* Demo OTP */}
        {demoOtp && (
          <div className="mt-6 flex items-center justify-between border border-dashed border-gray-300 bg-gray-50 px-4 py-3">
            <span className="text-xs uppercase tracking-wide text-gray-400">
              Demo OTP
            </span>
            <span className="text-lg font-semibold tracking-[6px] text-gray-900">
              {demoOtp}
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-5 border-l-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={resetPassword} className="mt-8 space-y-8">
          {/* OTP digit boxes */}
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Verification Code
            </label>
            <div className="mt-3 flex items-center justify-between gap-2">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-14 w-11 border-b-2 border-gray-300 bg-transparent text-center text-xl font-semibold text-gray-900 outline-none transition-colors focus:border-black"
                />
              ))}
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
              New Password
            </label>
            <div className="relative mt-2">
              <Lock
                size={17}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 bg-black text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Reset Password
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Back to
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

export default ResetPassword;