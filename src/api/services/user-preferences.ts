import axiosInstance from "../configs";

export const GetUserPreferencesAccents = async (languageId: number) => {
  const response = await axiosInstance.get(
    `/userpereference/accents?language=${languageId}`
  );

  return response;
};

export const PostUserPreferences = async (params: {
  preferred_language?: number;
  preferred_accent?: number;
  knowledge_level?: number;
  daily_goal?: number;
  referral_code?: string;
}) => {
  const response = await axiosInstance.post("/userpereference/", params);

  return response;
};
