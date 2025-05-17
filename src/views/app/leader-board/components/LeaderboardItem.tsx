import React from "react";
import { Trophy, Star } from "lucide-react";
import Image from "next/image";

interface LeaderboardItemProps {
  rank: number;
  name: string;
  username: string;
  xp: number;
  level: number;
  avatar: string | null;
  isCurrentUser?: boolean;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  rank,
  name,
  username,
  xp,
  level,
  avatar,
  isCurrentUser = false,
}) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-600";
      case 2:
        return "bg-gray-100 text-gray-600";
      case 3:
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
        isCurrentUser
          ? "bg-primary/5 border-2 border-primary"
          : "bg-backgroundMain hover:bg-backgroundMain/50"
      }`}
    >
      {/* Rank */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          rank <= 3 ? getRankColor(rank) : "bg-gray-100"
        }`}
      >
        {rank <= 3 ? (
          <Trophy className="w-5 h-5" />
        ) : (
          <span className="text-sm">{rank}</span>
        )}
      </div>

      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-backgroundLayout flex items-center justify-center overflow-hidden">
        {avatar ? (
          <Image
            src={avatar}
            alt={name || username}
            width={48}
            height={48}
            className="object-cover"
          />
        ) : (
          <span className="text-xl font-bold text-gray400">
            {(name || username).charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-main">
          {name || username}
          {isCurrentUser && (
            <span className="ml-2 text-sm text-primary">(You)</span>
          )}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray400">
          <span>Level {level}</span>
          <span>•</span>
          <span>{xp.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Level Badge */}
      <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full">
        <Star className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">Level {level}</span>
      </div>
    </div>
  );
};

export default LeaderboardItem;
