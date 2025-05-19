import axiosInstance from "../configs";

export const GetGamificationStats = async () => {
  const response = await axiosInstance.get(`/gamification/stats/`);
  return response.data;
};

export const GetGamificationLeaderboard = async (params: {
  page: number;
  page_size: number;
}) => {
  const response = await axiosInstance.get(`/gamification/leaderboard/`, {
    params: {
      page: params.page,
      page_size: params.page_size,
    },
  });
  return response.data;
};
