"use client";

import LightModeIcon from "@mui/icons-material/LightMode";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, IconButton } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import GraduationIcon from "@/assets/graduation.svg";
import ToLearnIcon from "@/assets/to-learn.svg";
import { useTranslation } from "react-i18next";
import { useLoginModal } from "@/store/use-login-modal";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import AppHeaderItem from "./AppHeaderItem";
import OutlineButton from "@/components/shared/OutlineButton";
import HeaderChangeLanguageMenu from "./HeaderChangeLanguageMenu";
import useThemeCreator from "@/hooks/use-theme";
import { useTheme } from "next-themes";
import Image from "next/image";
import DrawerMenu from "./DrawerMenu";
import SearchModal from "@/components/modals/SearchModal";
import XpIcon from "@/assets/xp.svg";
import { GetGamificationStats } from "@/api/services/gamification";
import CoinsIcon from "@/assets/coins.svg";

const AppHeader: React.FC = () => {
  const { t: translate } = useTranslation();
  const { theme: appTheme, setTheme } = useTheme();
  const { toggleLoginModal } = useLoginModal();
  const { whoAmI, isGuest } = useAuth();
  const { theme }: any = useThemeCreator();
  const pathname = usePathname();

  const { data, isLoading } = useQuery({
    queryKey: ["get-gamification-stats"],
    queryFn: GetGamificationStats,
    enabled: !isGuest && !!whoAmI?.userpreference?.preferred_language,
  });
  const [openDrawerMenu, setOpenDrawerMenu] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const toggleDrawerMenu = () => setOpenDrawerMenu((prev) => !prev);
  const toggleSearchModal = () => setSearchModal((prev) => !prev);

  return (
    <header className="fixed right-0 left-0 w-full md:w-full lg:w-[calc(100%-200px)] bg-backgroundLayout md:h-24 border-b-0 md:border-b-2 border-borderMain transition-transform duration-300 ease-in-out z-[200] flex items-center">
      <div className="hidden w-full items-center justify-between px-5 md:flex">
        {isLoading ? (
          <CircularProgress />
        ) : (
          !isGuest && (
            <div className="left flex items-center text-main-text">
              {!!data?.xp && (
                <div className="flex items-center">
                  <Link href="/app/leader-board">
                    <AppHeaderItem
                      icon={<XpIcon className="w-8 h-8" />}
                      title={"امتیاز"}
                      color="var(--xp)"
                      value={`${Number(data?.xp / 1000).toFixed(1)}K`}
                    />
                  </Link>
                  <Link href="/app/leader-board">
                    <AppHeaderItem
                      icon={<CoinsIcon className="w-8 h-8" />}
                      title={"سکه"}
                      color="var(--coins)"
                      value={`${Number(data?.coins / 1000).toFixed(1)}K`}
                    />
                  </Link>
                </div>
              )}
            </div>
          )
        )}

        <div className="right flex items-center justify-end flex-1 gap-4">
          {!!whoAmI?.userpreference?.preferred_language && (
            <HeaderChangeLanguageMenu />
          )}

          <Link href="/public/download-app" className="w-22 block mr-4">
            <div className="text-main text-lg font-medium">دانلود اپ</div>
          </Link>

          <Link href="/public/how-to-use" className="mx-4 block">
            <div className="text-main text-lg font-medium">نحوه استفاده</div>
          </Link>

          <IconButton
            onClick={() => setTheme(appTheme === "dark" ? "light" : "dark")}
            aria-label="change-theme"
            sx={{ color: theme.palette.text.main }}
          >
            {appTheme === "dark" ? (
              <NightsStayIcon className="text-gray-400" />
            ) : (
              <LightModeIcon className="text-orange-400" />
            )}
          </IconButton>

          <div
            onClick={toggleSearchModal}
            className="catalog-filter cursor-pointer mr-3 flex items-center w-1/4 min-w-[150px] bg-main-background rounded-full border border-borderMain h-12 px-4"
          >
            <SearchIcon sx={{ color: theme.palette.text.gray400 }} />
            <div className="catalog-filter-input text-gray400 text-base ml-2">
              {translate("pages.catalog.Search Placeholder")}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="app-header-mobile w-full px-[4.4%] pt-4 pb-2 block md:hidden">
        <div className="mobile-header-top flex w-full items-center justify-between">
          <div className="w-[30%] flex items-center gap-2">
            <button onClick={toggleDrawerMenu}>
              <MenuOpenIcon className="!text-main !w-8 !h-8" />
            </button>
            <button onClick={toggleSearchModal}>
              <SearchIcon className="!text-main !w-8 !h-8" />
            </button>
          </div>

          <Image
            src="/zabano-main-logo.png"
            alt="main logo"
            width={56}
            height={56}
            className="w-14 h-14 rounded-xl bg-primary"
          />

          {isGuest ? (
            <OutlineButton
              className="w-[30%] h-11 p-0"
              onClick={toggleLoginModal}
              sx={{ borderColor: theme.palette.border.main }}
            >
              ورود | ثبت نام
            </OutlineButton>
          ) : (
            <Link href="/public/download-app" className="w-[30%] block">
              <OutlineButton className="w-full h-11 p-0">
                دانلود اپ
              </OutlineButton>
            </Link>
          )}
        </div>

        {!isLoading && !isGuest && (
          <div className="mobile-header-bottom flex items-center justify-between w-full mt-2">
            {!!data?.xp && (
              <div
                className={clsx(
                  "flex items-center gap-3",
                  !pathname?.includes("/public/home")
                    ? "w-full justify-between"
                    : ""
                )}
              >
                <Link href="/app/leader-board">
                  <AppHeaderItem
                    icon={<CoinsIcon className="!w-6 !h-6" />}
                    color="var(--coins)"
                    value={`${Number(data?.coins / 1000).toFixed(1)}K سکه‌`}
                  />
                </Link>
                <Link href="/app/leader-board">
                  <AppHeaderItem
                    icon={<XpIcon className="!w-6 !h-6" />}
                    color="var(--xp)"
                    value={`${Number(data?.xp / 1000).toFixed(1)}K امتیاز`}
                  />
                </Link>
              </div>
            )}
            {!!whoAmI?.userpreference?.preferred_language &&
              pathname?.includes("/public/home") && (
                <HeaderChangeLanguageMenu />
              )}
          </div>
        )}
      </div>

      {openDrawerMenu && (
        <DrawerMenu open={openDrawerMenu} toggleDrawerMenu={toggleDrawerMenu} />
      )}
      {searchModal && (
        <SearchModal open={searchModal} toggleModal={toggleSearchModal} />
      )}
    </header>
  );
};

export default AppHeader;
