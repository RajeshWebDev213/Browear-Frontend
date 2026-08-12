import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../services/profileService";

import { showSuccess, showError } from "../../utils/toast";

import brand from "../../assets/logo/browear-1.png";

import { AuthContext } from "../../context/AuthContext";

import {
  User,
  Phone,
  Calendar,
  VenusAndMars,
  ArrowRight,
  Check,
} from "lucide-react";

function Personal() {
  const navigate = useNavigate();

  const { user, login } = useContext(AuthContext);

  const [fullname, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    if (!fullname.trim()) {
      formErrors.fullname = "Full name is required.";
    }

    if (!gender) {
      formErrors.gender = "Gender is required.";
    }

    if (!dob) {
      formErrors.dob = "Date of Birth is required.";
    }

    if (!phonenumber.trim()) {
      formErrors.phonenumber = "Phone number is required.";
    }

    if (phonenumber && !/^[6-9]\d{9}$/.test(phonenumber)) {
      formErrors.phonenumber = "Enter a valid phone number.";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const data = await updateProfile({
        fullname,
        gender,
        dateOfBirth: dob,
        phone: phonenumber,
      });

      login(data.user);

      sessionStorage.removeItem("personalAccess");

      showSuccess("Profile Completed Successfully");

      navigate("/");
    } catch (err) {
      console.log(err);
      showError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const steps = ["Account", "Verify", "Profile"];

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={brand} alt="Browear" className="h-10 w-auto" />
        </div>

        {/* Step indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {steps.map((step, index) => {
            const isDone = index < 2;
            const isCurrent = index === 2;
            return (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center border text-xs
                    ${
                      isDone
                        ? "border-black bg-black text-white"
                        : isCurrent
                        ? "border-black text-black"
                        : "border-gray-300 text-gray-400"
                    }`}
                >
                  {isDone ? <Check size={13} /> : index + 1}
                </div>
                <span
                  className={`text-xs ${
                    isCurrent ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <span className="mx-1 h-px w-6 bg-gray-200" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Step 3 of 3
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Complete your profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Tell us a little about yourself to finish setting up your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Full Name */}
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Full Name
            </label>
            <div className="relative mt-2">
              <User
                size={17}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Your full name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border-b border-gray-300 bg-transparent py-2.5 pl-7 text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-black"
              />
            </div>
            {errors.fullname && (
              <p className="mt-1.5 text-xs text-red-500">{errors.fullname}</p>
            )}
          </div>

          {/* Gender + DOB */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Gender
              </label>
              <div className="relative mt-2">
                <VenusAndMars
                  size={17}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full appearance-none border-b border-gray-300 bg-transparent py-2.5 pl-7 text-[15px] text-gray-900 outline-none transition-colors focus:border-black"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {errors.gender && (
                <p className="mt-1.5 text-xs text-red-500">{errors.gender}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Date of Birth
              </label>
              <div className="relative mt-2">
                <Calendar
                  size={17}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full border-b border-gray-300 bg-transparent py-2.5 pl-7 text-[15px] text-gray-900 outline-none transition-colors focus:border-black"
                />
              </div>
              {errors.dob && (
                <p className="mt-1.5 text-xs text-red-500">{errors.dob}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Phone Number
            </label>
            <div className="relative mt-2">
              <Phone
                size={17}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border-b border-gray-300 bg-transparent py-2.5 pl-7 text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-black"
              />
            </div>
            {errors.phonenumber && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.phonenumber}
              </p>
            )}
          </div>

          {/* Save */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 bg-black text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Complete Profile
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Personal;