"use client";

import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BedroomBabyOutlinedIcon from "@mui/icons-material/BedroomBabyOutlined";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import QueueMusicOutlinedIcon from "@mui/icons-material/QueueMusicOutlined";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import TranslateIcon from "@mui/icons-material/Translate";
import useThemeCreator from "@/hooks/useTheme";
import HomeIcon from "@mui/icons-material/Home";
import TheatersIcon from "@mui/icons-material/Theaters";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import GradingIcon from "@mui/icons-material/Grading";
import QuizIcon from "@mui/icons-material/Quiz";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Image from "next/image";
import { Badge, Button } from "@mui/material";
import Link from "next/link";
import { useLoginModal } from "@/store/useLoginModal";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import clsx from "clsx";

const Sidebar = () => {
  const pathname = usePathname();
  const { whoAmI, isGuest } = useAuth();
  const { theme }: any = useThemeCreator();
  const { t } = useTranslation();
  const { theme: themeType } = useTheme();
  console.log(themeType);
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
        !whoAmI?.has_subscription && {
          id: 7,
          title: t("containers.sidebar.Subscriptions"),
          link: "/app/subscriptions",
          icon: <AutoAwesomeIcon />,
        },
        {
          id: 1,
          title: t("containers.sidebar.Home"),
          link: `/public/home`,
          icon: <HomeIcon />,
        },
        !isGuest && {
          id: 2,
          title: t("containers.sidebar.Bookmarks"),
          link: "/app/bookmarks",
          icon: <BookmarksIcon />,
        },
      ],
    },
    {
      title: t("containers.sidebar.Category"),
      id: 1,
      items: [
        {
          id: 1,
          title: t("containers.sidebar.Movie and Series"),
          link: `/public/catalog`,
          icon: <TheatersIcon />,
        },
        {
          id: 11,
          title: t("containers.sidebar.Animations"),
          link: `/public/animations`,
          icon: <BedroomBabyOutlinedIcon />,
        },
        (!!isGuest || whoAmI?.userpreference?.preferred_language === 2) && {
          id: 4,
          title: t("containers.sidebar.Audio Book"),
          link: `/public/audio-book`,

          icon: <PlayLessonIcon />,
        },
        (!!isGuest || whoAmI?.userpreference?.preferred_language === 2) && {
          id: 10,
          title: t("containers.sidebar.Music"),
          link: `/public/music-list`,
          icon: <QueueMusicOutlinedIcon />,
        },
      ],
    },
    !isGuest && {
      title: t("containers.sidebar.Learning"),
      id: 2,
      items: [
        !isGuest &&
          whoAmI?.userpreference?.preferred_language === 2 && {
            id: 9,
            title: t("containers.sidebar.Vocabulary"),
            link: "/public/vocabulary",
            icon: <TranslateIcon />,
          },
        !isGuest &&
          whoAmI?.userpreference?.preferred_language === 2 && {
            id: 5,
            title: t("containers.sidebar.Grammers"),
            link: `/public/grammar-list`,
            icon: <AutoStoriesIcon />,
          },
        {
          id: 2,
          title: t("containers.sidebar.Review Words"),
          link: "/app/review",
          icon: <GradingIcon />,
        },
        {
          id: 6,
          title: t("containers.sidebar.Quiz"),
          link: "/app/quiz",
          icon: <QuizIcon />,
        },
        {
          id: 8,
          title: t("containers.sidebar.Victionary"),
          link: "/app/dictionary",
          icon: <ScreenSearchDesktopIcon />,
        },
      ],
    },
    !isGuest && {
      title: t("containers.sidebar.User"),
      id: 3,
      items: [
        {
          id: 3,
          title: t("containers.sidebar.Account"),
          link: "/app/account",
          icon: <PersonOutlineOutlinedIcon />,
        },
      ],
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
        {sidebarItems?.map((item: any) => (
          <div key={item?.id} className="mt-4">
            <div className="text-gray400 text-[16px] font-bold pr-3 mb-2">
              {item?.title}
            </div>

            <ul className="p-0 m-0">
              {item?.items
                ?.filter((linkItem: any) =>
                  isGuest ? linkItem?.link?.includes("public") : linkItem
                )
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
