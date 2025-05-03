"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUnitById } from "@/api/services/units";
import Image from "next/image";
import { LockIcon } from "lucide-react";
import Link from "next/link";
import VideoIcon from "@/assets/video-unit.svg";
import WriteIcon from "@/assets/write-unit.svg";
import InterpretIcon from "@/assets/interpret-unit.svg";
import GrammarVideoIcon from "@/assets/grammar-video-unit.svg";
import GrammarExercisesIcon from "@/assets/grammar-exercises-unit.svg";
import VocabularyIcon from "@/assets/vocabulary-unit.svg";
import AssessmentIcon from "@/assets/assesment-unit.svg";
import SpeakIcon from "@/assets/speak-unit.svg";
import { isMobile } from "react-device-detect";
import { useThemeType } from "@/store/use-theme-type";
import { useTheme } from "next-themes";

const activities = [
  {
    key: "film",
    label: "ABA Film",
    icon: <VideoIcon />,
    color: "bg-blue-100",
    type: "Listening",
    time: "2 min.",
  },
  {
    key: "speak",
    label: "Speak",
    icon: <SpeakIcon />,
    color: "bg-cyan-100",
    type: "Speaking",
    time: "5 min.",
  },
  {
    key: "write",
    label: "Write",
    icon: <WriteIcon />,
    color: "bg-green-100",
    type: "Writing",
    time: "4 min.",
  },
  {
    key: "interpret",
    label: "Interpret",
    icon: <InterpretIcon />,
    color: "bg-yellow-100",
    type: "Speaking",
    time: "2 min.",
  },
  {
    key: "grammar_video",
    label: "Grammar Video",
    icon: <GrammarVideoIcon />,
    color: "bg-purple-100",
    type: "Grammar",
    time: "6 min.",
  },
  {
    key: "grammar_exercises",
    label: "Grammar Exercises",
    icon: <GrammarExercisesIcon />,
    color: "bg-pink-100",
    type: "Grammar",
    time: "4 min.",
  },
  {
    key: "vocabulary",
    label: "Vocabulary",
    icon: <VocabularyIcon />,
    color: "bg-orange-100",
    type: "Vocabulary",
    time: "2 min.",
  },
  {
    key: "assessment",
    label: "Assessment",
    icon: <AssessmentIcon />,
    color: "bg-lime-100",
    type: "Assessment",
    time: "4 min.",
  },
];

function UnitSkeleton() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-backgroundLayout animate-pulse">
      <div className="w-full h-72 bg-gray-200 mb-8 rounded-xl" />
      <div className="w-2/3 h-10 bg-gray-200 rounded mb-4" />
      <div className="w-1/2 h-6 bg-gray-200 rounded mb-2" />
      <div className="w-1/3 h-4 bg-gray-200 rounded mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function UnitPage() {
  const { unitId } = useParams();
  const { theme: appTheme } = useTheme();

  const { data: unit, isLoading } = useQuery({
    queryKey: ["single-unit", unitId],
    queryFn: () => getUnitById(Number(unitId)),
  });

  if (isLoading || !unit) return <UnitSkeleton />;

  // Example lock logic (replace with real logic)
  const isLocked = unit.is_locked;
  // For demo, make the 5th activity active
  const activeIdx = 4;
  return (
    <div
      className="min-h-screen w-full bg-backgroundLayout bg-no-repeat h-full absolute"
      style={{
        backgroundImage: `url(${unit.covers?.[0]})`,
        backgroundPosition: !isMobile ? "0 120%" : "",
        backgroundSize: !isMobile ? "60% auto" : "100%",
      }}
    >
      {/* GradientOverlay */}
      <div
        className=""
        style={{
          backgroundImage:
            appTheme === "dark"
              ? !isMobile
                ? "linear-gradient(90deg,#c8c8c880,#000 50%,#000)"
                : "linear-gradient(180deg,#c8c8c880,#000 50%,#000)"
              : !isMobile
              ? "linear-gradient(90deg,#c8c8c880,#fff 50%,#fff)"
              : "linear-gradient(180deg,#c8c8c880,#fff 50%,#fff)",
          height: "100%",
          left: 0,
          overflow: "auto",
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 1,
        }}
      ></div>
      <div
        className="px-2 pt-8 pb-[200px] backdrop-grayscale-[70%] md:backdrop-grayscale-0 backdrop-blur-sm"
        style={{
          height: "100%",
          left: 0,
          right: 0,
          position: "absolute",
          overflow: "auto",
          top: 0,
          width: "100%",
          zIndex: 2,
        }}
      >
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="text-xs text-main font-bold mb-2">
              UNIT {unit.unit_id}
            </div>
            <h1 className="text-2xl font-extrabold text-main mb-1">
              {unit.title}
            </h1>
            <div className="text-base text-main mb-2">
              {unit.grammar_description}
            </div>
            <div className="text-sm text-main mb-2" dir="ltr">
              <div className="text-left">{unit.summary}</div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center text-xs text-main">
              <span>
                <span className="font-bold">کلمات جدید:</span> {unit.words}
              </span>
              <span>
                <span className="font-bold">لهجه:</span>{" "}
                {unit?.accents?.join(", ")}
              </span>
            </div>
          </div>
          {/* Activities */}
          <div className="flex flex-col gap-4">
            {activities.map((activity, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={activity.key}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-4 bg-backgroundMain border transition-all
                  ${
                    isActive
                      ? "border-2 border-primary shadow-lg"
                      : "border border-borderMain shadow-sm"
                  }
                  ${isLocked ? "opacity-60" : "hover:shadow-md"}`}
                >
                  {/* Left: Icon */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center text-2xl rounded-full mr-3`}
                  >
                    {activity.icon}
                  </div>
                  {/* Center: Title, Skill, Time */}
                  <div className="flex-1 flex flex-col items-start justify-center">
                    <div className="font-bold text-main text-base mb-1 flex items-center gap-2">
                      {activity.label}
                      <span className="text-xs text-gray400" dir="ltr">
                        ({activity.time || "4 min."})
                      </span>
                    </div>
                    <div className="text-xs text-primary font-medium">
                      {activity.type}
                    </div>
                  </div>
                  {/* Right: Lock icon if locked */}
                  {isLocked && (
                    <span className="ml-2 text-yellow-500">
                      <LockIcon size={22} />
                    </span>
                  )}
                  {/* Active: Start button at bottom center */}
                  {isActive && !isLocked && (
                    <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 z-10">
                      <button className="bg-primary text-white px-6 py-1.5 rounded-full shadow font-bold text-sm border-2 border-white">
                        شروع
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Unlock box */}
          {isLocked && (
            <div className="rounded-xl bg-yellow-50 border border-yellow-200 shadow px-6 py-5 flex items-center gap-4 mb-8">
              <span className="text-yellow-500">
                <LockIcon size={32} />
              </span>
              <div className="flex-1 text-yellow-900">
                Unlock all of the activities and much more.
                <br />
                <Link
                  href="/app/subscriptions"
                  className="font-bold text-yellow-700 hover:underline"
                >
                  Unlock →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
