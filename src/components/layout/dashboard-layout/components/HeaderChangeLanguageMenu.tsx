"use client";

import { GetCmsLanguage } from "@/api/services/cms";
import { PostUserPreferences } from "@/api/services/user-preferences";
import WaveLoading from "@/components/shared/WaveLoading";
import { useAuth } from "@/hooks/use-auth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Menu, MenuItem } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

const HeaderChangeLanguageMenu = () => {
  const { whoAmI } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { data, isLoading } = useQuery({
    queryKey: ["get-cms-languages"],
    queryFn: GetCmsLanguage,
    enabled: open,
  });

  const currentLang = useMemo(
    () =>
      data?.data?.find(
        (node: any) => whoAmI?.userpreference?.preferred_language === node.id
      ),
    [data?.data, whoAmI?.userpreference?.preferred_language]
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userPreferanceMutate = useMutation({
    mutationFn: PostUserPreferences,
    mutationKey: ["update-language-header"],
    onSuccess: () => {
      handleClose();
      toast.success("ویرایش زبان با موفقیت انجام شد.");
      queryClient.invalidateQueries();
      queryClient.removeQueries();
      router.push("/public/home");
    },
  });

  const handleChangeLanguage = (preferred_language: number) => {
    userPreferanceMutate.mutate({
      preferred_language,
      knowledge_level: whoAmI?.userpreference?.knowledge_level,
    });
  };

  return (
    <div className="p-1 mr-auto cursor-pointer">
      <div
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="flex items-center gap-2 text-main"
      >
        <ArrowDropDownIcon
          className={clsx(
            `!text-main`,
            open ? "rotate-180 transition-all" : ""
          )}
        />
        {currentLang?.code ||
          whoAmI?.userpreference?.preferred_language_display?.code ||
          ""}
        {currentLang?.icon ||
        whoAmI?.userpreference?.preferred_language_display?.icon ? (
          <Image
            src={
              currentLang?.icon ||
              whoAmI?.userpreference?.preferred_language_display?.icon ||
              ""
            }
            width={28}
            height={28}
            className="w-7 h-7 rounded-full"
            alt={currentLang?.code || "current language code"}
          />
        ) : (
          <></>
        )}
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {isLoading ? (
          <MenuItem
            onClick={() => {}}
            className="flex items-center gap-2 text-main"
            disabled
          >
            <WaveLoading />
          </MenuItem>
        ) : data?.data?.length > 0 ? (
          data?.data?.map((item: any) => (
            <MenuItem
              key={item?.id}
              onClick={() => handleChangeLanguage(item?.id)}
              className="flex items-center gap-2 text-main"
              disabled={
                whoAmI?.userpreference?.preferred_language === item?.id ||
                userPreferanceMutate.isPending
              }
            >
              <Image
                width={28}
                height={28}
                src={item?.icon || ""}
                className="w-7 h-7 rounded-full"
                alt={item?.name || "language name"}
              />
              {whoAmI?.userpreference?.preferred_language !== item?.id &&
              userPreferanceMutate.isPending ? (
                <WaveLoading />
              ) : (
                <span>{item.name}</span>
              )}
            </MenuItem>
          ))
        ) : (
          <MenuItem
            onClick={() => {}}
            className="flex items-center gap-2 text-main"
            disabled
          ></MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default HeaderChangeLanguageMenu;
