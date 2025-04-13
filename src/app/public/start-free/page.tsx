"use client";

import { GetCmsByBanner, GetCmsByContentType } from "@/api/services/cms";
import CatalogView from "@/views/catalog";
import React from "react";

const StartFreePage = async () => {
  const catalogs = await GetCmsByContentType(1);
  const banners = await GetCmsByBanner(1);

  return (
    <>
      <CatalogView catalogData={catalogs} banners={banners} isFreeOnly />
    </>
  );
};

export default StartFreePage;
