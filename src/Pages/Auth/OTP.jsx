import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { AuthContext } from "./AuthContext";
function OTP() {
  const [seconds, setSeconds] = useState(60);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); 
  const { login } = useContext(AuthContext);
  const { email, password, demoOtp } = location.state || {};
  const [loading, setLoading] = useState(false);

  const verifyOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    //  MOVED length check BEFORE fetch
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    //  Only send email + otp (password not needed for OTP verify)
    const res = await fetch("http://localhost:3000/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email,password,otp}) 
    });
   
    const data = await res.json(); 
   if (res.ok) {
  console.log("TOKEN AFTER SIGNUP:", data.token);

  localStorage.setItem("token", data.token);

  localStorage.removeItem("otpAccess");
  localStorage.setItem("personalAccess", "true");

  navigate("/personal");
}else {
      setError(data.message || "Invalid OTP");
    }
  };
  const resendOTP = async () => {

  await fetch("http://localhost:3000/api/auth/resend-otp", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email })
});


  setSeconds(30); 
};


  useEffect(() => {
    if (seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white px-6 py-8 rounded-xl shadow-md">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          Enter the 6-digit OTP
        </h1>
        {demoOtp && (
  <div className="mt-4 text-center">
    <p className="text-sm text-gray-500">Demo OTP</p>

    <p className="text-xl font-bold tracking-widest">
      {demoOtp}
    </p>
  </div>
)}

        <form onSubmit={verifyOTP} className="flex flex-col gap-5 mt-6">
          <input
           id="otp"
            type="text"
            placeholder="Enter OTP"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/[^0-9]/g, ""))
            }
            className="w-full h-11 text-center text-lg tracking-widest border-2 border-blue-950 rounded outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
         

          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

 <div style={{ marginTop: "10px" }}>
      {seconds > 0 ? (
        <p>Resend OTP in {seconds}s</p>
      ) : (
        <button onClick={resendOTP} disabled={loading}>
          {loading ? "Sending..." : "Resend OTP"}
        </button>
      )}
    </div>

          <button
            type="submit"
            disabled={seconds > 60}  
            className="w-full h-11 bg-black text-white rounded font-semibold hover:opacity-90 disabled:opacity-50"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default OTP;
