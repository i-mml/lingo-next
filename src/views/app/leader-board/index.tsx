import React, { useState, useEffect, useRef } from "react";
import LeaderboardItem from "./components/LeaderboardItem";
import ProfileCompletionBox from "./components/ProfileCompletionBox";
import { useQuery } from "@tanstack/react-query";
import { GetGamificationLeaderboard } from "@/api/services/gamification";
import Lottie from "lottie-react";
import leaderboardAnimation from "@/assets/lotties/leaderboard.json";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInView } from "react-intersection-observer";

interface LeaderboardUser {
  rank: number;
  name: string | null;
  username: string | null;
  xp: number;
  level: number;
  avatar: string | null;
  email: string | null;
  birthday: string | null;
  is_compeleted: boolean;
}

interface LeaderboardResponse {
  results: LeaderboardUser[];
  next: string | null;
  total_users: number;
  you: LeaderboardUser;
}

const PAGE_SIZE = 50;

const Leaderboard: React.FC = () => {
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<LeaderboardUser[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { ref: inViewRef, inView: youInView } = useInView({
    root: document.getElementById("leaderboard-container"),
    threshold: 0.5,
  });

  const { data: gamificationData } = useQuery<LeaderboardResponse>({
    queryKey: ["get-gamification-leaderboard-without-loading"],
    queryFn: () =>
      GetGamificationLeaderboard({ page: 1, page_size: PAGE_SIZE }),
  });

  const { data, isLoading } = useQuery<LeaderboardResponse>({
    queryKey: ["get-gamification-leaderboard", page],
    queryFn: () => GetGamificationLeaderboard({ page, page_size: PAGE_SIZE }),
  });

  // Update allUsers when new data arrives
  useEffect(() => {
    if (page === 1) {
      if (gamificationData?.results) {
        setAllUsers(gamificationData?.results);
      }
    } else {
      if (data?.results) {
        setAllUsers((prev) => [...prev, ...data.results]);
      }
    }
    setIsLoadingMore(false);
  }, [gamificationData?.results, data?.results, page]);

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  // Check if current user is in the main results
  const isCurrentUserInList = allUsers.some(
    (user: LeaderboardUser) => user.username === data?.you?.username
  );

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
            {gamificationData?.total_users?.toLocaleString()} نفر در حال رقابت
            هستند
          </p>
        </div>

        {/* Profile Completion Box */}
        <ProfileCompletionBox />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-backgroundMain rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {gamificationData?.you?.rank}
            </div>
            <div className="text-sm text-gray400">رتبه شما</div>
          </div>
          <div className="bg-backgroundMain rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {gamificationData?.you?.level}
            </div>
            <div className="text-sm text-gray400">سطح شما</div>
          </div>
          <div className="bg-backgroundMain rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-xp mb-1">
              {gamificationData?.you?.xp?.toLocaleString()}
            </div>
            <div className="text-sm text-gray400">امتیاز شما</div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div
          id="leaderboard-container"
          style={{ height: "60vh", overflow: "auto" }}
        >
          <InfiniteScroll
            dataLength={allUsers.length}
            next={handleLoadMore}
            hasMore={
              data?.total_users
                ? data?.total_users - page * PAGE_SIZE > 0
                : false
            }
            scrollableTarget="leaderboard-container"
            loader={
              <div className="flex justify-center items-center h-10 mt-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            }
            endMessage={
              <p className="text-center text-gray400 mt-4">
                {showCurrentUserSeparately
                  ? "همه کاربران نمایش داده شدند"
                  : "به انتهای لیست رسیدید"}
              </p>
            }
          >
            <div className="space-y-3">
              {allUsers?.map((user: LeaderboardUser, idx) => {
                const isYou = user.username === data?.you?.username;
                // Attach the observer ref to the "You" item
                return (
                  <div
                    key={`${user.username}-${user.rank}`}
                    ref={isYou ? inViewRef : undefined}
                  >
                    <LeaderboardItem {...user} isCurrentUser={isYou} />
                  </div>
                );
              })}
              {showCurrentUserSeparately && data.you && (
                <>
                  <div className="my-2 border-t border-gray-200" />
                  <LeaderboardItem
                    key={data.you.username}
                    {...data.you}
                    isCurrentUser={true}
                  />
                </>
              )}
              {isLoading && (
                <div className="flex justify-center items-center h-10 mt-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
          </InfiniteScroll>
          {/* Sticky You Card */}
          {data?.you && !youInView && (
            <div className="fixed bottom-24 left-0 right-0 z-50 flex justify-center pointer-events-none px-2 md:px-0">
              <div className="pointer-events-auto w-full max-w-xl">
                <div className="border-2 border-primary rounded-xl shadow-lg bg-backgroundMain">
                  <LeaderboardItem {...data.you} isCurrentUser={true} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
