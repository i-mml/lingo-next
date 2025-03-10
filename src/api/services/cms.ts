import axiosInstance from "../configs";
import { CmsBannerItem, CmsCatalogList } from "../types/cms";

export const GetCmsByContentType = async (contentType: number) => {
  let url = `https://api.zabano.com/api/cms/catalog?content_type=${contentType}`;

  const response = await axiosInstance.get(url);
  return response.data as CmsCatalogList[];
};

export const GetCmsByBanner = async (contentType: number) => {
  let url = `/cms/banner?content_type=${contentType}`;

  const response = await axiosInstance.get(url);

  return response.data as CmsBannerItem[];
};
