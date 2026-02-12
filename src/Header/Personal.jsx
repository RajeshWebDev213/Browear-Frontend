import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Personal() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fullname, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!fullname.trim()) formErrors.fullname = "Full name is required";
    if (!gender) formErrors.gender = "Gender is required";
    if (!dob) formErrors.dob = "DOB is required";
    if (!phonenumber) formErrors.phonenumber = "Phone number is required";

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    try {
  
     const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please signup again.");
        navigate("/Signup");
        return;
      }


const res = await fetch("https://browear-backend-production.up.railway.app/api/auth/personal", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({
    fullname,
    gender,
    dob,
    phonenumber
  }),
});

      const data = await res.json();

      if (res.ok) {
      
        login({...user,  name: fullname,});
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white px-6 py-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Personal Details
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <label>
            Full Name
            <input
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-10 border px-2"
            />
            {errors.fullname && <p className="text-red-500">{errors.fullname}</p>}
          </label>

          {/* Gender */}
          <label>
            Gender
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full h-10 border px-2"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          {/* DOB */}
          <label>
            DOB
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full h-10 border px-2"
            />
          </label>

          {/* Phone */}
          <label>
            Phone
            <input
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full h-10 border px-2"
            />
          </label>

          <button className="bg-black text-white h-11 rounded">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Personal;
