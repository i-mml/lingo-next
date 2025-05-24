import React, { useState } from "react";
import { Trophy, Star } from "lucide-react";
import Image from "next/image";
import CustomModal from "@/components/shared/CustomModal";

interface LeaderboardItemProps {
  rank: number;
  name: string | null;
  username: string | null;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const displayName = name || username || "کاربر";

  const handleImageClick = () => {
    if (avatar) {
      setIsModalOpen(true);
    }
  };

  return (
    <div
      className={`relative flex items-center gap-4 p-4 rounded-xl transition-all ${
        isCurrentUser
          ? "bg-primary/40 border-2 border-primary shadow-md shadow-primary"
          : "bg-backgroundMain hover:bg-backgroundMain/50 shadow-md shadow-gray-500"
      }`}
    >
      {/* Rank */}
      <div
        className={`absolute top-4 left-2 z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md ${
          rank <= 3 ? getRankColor(rank) : "bg-backgroundLayout"
        }`}
        style={{ transform: "translate(25%, -25%)" }}
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
          <div
            className={`w-12 h-12 rounded-full overflow-hidden ${
              avatar ? "cursor-pointer hover:opacity-80 transition-opacity" : ""
            }`}
            onClick={handleImageClick}
          >
            <Image
              src={avatar}
              alt={displayName}
              width={48}
              height={48}
              className="object-cover"
              priority={rank <= 10}
              loading={rank <= 10 ? "eager" : "lazy"}
              quality={75}
              sizes="48px"
            />
          </div>
        ) : (
          <span className="text-xl font-bold text-gray400">
            {displayName.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-main line-clamp-1 max-w-[80%]">
          {displayName}
          {isCurrentUser && (
            <span className="ml-2 text-sm text-primary">(You)</span>
          )}
        </h3>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-placeholder">Level {level}</span>
          <span>•</span>
          <span className="text-xp font-bold">{xp.toLocaleString()} XP</span>
        </div>
      </div>
      {isModalOpen ? (
        <CustomModal open={isModalOpen} toggle={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h3 className="font-bold text-base line-clamp-1 max-w-[80%] mb-4">
              {displayName}
            </h3>
            <div className="relative">
              {avatar ? (
                <Image
                  src={avatar || ""}
                  alt={displayName}
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  quality={90}
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </CustomModal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LeaderboardItem;
