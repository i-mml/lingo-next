// group classes

import axiosInstance from "../configs";

export const GetAcademySchedules = async () => {
  const response = await axiosInstance.get("/academy/schedules/");
  return response.data;
};

export const GetAcademyBookings = async () => {
  const response = await axiosInstance.get("/academy/bookings/");
  return response.data;
};
