import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import api from "../../services/api";
import brand from "../../assets/logo/browear-1.png"

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const sendOTP = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {

      setError(
        "Please enter your email and password."
      );

      return;

    }

    try {

      setLoading(true);

      const response = await api.post(
        "/auth/send-otp",
        {
          email,
          password,
        }
      );

      const data = response.data;

      localStorage.setItem(
        "otpAccess",
        "true"
      );

      navigate("/otp", {

        state: {

          email,

          password,

          demoOtp: data.otp,

        },

      });

    } catch (err) {

      console.log(err);

      setError(

        err.response?.data?.message ||

        "Failed to send OTP."

      );

    } finally {

      setLoading(false);

    }

  };
  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-6">

    <div
      className="
      w-full
      max-w-md
      bg-white/90
      backdrop-blur-xl
      rounded-3xl
      shadow-2xl
      border
      border-gray-200
      p-8
      "
    >

      {/* Logo */}

      <div className="flex flex-col items-center">

        <img
          src={brand}
          alt="Browear"
          className="w-20 mb-4"
        />

        <h1 className="text-3xl font-bold tracking-tight">

          Create Account

        </h1>

        <p className="text-gray-500 mt-2 text-center">

          Join Browear and discover premium fashion.

        </p>

      </div>

      {/* Error */}

      {error && (

        <div
          className="
          mt-6
          rounded-xl
          bg-red-50
          border
          border-red-200
          p-3
          text-red-600
          text-sm
          "
        >

          {error}

        </div>

      )}

      {/* Form */}

      <form
        onSubmit={sendOTP}
        className="mt-8 space-y-5"
      >

        {/* Email */}

        <div className="relative">

          <Mail
            size={20}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          />

          <input

            type="email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            placeholder="Email Address"

            className="
            w-full
            h-14
            rounded-2xl
            border
            border-gray-200
            pl-12
            pr-4
            outline-none
            focus:border-black
            transition
            "

          />

        </div>

        {/* Password */}

        <div className="relative">

          <Lock
            size={20}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          />

          <input

            type={
              showPassword
                ? "text"
                : "password"
            }

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            placeholder="Create Password"

            className="
            w-full
            h-14
            rounded-2xl
            border
            border-gray-200
            pl-12
            pr-12
            outline-none
            focus:border-black
            transition
            "

          />

          <button

            type="button"

            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }

            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            hover:text-black
            "

          >

            {showPassword ? (

              <EyeOff size={20} />

            ) : (

              <Eye size={20} />

            )}

          </button>

        </div>

        {/* Send OTP Button */}

        <button

          type="submit"

          disabled={loading}

          className="
          w-full
          h-14
          rounded-2xl
          bg-black
          text-white
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          hover:bg-zinc-900
          transition
          disabled:opacity-60
          "

        >

          {loading ? (

            <div
              className="
              w-5
              h-5
              rounded-full
              border-2
              border-white
              border-t-transparent
              animate-spin
              "
            />

          ) : (

            <>

              Send OTP

              <ArrowRight size={18} />

            </>

          )}

        </button>

      </form>

      {/* Footer */}

      <div className="mt-8 text-center">

        <span className="text-gray-500">

          Already have an account?

        </span>

        <Link

          to="/login"

          className="
          ml-2
          font-semibold
          hover:underline
          "

        >

          Login

        </Link>

      </div>

    </div>

  </div>
);

}

export default Signup;