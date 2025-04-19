"use client";

import { useAuth } from "@/hooks/use-auth";
import useThemeCreator from "@/hooks/use-theme";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { usePathname } from "next/navigation";
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
import { Badge, Button, Drawer, IconButton } from "@mui/material";
import Link from "next/link";
import { useLoginModal } from "@/store/use-login-modal";
import clsx from "clsx";
import PrimaryButton from "@/components/shared/PrimaryButton";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import { useTheme } from "next-themes";
import OutlineButton from "@/components/shared/OutlineButton";

interface IProps {
  open: boolean;
  toggleDrawerMenu: () => void;
}

const DrawerMenu = ({ open, toggleDrawerMenu }: IProps) => {
  const { theme }: { theme: any } = useThemeCreator();
  const { theme: appTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const { whoAmI, isGuest } = useAuth();

  const { t } = useTranslation();

  const [logoutModal, setLogoutModal] = useState(false);

  const toggle = () => {
    setLogoutModal((prev) => !prev);
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
          icon: <AutoAwesomeIcon className="!text-3xl" />,
          hide: !!whoAmI?.has_subscription,
        },
        {
          id: 2,
          title: t("containers.sidebar.Home"),
          link: `/public/home`,
          icon: <HomeOutlinedIcon className="!text-3xl" />,

          hide: false,
        },
        {
          id: 3,
          title: t("containers.sidebar.Bookmarks"),
          link: "/app/bookmarks",
          icon: <BookmarksOutlinedIcon className="!text-3xl" />,
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
          icon: <TheatersIcon className="!text-3xl" />,
          hide: false,
        },
        {
          id: 6,
          title: t("containers.sidebar.Animations"),
          link: `/public/animations`,
          icon: <BedroomBabyOutlinedIcon className="!text-3xl" />,
          hide: false,
        },
        {
          id: 7,
          title: t("containers.sidebar.Audio Book"),
          link: `/public/audio-book`,
          icon: <PlayLessonOutlinedIcon className="!text-3xl" />,
          hide: false,
        },
        {
          id: 17,
          title: t("containers.sidebar.Podcasts"),
          link: `/public/podcast-list`,
          icon: <PodcastsIcon className="!text-3xl" />,
          hide: isGuest || whoAmI?.userpreference?.preferred_language !== 2,
        },
        {
          id: 8,
          title: t("containers.sidebar.Music"),
          link: `/public/music-list`,
          icon: <QueueMusicOutlinedIcon className="!text-3xl" />,
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
          icon: <TranslateIcon className="!text-3xl" />,
          hide: isGuest || whoAmI?.userpreference?.preferred_language !== 2,
        },
        {
          id: 11,
          title: t("containers.sidebar.Grammers"),
          link: `/public/grammar-list`,
          icon: <AutoStoriesIcon className="!text-3xl" />,
          hide: isGuest || whoAmI?.userpreference?.preferred_language !== 2,
        },
        {
          id: 12,
          title: t("containers.sidebar.Review Words"),
          link: "/app/review",
          icon: <GradingIcon className="!text-3xl" />,
          hide: false,
        },
        {
          id: 13,
          title: t("containers.sidebar.Quiz"),
          link: "/app/quiz",
          icon: <QuizOutlinedIcon className="!text-3xl" />,
          hide: false,
        },
        {
          id: 14,
          title: t("containers.sidebar.Victionary"),
          link: "/app/dictionary",
          icon: <ScreenSearchDesktopIcon className="!text-3xl" />,
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
          icon: <PersonOutlineOutlinedIcon className="!text-3xl" />,
          hide: false,
        },
      ],
      hide: isGuest,
    },
  ];

  return (
    <Drawer
      dir="rtl"
      open={open}
      onClose={toggleDrawerMenu}
      anchor={theme.direction === "rtl" ? "right" : "left"}
      className="[&_.MuiDrawer-paper]:h-[100vh] md:[&_.MuiDrawer-paper]:w-full [&_.MuiDrawer-paper]:w-[80%] [&_.MuiDrawer-paper]:max-w-[472px] [&_.MuiDrawer-paper]:bg-backgroundMain [&_.MuiDrawer-paper]:rounded-tl-3xl [&_.MuiDrawer-paper]:rounded-bl-3xl [&_.MuiDrawer-paper]:border-l-4 [&_.MuiDrawer-paper]:border-primary"
    >
      <div className="w-64 bg-bgDefault h-full p-4" dir="rtl">
        <nav className="flex flex-col gap-4 pb-20">
          {sidebarItems?.map((item) => (
            <div key={item.id} className="mb-2">
              <h3 className="text-gray400 text-base font-medium mb-2">
                {item.title}
              </h3>
              <ul className="">
                {item.items?.map((node) => (
                  <li
                    key={node.id}
                    className={`py-2.5 rounded-lg transition-colors ${
                      pathname === node.link
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={toggleDrawerMenu}
                  >
                    <Link
                      href={node.link}
                      className="flex items-center gap-2 text-main hover:text-primary"
                    >
                      {node.icon}
                      <span className="text-lg font-medium">{node.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <li className="list-none flex items-center gap-2">
            <IconButton
              onClick={() => setTheme(appTheme === "dark" ? "light" : "dark")}
              aria-label="change-theme"
              sx={{ color: theme.palette.text.main }}
            >
              {appTheme === "dark" ? (
                <NightsStayIcon className="!text-neutral-200" />
              ) : (
                <LightModeIcon className="!text-yellow-500" />
              )}
            </IconButton>

            <span className="text-main">تغییر تم</span>
          </li>

          {/* Guest Links */}
          <div className="mt-4 space-y-4">
            <Link href="/public/download-app">
              <OutlineButton fullWidth className="!h-11 block w-full">
                دانلود اپ
              </OutlineButton>
            </Link>
            {isGuest ? (
              <Link href="/login" className="!h-11 block w-full">
                <PrimaryButton className="w-full">ورود | ثبت نام</PrimaryButton>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </nav>

        {/* {logoutModal && <LogoutModal open={logoutModal} onClose={toggle} />} */}
      </div>
    </Drawer>
  );
};

export default DrawerMenu;
