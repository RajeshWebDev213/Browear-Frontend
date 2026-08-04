import React, {
  useContext,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

// import api from "../../services/api";

import brand from "../../assets/logo/browear-1.png";

import { AuthContext } from "../../context/AuthContext";

import {
  User,
  Phone,
  Calendar,
  VenusAndMars,
  ArrowRight,
} from "lucide-react";

function Personal() {

  const navigate = useNavigate();

  const { user, login } =
    useContext(AuthContext);

  const [fullname, setFullName] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [dob, setDob] =
    useState("");

  const [phonenumber, setPhoneNumber] =
    useState("");

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    let formErrors = {};

    if (!fullname.trim())
      formErrors.fullname =
        "Full name is required.";

    if (!gender)
      formErrors.gender =
        "Gender is required.";

    if (!dob)
      formErrors.dob =
        "Date of Birth is required.";

    if (!phonenumber)
      formErrors.phonenumber =
        "Phone number is required.";

    setErrors(formErrors);

    if (
      Object.keys(formErrors).length > 0
    )
      return;

    try {

      setLoading(true);

      const response =
        await api.post(
          "/auth/personal",
          {
            fullname,
            gender,
            dob,
            phonenumber,
          }
        );

      const data = response.data;

      login({

        ...user,

        fullname,

        gender,

        dob,

        phonenumber,

      });

      localStorage.removeItem(
        "personalAccess"
      );

      navigate("/");

    } catch (err) {

      console.log(err);

      alert(

        err.response?.data?.message ||

        "Something went wrong."

      );

    } finally {

      setLoading(false);

    }

  };
    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-6 py-10">

      <div
        className="
        w-full
        max-w-lg
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

            Complete Your Profile

          </h1>

          <p className="text-gray-500 mt-2 text-center">

            Tell us a little about yourself to finish setting up your account.

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Full Name */}

          <div className="relative">

            <User
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

              placeholder="Full Name"

              value={fullname}

              onChange={(e) =>
                setFullName(e.target.value)
              }

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

          {errors.fullname && (
            <p className="text-sm text-red-500">
              {errors.fullname}
            </p>
          )}

          {/* Gender */}

          <div className="relative">

            <VenusAndMars
              size={20}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              "
            />

            <select

              value={gender}

              onChange={(e) =>
                setGender(e.target.value)
              }

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
              appearance-none
              bg-white
              "

            >

              <option value="">
                Select Gender
              </option>

              <option value="male">
                Male
              </option>

              <option value="female">
                Female
              </option>

              <option value="other">
                Other
              </option>

            </select>

          </div>

          {errors.gender && (
            <p className="text-sm text-red-500">
              {errors.gender}
            </p>
          )}

          {/* Date of Birth */}

          <div className="relative">

            <Calendar
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

              type="date"

              value={dob}

              onChange={(e) =>
                setDob(e.target.value)
              }

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

          {errors.dob && (
            <p className="text-sm text-red-500">
              {errors.dob}
            </p>
          )}

          {/* Phone */}

          <div className="relative">

            <Phone
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

              type="tel"

              placeholder="Phone Number"

              value={phonenumber}

              onChange={(e) =>
                setPhoneNumber(e.target.value)
              }

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

          {errors.phonenumber && (
            <p className="text-sm text-red-500">
              {errors.phonenumber}
            </p>
          )}

          {/* Save */}

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

                Complete Profile

                <ArrowRight size={18} />

              </>

            )}

          </button>

        </form>

      </div>

    </div>
  );
}

export default Personal;