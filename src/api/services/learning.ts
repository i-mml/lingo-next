import axiosInstance from "../configs";
import axios from "axios";

export const GetUnits = async (knowledgeLevel: string) => {
  let url = `/learning/units/`;

  const response = await axiosInstance.get(url, {
    params: { level_id: knowledgeLevel },
  });

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

export async function getActivityPatternsByActivityId(activityId: string) {
  const { data } = await axiosInstance.get(`/learning/patterns/`, {
    params: { activity: activityId },
  });
  return data;
}

export async function postCreateUserPatternProgress(patternId: string) {
  const { data } = await axiosInstance.post(
    `/learning/user-pattern-progress/`,
    {
      pattern_id: patternId,
    }
  );
  return data;
}

export async function patchUserPatternProgress(patternId: string) {
  const { data } = await axiosInstance.post(
    `/learning/user-pattern-progress/`,
    {
      pattern_id: patternId,
    }
  );
  return data;
}
