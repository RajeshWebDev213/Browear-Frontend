import api from "./api";



export const getProfile = async () => {

  const res = await api.get("/profile/me");

  return res.data;

};



export const updateProfile = async (data) => {

  const res = await api.put(
    "/profile/update",
    data
  );

  return res.data;

};



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



export const changePassword = async (
  passwordData
) => {

  const res = await api.put(
    "/profile/change-password",
    passwordData
  );

  return res.data;

};


export const deleteAccount = async () => {

  const res = await api.delete(
    "/profile/delete"
  );

  return res.data;

};



export const getAllUsers = async () => {

  const res = await api.get(
    "/profile/admin/users"
  );

  return res.data;

};


export const getSingleUser = async (
  userId
) => {

  const res = await api.get(
    `/profile/admin/user/${userId}`
  );

  return res.data;

};



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



export const adminDeleteUser = async (
  userId
) => {

  const res = await api.delete(
    `/profile/admin/user/${userId}`
  );

  return res.data;

};



export const getUserStatistics = async () => {

  const res = await api.get(
    "/profile/admin/stats"
  );

  return res.data;

};