import {
  getEducationLessonById,
  getVocabularyList,
} from "@/api/services/education";
import { VocabularyListItem } from "@/api/types/education";
import VocabularyLessonView from "@/views/vocabularyLesson";
import { cookies } from "next/headers";
import React from "react";

const VocabularyByLesson = async ({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) => {
  const { id, lessonId } = await params;

  const accessToken = (await cookies()).get("zabano-access-token")?.value;

  const vocabularyWords = await getEducationLessonById(
    Number(lessonId),
    accessToken
  );

  const vocabularies = await getVocabularyList(accessToken);
  const currentVocabulary = vocabularies?.find(
    (item: VocabularyListItem) => item?.id === Number(id)
  );

  return (
    <VocabularyLessonView
      categoryId={Number(id)}
      lessonId={Number(lessonId)}
      currentVocabulary={currentVocabulary as VocabularyListItem}
      data={vocabularyWords}
    />
  );
};

export default VocabularyByLesson;
