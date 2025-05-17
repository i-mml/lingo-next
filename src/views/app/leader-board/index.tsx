import React from "react";
import LeaderboardItem from "./components/LeaderboardItem";
import { Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetGamificationLeaderboard } from "@/api/services/gamification";

interface LeaderboardUser {
  rank: number;
  name: string;
  username: string;
  xp: number;
  level: number;
  avatar: string | null;
}

interface LeaderboardData {
  page: number;
  pages: number;
  total_users: number;
  results: LeaderboardUser[];
  you: LeaderboardUser;
}

const Leaderboard: React.FC = () => {
  // This would typically come from an API call
  const { data, isLoading } = useQuery({
    queryKey: ["get-gamification-leaderboard"],
    queryFn: GetGamificationLeaderboard,
  });
  console.log(data);

  const insertCurrentUser = (
    results: LeaderboardUser[],
    currentUser: LeaderboardUser
  ) => {
    // Remove any existing entry for the current user
    const filteredResults = results.filter(
      (user) => user.username !== currentUser.username
    );
    const currentUserRank = currentUser.rank;
    const lastRank = filteredResults[filteredResults.length - 1]?.rank || 0;

    if (currentUserRank <= lastRank) {
      // Insert current user at their rank position
      const index = filteredResults.findIndex(
        (user) => user.rank === currentUserRank
      );
      if (index !== -1) {
        filteredResults.splice(index, 0, currentUser);
      } else {
        filteredResults.push(currentUser);
      }
    } else {
      // Add current user at the end
      filteredResults.push(currentUser);
    }

    return filteredResults;
  };

  const displayResults = data?.results
    ? insertCurrentUser([...data?.results], data?.you)
    : [];

  return (
    <div className="min-h-screen bg-backgroundLayout py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-main mb-2">جدول برترین‌ها</h1>
          <p className="text-gray300">
            {data?.total_users.toLocaleString()} نفر در حال رقابت هستند
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-backgroundMain rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {data?.you?.rank}
            </div>
            <div className="text-sm text-gray400">رتبه شما</div>
          </div>
          <div className="bg-backgroundMain rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {data?.you?.level}
            </div>
            <div className="text-sm text-gray400">سطح شما</div>
          </div>
          <div className="bg-backgroundMain rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {data?.you?.xp.toLocaleString()}
            </div>
            <div className="text-sm text-gray400">امتیاز شما</div>
          </div>
        </div>

        {/* Leaderboard List */}
        {!isLoading && displayResults.length > 0 ? (
          <div className="space-y-3">
            {displayResults.map((user) => (
              <LeaderboardItem
                key={user.username}
                {...user}
                isCurrentUser={user.username === data.you.username}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
