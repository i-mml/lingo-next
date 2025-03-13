"use client";

import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BedroomBabyOutlinedIcon from "@mui/icons-material/BedroomBabyOutlined";
import PlayLessonOutlinedIcon from "@mui/icons-material/PlayLessonOutlined";
import QueueMusicOutlinedIcon from "@mui/icons-material/QueueMusicOutlined";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import TranslateIcon from "@mui/icons-material/Translate";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TheatersIcon from "@mui/icons-material/Theaters";
import GradingIcon from "@mui/icons-material/Grading";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Image from "next/image";
import { Badge, Button } from "@mui/material";
import Link from "next/link";
import { useLoginModal } from "@/store/useLoginModal";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Sidebar = () => {
  const pathname = usePathname();
  const { whoAmI, isGuest } = useAuth();

  const { t } = useTranslation();

  const { toggleLoginModal } = useLoginModal();
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(false);
  };

  const sidebarItems = [
    {
      title: "",
      id: 0,
      items: [
        {
          id: 1,
          title: t("containers.sidebar.Subscriptions"),
          link: "/app/subscriptions",
          icon: <AutoAwesomeIcon />,
          hide: !!whoAmI?.has_subscription,
        },
        {
          id: 2,
          title: t("containers.sidebar.Home"),
          link: `/public/home`,
          icon: <HomeOutlinedIcon />,

          hide: false,
        },
        {
          id: 3,
          title: t("containers.sidebar.Bookmarks"),
          link: "/app/bookmarks",
          icon: <BookmarksOutlinedIcon />,
          hide: isGuest,
        },
      ],
    },
    {
      title: t("containers.sidebar.Category"),
      id: 4,
      items: [
        {
          id: 5,
          title: t("containers.sidebar.Movie and Series"),
          link: `/public/catalog`,
          icon: <TheatersIcon />,
          hide: false,
        },
        {
          id: 6,
          title: t("containers.sidebar.Animations"),
          link: `/public/animations`,
          icon: <BedroomBabyOutlinedIcon />,
          hide: false,
        },
        {
          id: 7,
          title: t("containers.sidebar.Audio Book"),
          link: `/public/audio-book`,
          icon: <PlayLessonOutlinedIcon />,
          hide: false,
        },
        {
          id: 8,
          title: t("containers.sidebar.Music"),
          link: `/public/music-list`,
          icon: <QueueMusicOutlinedIcon />,
          hide: isGuest || whoAmI?.userpreference?.preferred_language !== 2,
        },
      ],
      hide: false,
    },
    {
      title: t("containers.sidebar.Learning"),
      id: 9,
      items: [
        {
          id: 10,
          title: t("containers.sidebar.Vocabulary"),
          link: "/public/vocabulary",
          icon: <TranslateIcon />,
          hide: isGuest || whoAmI?.userpreference?.preferred_language !== 2,
        },
        {
          id: 11,
          title: t("containers.sidebar.Grammers"),
          link: `/public/grammar-list`,
          icon: <AutoStoriesIcon />,
          hide: isGuest || whoAmI?.userpreference?.preferred_language !== 2,
        },
        {
          id: 12,
          title: t("containers.sidebar.Review Words"),
          link: "/app/review",
          icon: <GradingIcon />,
          hide: false,
        },
        {
          id: 13,
          title: t("containers.sidebar.Quiz"),
          link: "/app/quiz",
          icon: <QuizOutlinedIcon />,
          hide: false,
        },
        {
          id: 14,
          title: t("containers.sidebar.Victionary"),
          link: "/app/dictionary",
          icon: <ScreenSearchDesktopIcon />,
          hide: false,
        },
      ],
      hide: isGuest,
    },
    {
      title: t("containers.sidebar.User"),
      id: 15,
      items: [
        {
          id: 16,
          title: t("containers.sidebar.Account"),
          link: "/app/account",
          icon: <PersonOutlineOutlinedIcon />,
          hide: false,
        },
      ],
      hide: isGuest,
    },
  ];

  return (
    <div
      className="flex-1 w-[236px] md:w-[180px] hidden lg:block sticky left-0 top-0 z-[99] bg-backgroundMain min-h-[100vh] px-4 py-6"
      style={{
        boxShadow: "7px 0 12px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <Image
        alt="logo"
        src="/zabano-main-logo.png"
        className="!block w-[74px] h-[74px] rounded-xl bg-primary mx-auto"
        width={74}
        height={74}
      />

      <nav>
        {sidebarItems
          ?.filter((node) => !node?.hide)
          ?.map((item) => (
            <div key={item?.id} className="mt-4">
              <div className="text-gray400 text-[16px] font-bold pr-3 mb-2">
                {item?.title}
              </div>

              <ul className="p-0 m-0">
                {item?.items
                  ?.filter((linkItem: any) => !linkItem?.hide)
                  ?.map((node: any) => (
                    <li
                      key={node?.id}
                      className={`py-2 px-3 flex items-center list-none text-main rounded-xl transition-all hover:bg-backgroundDisabled ${
                        pathname === node?.link
                          ? "!text-backgroundMain !bg-main font-bold opacity-100"
                          : ""
                      }`}
                      onClick={node?.action || function () {}}
                    >
                      <Badge
                        overlap="rectangular"
                        variant="dot"
                        classes={{
                          dot: node?.hasBadge ? "bg-primary" : "bg-none",
                        }}
                      >
                        <span
                          className={clsx(
                            "text-[25px] !leading-[0]",
                            pathname === node?.link
                              ? "!text-backgroundMain"
                              : "text-main"
                          )}
                        >
                          {node?.icon}
                        </span>
                        {!node?.action ? (
                          <Link
                            href={node?.link}
                            className={clsx(
                              "no-underline font-bold cursor-pointer text-main mr-2.5",
                              pathname === node?.link
                                ? "!text-backgroundMain"
                                : "text-main"
                            )}
                          >
                            {node?.title}
                          </Link>
                        ) : (
                          <div className="list-link">{node?.title}</div>
                        )}
                      </Badge>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        {isGuest && (
          <Button className="w-full" onClick={toggleLoginModal}>
            ورود | ثبت نام
          </Button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
