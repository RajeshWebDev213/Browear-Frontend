/*
=========================================
REQUIRED FIELD
=========================================
*/

export const validateRequired = (value) => {

  return value.trim() !== "";

};

/*
=========================================
EMAIL VALIDATION
=========================================
*/

export const validateEmail = (email) => {

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);

};

/*
=========================================
PASSWORD VALIDATION
=========================================
*/

export const validatePassword = (password) => {

  return password.length >= 6;

};

/*
=========================================
CONFIRM PASSWORD
=========================================
*/

export const validateConfirmPassword = (
  password,
  confirmPassword
) => {

  return password === confirmPassword;

};

/*
=========================================
PHONE NUMBER
=========================================
*/

export const validatePhone = (phone) => {

  const regex = /^[6-9]\d{9}$/;

  return regex.test(phone);

};

/*
=========================================
OTP
=========================================
*/

export const validateOTP = (otp) => {

  const regex = /^\d{6}$/;

  return regex.test(otp);

};

/*
=========================================
PINCODE
=========================================
*/

export const validatePincode = (pincode) => {

  const regex = /^\d{6}$/;

  return regex.test(pincode);

};

/*
=========================================
PRICE
=========================================
*/

export const validatePrice = (price) => {

  return Number(price) > 0;

};

/*
=========================================
STOCK
=========================================
*/

export const validateStock = (stock) => {

  return Number(stock) >= 0;

};

/*
=========================================
RATING
=========================================
*/

export const validateRating = (rating) => {

  return rating >= 1 && rating <= 5;

};

/*
=========================================
IMAGE
=========================================
*/

export const validateImage = (file) => {

  return file !== null && file !== undefined;

};

/*
=========================================
TEXT LENGTH
=========================================
*/

export const validateMinLength = (
  value,
  length
) => {

  return value.trim().length >= length;

};

/*
=========================================
MAX LENGTH
=========================================
*/

export const validateMaxLength = (
  value,
  length
) => {

  return value.trim().length <= length;

};