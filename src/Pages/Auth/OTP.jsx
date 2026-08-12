import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../../services/api";
import brand from "../../assets/logo/browear-1.png";

import { RotateCcw, ArrowRight } from "lucide-react";

function OTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, password, demoOtp } = location.state || {};

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);
  const otp = digits.join("");

  useEffect(() => {
    if (seconds === 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

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

  const verifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must contain exactly 6 digits.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/verify-otp", {
        email,
        password,
        otp,
      });

      const data = response.data;

      sessionStorage.setItem("token", data.token);
      sessionStorage.removeItem("otpAccess");
      sessionStorage.setItem("personalAccess", "true");

      navigate("/personal");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setResending(true);

      await api.post("/auth/resend-otp", { email });

      setSeconds(60);
      setDigits(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
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
            Verification
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Verify OTP
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter the 6-digit code sent to
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
        <form onSubmit={verifyOTP} className="mt-8 space-y-8">
          {/* Digit boxes */}
          <div className="flex items-center justify-center gap-3">
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
                className="h-14 w-12 border-b-2 border-gray-300 bg-transparent text-center text-xl font-semibold text-gray-900 outline-none transition-colors focus:border-black"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center">
            {seconds > 0 ? (
              <p className="text-sm text-gray-500">
                Resend code in{" "}
                <span className="font-semibold text-gray-900">
                  {seconds}s
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={resendOTP}
                disabled={resending}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline disabled:opacity-50"
              >
                <RotateCcw size={15} />
                {resending ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>

          {/* Verify */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 bg-black text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Verify OTP
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OTP;