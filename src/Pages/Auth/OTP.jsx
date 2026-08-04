import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

 import api from "../../services/api";
import brand from "../../assets/logo/browear-1.png"

import {
  ShieldCheck,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

function OTP() {

  const navigate = useNavigate();
  const location = useLocation();

  const { email, password, demoOtp } =
    location.state || {};

  const [otp, setOtp] = useState("");

  const [seconds, setSeconds] =
    useState(60);

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {

    if (seconds === 0) return;

    const timer = setInterval(() => {

      setSeconds((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

  }, [seconds]);

  const verifyOTP = async (e) => {

    e.preventDefault();

    setError("");

    if (!otp) {

      setError("Please enter OTP.");

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

      const response =
        await api.post(
          "/auth/verify-otp",
          {
            email,
            password,
            otp,
          }
        );

      const data = response.data;

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.removeItem(
        "otpAccess"
      );

      localStorage.setItem(
        "personalAccess",
        "true"
      );

      navigate("/personal");

    } catch (err) {

      console.log(err);

      setError(

        err.response?.data?.message ||

        "OTP verification failed."

      );

    } finally {

      setLoading(false);

    }

  };

  const resendOTP = async () => {

    try {

      setResending(true);

      await api.post(
        "/auth/resend-otp",
        {
          email,
        }
      );

      setSeconds(60);

    } catch (err) {

      console.log(err);

      setError(

        err.response?.data?.message ||

        "Failed to resend OTP."

      );

    } finally {

      setResending(false);

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

          Verify OTP

        </h1>

        <p className="text-gray-500 mt-2 text-center">

          Enter the 6-digit verification code sent to

        </p>

        <p className="font-semibold mt-1">

          {email}

        </p>

      </div>

      {/* Demo OTP */}

      {demoOtp && (

        <div
          className="
          mt-6
          rounded-2xl
          bg-gray-100
          border
          border-gray-200
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
            tracking-[10px]
            font-bold
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
        onSubmit={verifyOTP}
        className="mt-8 space-y-6"
      >

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

        {/* Timer */}

        <div className="text-center">

          {seconds > 0 ? (

            <p className="text-gray-500">

              Resend OTP in

              <span className="font-semibold">

                {" "}
                {seconds}s

              </span>

            </p>

          ) : (

            <button

              type="button"

              onClick={resendOTP}

              disabled={resending}

              className="
              inline-flex
              items-center
              gap-2
              text-black
              font-medium
              hover:underline
              disabled:opacity-50
              "

            >

              <RotateCcw size={18} />

              {resending
                ? "Sending..."
                : "Resend OTP"}

            </button>

          )}

        </div>

        {/* Verify */}

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

              Verify OTP

              <ArrowRight size={18} />

            </>

          )}

        </button>

      </form>

    </div>

  </div>
);

}

export default OTP;