import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

 import api from "../../services/api";

import brand from "../../assets/logo/browear-1.png";

import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const { email, demoOtp } = location.state || {};

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const resetPassword = async (e) => {

    e.preventDefault();

    setError("");

    if (!otp || !newPassword) {

      setError(
        "OTP and new password are required."
      );

      return;

    }

    if (otp.length !== 6) {

      setError(
        "OTP must contain exactly 6 digits."
      );

      return;

    }

    try {

      setLoading(true);

      await api.post(
        "/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      alert(
        "Password reset successfully."
      );

      navigate("/login");

    } catch (err) {

      console.log(err);

      setError(

        err.response?.data?.message ||

        "Password reset failed."

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
            className="w-20 mb-5"
          />

          <h1 className="text-3xl font-bold tracking-tight">
            Reset Password
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Verify the OTP and create a new password.
          </p>

        </div>

        {/* Demo OTP */}

        {demoOtp && (

          <div
            className="
            mt-6
            rounded-2xl
            border
            border-gray-200
            bg-gray-100
            p-5
            text-center
            "
          >

            <p className="text-sm text-gray-500">
              Demo OTP
            </p>

            <p
              className="
              text-3xl
              font-bold
              tracking-[10px]
              mt-2
              "
            >
              {demoOtp}
            </p>

          </div>

        )}

        {/* Error */}

        {error && (

          <div
            className="
            mt-5
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-3
            text-sm
            text-red-600
            "
          >

            {error}

          </div>

        )}

        {/* Form */}

        <form
          onSubmit={resetPassword}
          className="mt-8 space-y-5"
        >

          {/* OTP */}

          <div className="relative">

            <ShieldCheck
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

              type="text"

              maxLength={6}

              value={otp}

              onChange={(e) =>
                setOtp(
                  e.target.value.replace(
                    /[^0-9]/g,
                    ""
                  )
                )
              }

              placeholder="Enter OTP"

              className="
              w-full
              h-14
              rounded-2xl
              border
              border-gray-200
              pl-12
              pr-4
              text-center
              text-xl
              tracking-[8px]
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

              value={newPassword}

              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }

              placeholder="New Password"

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

          {/* Submit */}

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

                Reset Password

                <ArrowRight size={18} />

              </>

            )}

          </button>

        </form>

        {/* Footer */}

        <div className="mt-8 text-center">

          <span className="text-gray-500">

            Back to

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

export default ResetPassword;