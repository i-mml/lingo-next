import axios from "axios";
import { CmsBannerItem, CmsCatalogList } from "../types/cms";
import axiosAuth from "../configs/axiosAuth";

export const GetCmsByContentType = async (
  contentType: number,
  token?: string
) => {
  let url = `/cms/catalog?content_type=${contentType}`;

  const response = await axiosAuth.get(
    url,
    !!token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {}
  );
  return response.data as CmsCatalogList[];
};

export const GetCmsByBanner = async (contentType: number, token?: string) => {
  let url = `/cms/banner?content_type=${contentType}`;

  const response = await axiosAuth.get(
    url,
    !!token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {}
  );

  return response.data as CmsBannerItem[];
};
