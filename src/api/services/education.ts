import axiosInstance from "../configs";
import axiosAuth from "../configs/axiosAuth";
import { VocabularyListItem } from "../types/education";

export const GetEducationStatistics = async () => {
  const response = await axiosInstance.get("/education/statistics/");

  return response;
};

// grammar
export const GetEducationGrammarById = async (grammarId: number) => {
  const response = await axiosInstance.get(`/education/grammars/${grammarId}`);

  return response;
};

export const GetEducationGrammarTopicsById = async (
  grammarId: number,
  subcategoryId: number
) => {
  const response = await axiosInstance.get(
    `/education/grammars/${grammarId}/subcategories/${subcategoryId}/topics`
  );

  return response;
};
export const GetEducationGrammars = async (search?: string, token?: string) => {
  let url = "/education/grammars/";

  const response = await axiosAuth.get(
    url,
    !!token
      ? {
          params: {
            search: search || "",
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {
          params: {
            search: search || "",
          },
        }
  );

  return response.data;
};

// Vocabulary
export const getVocabularyList = async (token?: string) => {
  let url = `/education/categories/`;

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

  return response.data as VocabularyListItem[];
};
export const getVocabularyLessonsByCategoryId = async (
  category_id: number,
  params: { page_size: number; page: number },
  token?: string
) => {
  let url = `/education/categories/${category_id}/lessons/`;

  const response = await axiosAuth.get(
    url,
    !!token
      ? {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : { params }
  );

  return response.data;
};
export const getEducationLessonById = async (
  lesson_id: number,
  token?: string
) => {
  let url = `/education/lessons/${lesson_id}/`;

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
export const PostEducationLessonCompleteByLessonId = async (
  lesson_id: number,
  body: {
    completed: boolean;
  }
) => {
  const response = await axiosInstance.post(
    `/education/lessons/${lesson_id}/complete/`,
    body
  );
  return response.data;
};

// speech
export const PostEducationSpeechSimilarity = async (body: {
  target_text: string;
  voice_text: string;
}) => {
  const response = await axiosInstance.post(
    "/education/speach-similarity/",
    body
  );
  return response.data;
};
