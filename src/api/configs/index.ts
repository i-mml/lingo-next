import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
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
        if (typeof window !== "undefined") {
          toast.error(
            error?.response?.data?.error ||
              "نشست شما منقضی شده است، دوباره وارد حساب خود شوید"
          );
        }

        deleteCookie("zabano-refresh-token");
        deleteCookie("zabano-access-token");

        break;
      case 403:
        if (typeof window !== "undefined") {
          toast.error(
            error?.response?.data?.error || "شما به این بخش دسترسی ندارید"
          );
        }
        break;
      case 404:
        if (typeof window !== "undefined") {
          toast.error(error?.response?.data?.error || "خطا در انجام عملیات");
        }
        break;
      case 400:
        if (typeof window !== "undefined") {
          toast.error(error?.response?.data?.error || "خطا در انجام عملیات");
        }
        break;
      case 422:
        if (typeof window !== "undefined") {
          console.error("Unprocessable Entity");
        }
        break;
      default:
        if (typeof window !== "undefined") {
          console.error(`Unexpected error: ${error.message}`);
        }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
