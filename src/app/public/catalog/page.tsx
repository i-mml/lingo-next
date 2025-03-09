import { GetCmsByContentType } from "@/api/services/cms";
import CatalogView from "@/views/catalog";
import React from "react";

const CatalogPage = async () => {
  const response = await GetCmsByContentType(1);
  console.log(response);
  return <CatalogView />;
};

export default CatalogPage;
