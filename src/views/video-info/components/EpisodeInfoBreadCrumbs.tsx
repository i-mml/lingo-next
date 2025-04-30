"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";
import { contentTypeInfos } from "@/constants/content-types-infos";
import { ContentType } from "@/views/catalog/types";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { languageDictionaryByCode } from "@/constants/locales";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import AbcIcon from "@mui/icons-material/Abc";

const EpisodeInfoBreadCrumbs = ({ episodeInfo }: { episodeInfo: any }) => {
  const { isGuest } = useAuth();
  const language =
    languageDictionaryByCode?.[
      episodeInfo?.movie?.language as keyof typeof languageDictionaryByCode
    ]?.language;

  return (
    <div className="mb-6">
      <Breadcrumbs aria-label="breadcrumb" className="!text-main">
        <Link className="flex items-center gap-1" href="/" prefetch={false}>
          <HomeIcon className="!text-main !text-2xl" />
          <span className="text-main">خانه</span>
        </Link>
        <Link
          className="flex items-center gap-1"
          color="inherit"
          href={`${isGuest ? `/${language}` : ""}/public/${
            contentTypeInfos[episodeInfo?.movie?.content_type as ContentType]
              ?.listRoute
          }`}
        >
          <MovieCreationIcon className="!text-main !text-2xl" />
          <span className="text-main">
            {`${
              contentTypeInfos[episodeInfo?.movie?.content_type as ContentType]
                ?.title
            }`}{" "}
            ها
            {`ی ${
              languageDictionaryByCode?.[
                episodeInfo?.movie
                  ?.language as keyof typeof languageDictionaryByCode
              ]?.persian
            }
          `}
          </span>
        </Link>
        <Link
          className="flex items-center gap-1"
          href={`/public/${
            contentTypeInfos[episodeInfo?.movie?.content_type as ContentType]
              ?.route
          }/${episodeInfo?.movie?.id}`}
          prefetch={false}
        >
          <AbcIcon className="!text-main !text-3xl" />
          <span className="text-main">
            {episodeInfo?.movie?.title || "محتوای آموزشی"}
          </span>
        </Link>
        <Typography className="flex items-center text-main" component="span">
          {episodeInfo?.name || "قسمت"}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default EpisodeInfoBreadCrumbs;
