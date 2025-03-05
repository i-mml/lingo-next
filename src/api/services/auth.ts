import axiosInstance from "../configs";
import axiosAuth from "../configs/axiosAuth";

export const getAuthWhoAmI = async () => {
  const response = await axiosInstance.get("/auth/who_am_i");

  return response;
};

export const PostAuthRegister = async (params: any) => {
  const response = await axiosInstance.post("/auth/register", params);

  return response;
};

export const PostAuthLogin = async (params: any) => {
  const response = await axiosAuth.post("/auth/login/", params);

  return response;
};

export const PostAuthGoogleLogin = async (params: any) => {
  const response = await axiosAuth.post("/auth/auth/google-login/", params);

  return response;
};

export const PostAuthLoginRefresh = async (params: any) => {
  const response = await axiosInstance.post("/auth/login/refresh", params);

  return response;
};

export const PostAuthLoginVerify = async (params: any) => {
  const response = await axiosAuth.patch("/auth/login/verify/", params);

  return response;
};

export const PostAuthLoginPassword = async (params: any) => {
  const response = await axiosAuth.post("/auth/login/password/", params);

  return response;
};

export const PostAuthForgetPassword = async (params: any) => {
  const response = await axiosAuth.post("/auth/forget_password", params);

  return response;
};

export const PatchAuthLoginSetPassword = async (params: any) => {
  const response = await axiosAuth.patch("/auth/login/set_password/", params);

  return response;
};

export const PutAuthChangePassword = async (params: any) => {
  const response = await axiosInstance.put("/auth/change_password", params);

  return response;
};

export const PutAuthUpdateDetail = async (params: any) => {
  const response = await axiosInstance.put("/auth/update_detail", params);

  return response;
};

export const PostAuthBookmarks = async (movie_id: number) => {
  const response = await axiosInstance.post("/auth/bookmarks/", { movie_id });

  return response;
};

export const GetAuthBookmarks = async () => {
  const response = await axiosInstance.get("/auth/bookmarks/");

  return response;
};

export const GetAuthActivityHistory = async () => {
  const response = await axiosInstance.get("/auth/activity/history/");
  return response.data;
};
