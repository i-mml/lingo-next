import axios from "axios";
import { toast } from "react-toastify";

const axiosAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
});

// handle errors
axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.detail || "");

    return error;
  }
);
export default axiosAuth;
