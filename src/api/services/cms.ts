import { CmsBannerItem, CmsCatalogList } from "../types/cms";
import axiosAuth from "../configs/axiosAuth";
import axiosInstance from "../configs";

export const GetCmsByContentType = async (
  contentType: number,
  token?: string,
  lang_id?: number
) => {
  let url = `/cms/catalog?content_type=${contentType}${
    lang_id ? `&lang_id=${lang_id}` : ""
  }`;

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

export const GetCmsByBanner = async (
  contentType: number,
  token?: string,
  lang_id?: number
) => {
  let url = `/cms/banner?content_type=${contentType}${
    lang_id ? `&lang_id=${lang_id}` : ""
  }`;

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

export const GetMovieFlashCard = async (param: string) => {
  const response = await axiosInstance
    .get(`education/flashcards${param}`)
    .then((res) => res?.data);

  return response;
};

export const getCmsDictionary = async (word: string) => {
  const response = await axiosInstance.get(
    `/cms/dictionary?word=${word}&query_type=exact`
  );

  return response;
};

export const getCmsEpisodeSearch = async (search: string) => {
  const response = await axiosInstance.get(
    `/cms/episodes/${search !== "" ? `?search=${search}` : ""}`
  );

  return response;
};

export const GetMovieDetailData = async (id: string, token?: string) => {
  let url = `/cms/movie/${id}/preview-detail/`;

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

  return response.data;
};

export const GetMovieData = async (id: string, token?: string) => {
  let url = `/cms/movie/${id}`;

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

  return response.data;
};

export const GetMovieDataInApp = async (id: string, token?: string) => {
  const response = await axiosInstance.get(`/cms/movie/${id}`);

  return response.data;
};

export const fetchCaptions = async (subtitleFileUrl: string) => {
  const response = await axiosInstance.get(subtitleFileUrl);

  return response?.data;
};

export const GetGrammerText = async (text: string) => {
  const response = await axiosInstance
    .get(`/cms/grammar-detect/?s=${text}`)
    .then((res) => res?.data);

  return response;
};

export const getSentenceGrammar = async (sentence: string) => {
  const response = await axiosInstance.get(
    `/cms/grammar-detect/?s=${sentence}`
  );
  return response;
};
export const PostCmsWordIssues = async (params: {
  description: string;
  is_review: boolean;
  sentencedetail: any;
  word: number;
}) => {
  const response = await axiosInstance
    .post("/cms/wordIssues/", params)
    .then((res) => res?.data);

  return response;
};
