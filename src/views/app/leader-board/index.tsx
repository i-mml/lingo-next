import React from "react";
import LeaderboardItem from "./components/LeaderboardItem";
import { Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetGamificationLeaderboard } from "@/api/services/gamification";
import Lottie from "lottie-react";
import leaderboardAnimation from "@/assets/lotties/leaderboard.json";
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

  // Check if current user is in the main results
  const isCurrentUserInList = data?.results?.some(
    (user: LeaderboardUser) => user.username === data?.you?.username
  );

  // Prepare the main list (sorted by rank)
  const mainList = data?.results
    ? [...data.results].sort((a, b) => a.rank - b.rank)
    : [];

  // If current user is not in the main list, append them at the end
  const showCurrentUserSeparately = data?.you && !isCurrentUserInList;

  return (
    <div className="min-h-screen bg-backgroundLayout py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center rounded-full mb-4">
            <Lottie
              animationData={leaderboardAnimation}
              loop={true}
              className="w-20 h-20 md:w-32 md:h-32"
            />
          </div>
          <h1 className="text-3xl font-bold text-main mb-2">جدول برترین‌ها</h1>
          <p className="text-gray300">
            {data?.total_users?.toLocaleString()} نفر در حال رقابت هستند
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
            <div className="text-2xl font-bold text-xp mb-1">
              {data?.you?.xp?.toLocaleString()}
            </div>
            <div className="text-sm text-gray400">امتیاز شما</div>
          </div>
        </div>

        {/* Leaderboard List */}
        {!isLoading && mainList.length > 0 ? (
          <div className="space-y-3">
            {mainList.map((user: LeaderboardUser) => (
              <LeaderboardItem
                key={user.username}
                {...user}
                isCurrentUser={user.username === data?.you?.username}
              />
            ))}
            {showCurrentUserSeparately && (
              <>
                <div className="my-2 border-t border-gray-200" />
                <LeaderboardItem
                  key={data.you.username}
                  {...data.you}
                  isCurrentUser={true}
                />
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
