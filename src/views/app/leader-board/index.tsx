import React from "react";
import LeaderboardItem from "./components/LeaderboardItem";
import { Trophy } from "lucide-react";

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
  const data: LeaderboardData = {
    page: 1,
    pages: 1853,
    total_users: 37048,
    results: [
      {
        rank: 1,
        name: "رضا جمال",
        username: "user-21066",
        xp: 7111,
        level: 18,
        avatar: null,
      },
      // ... rest of the results
    ],
    you: {
      rank: 12,
      username: "user-25258",
      name: "",
      xp: 1519,
      level: 9,
      avatar: null,
    },
  };

  const insertCurrentUser = (
    results: LeaderboardUser[],
    currentUser: LeaderboardUser
  ) => {
    const currentUserRank = currentUser.rank;
    const lastRank = results[results.length - 1].rank;

    if (currentUserRank <= lastRank) {
      // Insert current user at their rank position
      const index = results.findIndex((user) => user.rank === currentUserRank);
      if (index !== -1) {
        results.splice(index, 0, currentUser);
      }
    } else {
      // Add current user at the end
      results.push(currentUser);
    }

    return results;
  };

  const displayResults = insertCurrentUser([...data.results], data.you);

  return (
    <div className="min-h-screen bg-backgroundLayout py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-main mb-2">Leaderboard</h1>
          <p className="text-gray300">
            {data.total_users.toLocaleString()} learners competing
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-backgroundMain rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {data.you.rank}
            </div>
            <div className="text-sm text-gray400">Your Rank</div>
          </div>
          <div className="bg-backgroundMain rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {data.you.level}
            </div>
            <div className="text-sm text-gray400">Your Level</div>
          </div>
          <div className="bg-backgroundMain rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {data.you.xp.toLocaleString()}
            </div>
            <div className="text-sm text-gray400">Your XP</div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {displayResults.map((user) => (
            <LeaderboardItem
              key={user.username}
              {...user}
              isCurrentUser={user.username === data.you.username}
            />
          ))}
        </div>

        {/* Pagination Info */}
        <div className="mt-8 text-center text-sm text-gray400">
          Page {data.page} of {data.pages}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
