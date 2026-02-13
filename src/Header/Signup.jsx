import React, {  useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendOTP = async(e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    try{
      const res = await fetch("https://browear-backend-production.up.railway.app/api/auth/send-otp",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify({email:email,password:password})
      });
      const data = await res.json();
      if (!res.ok) {
  alert(data.message || "Something went wrong");
  return;
}
      if(res.ok){
        console.log("OTP Sent")
        localStorage.setItem("otpAccess", "true");
        navigate("/OTP",{state: {email,password}})
        console.log("Hello")
      }
      else{
        alert(data.message)
      }
    }catch (err)
    {
        console.log(err)
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white px-6 py-8 rounded-xl shadow-md">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <h1 className="text-2xl sm:text-3xl text-black text-center">
            Signup to <span className="font-extrabold">BROWEAR</span>
          </h1>
          <img
            src="/browear-1.png"
            className="w-12 sm:w-16"
            alt="logo"
          />
        </div>

        {/* Subtitle */}
        <p className="text-center text-gray-600 mt-2">
          Create your Browear account
        </p>

        {/* Form */}
        <form
          onSubmit={sendOTP}
          className="flex flex-col gap-5 mt-6"
        >
          <input
            id="emailbox"
            type="email"
            placeholder="Enter your email"
            className="w-full h-10 border-2 border-blue-950 rounded px-2 outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            id="password"
            type="password"
            placeholder="Set your password"
            className="w-full h-10 border-2 border-blue-950 rounded px-2 outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full h-11 bg-black text-white rounded font-semibold hover:opacity-90"
          >
            Send OTP
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
