import axios from "axios";
import { toast } from "react-toastify";

const axiosAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
});

// handle errors
axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      toast.error(error.response?.data?.detail || "fdfd");
    }
    return error;
  }
);
export default axiosAuth;
