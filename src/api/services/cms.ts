import { CmsBannerItem, CmsCatalogList } from "../types/cms";
import axiosAuth from "../configs/axiosAuth";
import axiosInstance from "../configs";

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

export const GetCmsLanguage = async () => {
  const response = await axiosInstance.get("/cms/language/");

  return response;
};
export const GetCmsMovies = async (search?: string) => {
  const response = await axiosInstance
    .get(`/cms/movies?search=${search}`)
    .then((res) => res?.data);

  return response;
};
export const getCmsSearch = async (search?: string) => {
  const response = await axiosInstance.get(`/cms/search/?q=${search}`);

  return response;
};

export const PostFlashcards = async (params: any) => {
  const response = await axiosInstance.post("/education/flashcards", params);

  return response;
};

export const getCmsDictionary = async (word: string) => {
  const response = await axiosInstance.get(
    `/cms/dictionary?word=${word}&query_type=exact`
  );

  return response;
};
