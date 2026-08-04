import api from "./api";

/*
=========================================
GET MY PROFILE
=========================================
*/

export const getProfile = async () => {

  const res = await api.get("/profile/me");

  return res.data;

};

/*
=========================================
UPDATE PROFILE
=========================================
*/

export const updateProfile = async (data) => {

  const res = await api.put(
    "/profile/update",
    data
  );

  return res.data;

};

/*
=========================================
UPLOAD PROFILE PICTURE
=========================================
*/

export const uploadProfilePicture = async (
  formData
) => {

  const res = await api.put(
    "/profile/avatar",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;

};

/*
=========================================
CHANGE PASSWORD
=========================================
*/

export const changePassword = async (
  passwordData
) => {

  const res = await api.put(
    "/profile/change-password",
    passwordData
  );

  return res.data;

};

/*
=========================================
DELETE ACCOUNT
=========================================
*/

export const deleteAccount = async () => {

  const res = await api.delete(
    "/profile/delete"
  );

  return res.data;

};

/*
=========================================
ADMIN - GET ALL USERS
=========================================
*/

export const getAllUsers = async () => {

  const res = await api.get(
    "/profile/admin/users"
  );

  return res.data;

};

/*
=========================================
ADMIN - GET SINGLE USER
=========================================
*/

export const getSingleUser = async (
  userId
) => {

  const res = await api.get(
    `/profile/admin/user/${userId}`
  );

  return res.data;

};

/*
=========================================
ADMIN - UPDATE USER ROLE
=========================================
*/

export const updateUserRole = async (
  userId,
  role
) => {

  const res = await api.put(
    `/profile/admin/user-role/${userId}`,
    {
      role,
    }
  );

  return res.data;

};

/*
=========================================
ADMIN - DELETE USER
=========================================
*/

export const adminDeleteUser = async (
  userId
) => {

  const res = await api.delete(
    `/profile/admin/user/${userId}`
  );

  return res.data;

};

/*
=========================================
ADMIN - USER STATISTICS
=========================================
*/

export const getUserStatistics = async () => {

  const res = await api.get(
    "/profile/admin/stats"
  );

  return res.data;

};