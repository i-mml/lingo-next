import axiosInstance from "../configs";

export const GetUnits = async () => {
  let url = `/learning/units/`;

  const response = await axiosInstance.get(url);

  return response.data;
};
