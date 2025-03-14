import axiosInstance from "../configs";

export const GetEducationStatistics = async () => {
  const response = await axiosInstance.get("/education/statistics/");

  return response;
};
