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
  referral_code?: string;
  age_range?: number;
  user_goal?: number;
  learning_preference?: number;
  weekly_time?: number;
}) => {
  const response = await axiosInstance.post("/userpereference/", params);

  return response;
};
