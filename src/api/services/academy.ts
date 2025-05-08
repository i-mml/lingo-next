// group classes

import axiosInstance from "../configs";

export const GetAcademySchedules = async () => {
  const response = await axiosInstance.get("/academy/schedules/");
  return response.data;
};
