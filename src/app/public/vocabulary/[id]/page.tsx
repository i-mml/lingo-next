import {
  getVocabularyLessonsByCategoryId,
  getVocabularyList,
} from "@/api/services/education";
import { VocabularyListItem } from "@/api/types/education";
import SingleVocabularyView from "@/views/singleVocabulary";
import { cookies } from "next/headers";
import React from "react";

const SingleVocabularyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const accessToken = (await cookies()).get("zabano-access-token")?.value;

  const vocabularies = await getVocabularyList(accessToken);
  getVocabularyLessonsByCategoryId;
  const lessonsList = await getVocabularyLessonsByCategoryId(
    Number(id),
    { page_size: 50, page: 1 },
    accessToken
  );

  const currentVocabulary = vocabularies?.find(
    (item: VocabularyListItem) => item?.id === Number(id)
  );

  return (
    <SingleVocabularyView
      currentVocabulary={currentVocabulary as any}
      categoryId={Number(id)}
      lessonsList={lessonsList?.results}
    />
  );
};

export default SingleVocabularyPage;
