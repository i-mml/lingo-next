import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
});

export const centrifugeAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CENTRIFUGE_BASE_URL}`,
});

axiosInstance.interceptors.request.use(function (config) {
  const tokenValue = getCookie("zabano-access-token");

  if (tokenValue) {
    config.headers["Authorization"] = "Bearer " + tokenValue;
  }

  return config;
});

// handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status || 500;

    switch (status) {
      case 401:
        toast.error(
          error?.response?.data?.error ||
            "نشست شما منقضی شده است، دوباره وارد حساب خود شوید"
        );

        deleteCookie("zabano-refresh-token");
        deleteCookie("zabano-access-token");

        break;
      case 403:
        toast.error(
          error?.response?.data?.error || "شما به این بخش دسترسی ندارید"
        );
        break;
      case 404:
        toast.error(error?.response?.data?.error || "خطا در انجام عملیات");
        break;
      case 400:
        toast.error(error?.response?.data?.error || "خطا در انجام عملیات");
        break;
      case 422:
        console.error("Unprocessable Entity");
        break;
      default:
        console.error(`Unexpected error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
