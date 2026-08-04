import api from "./api";

// Login
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// Signup OTP
export const sendOTP = async (data) => {
  const res = await api.post("/auth/send-otp", data);
  return res.data;
};

// Verify OTP
export const verifyOTP = async (data) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};

// Personal Details
export const savePersonalDetails = async (data) => {
  const res = await api.post("/auth/personal", data);
  return res.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const res = await api.post("/auth/reset-password", data);
  return res.data;
};

// Get Logged User
export const getAccount = async () => {
  const res = await api.get("/auth/account");
  return res.data;
};