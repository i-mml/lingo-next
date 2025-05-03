import axiosInstance from "../configs";
import axios from "axios";

export const GetUnits = async () => {
  let url = `/learning/units/`;

  const response = await axiosInstance.get(url);

  return response.data;
};

export async function getUnitById(id: string | number) {
  const { data } = await axiosInstance.get(`/learning/units/${id}/`);
  return data;
}
export async function getActivitiesByUniId(unit: string | number) {
  const { data } = await axiosInstance.get(`/learning/activities/`, {
    params: { unit },
  });
  return data;
}
