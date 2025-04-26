import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";
import { contentTypeInfos } from "@/constants/content-types-infos";
import { ContentType } from "@/views/catalog/types";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { languageDictionaryByCode } from "@/constants/locales";
import { useAuth } from "@/hooks/use-auth";

const VideoInfoBreadcrumbs = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const { isGuest } = useAuth();

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const language =
    languageDictionaryByCode?.[
      data?.language as keyof typeof languageDictionaryByCode
    ]?.language;

  return (
    <div role="presentation" className="my-4">
      <Breadcrumbs aria-label="breadcrumb" className="!text-main">
        <Link
          underline="hover"
          className="flex items-center gap-1 "
          color="inherit"
          href="/"
        >
          <HomeIcon className="!text-main !text-2xl" />
          <span className="text-main">{t("containers.sidebar.Home")}</span>
        </Link>
        <Link
          underline="hover"
          className="flex items-center gap-1"
          color="inherit"
          href={`${isGuest ? `/${language}` : ""}/public/${
            contentTypeInfos[data?.content_type as ContentType]?.listRoute
          }`}
        >
          <MovieCreationIcon className="!text-main !text-2xl" />
          <span className="text-main">
            {`${contentTypeInfos[data?.content_type as ContentType]?.title}`} ها
            {`ی ${
              languageDictionaryByCode?.[
                data?.language as keyof typeof languageDictionaryByCode
              ]?.persian
            }
            `}
          </span>
        </Link>
        <Typography
          sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
        >
          {data?.title}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default VideoInfoBreadcrumbs;
