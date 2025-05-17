import axiosInstance from "../configs";

export const GetGamificationStats = async () => {
  const response = await axiosInstance.get(`/gamification/stats/`);
  return response.data;
};

export const GetGamificationLeaderboard = async () => {
  const response = await axiosInstance.get(`/gamification/leaderboard/`);
  return response.data;
};
