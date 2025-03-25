"use client";

import TranslateIcon from "@mui/icons-material/Translate";
import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { PostEducationLessonCompleteByLessonId } from "@/api/services/education";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { LessonWord, VocabularyListItem } from "@/api/types/education";
import Image from "next/image";
import OutlineButton from "@/components/shared/OutlineButton";
import PrimaryButton from "@/components/shared/PrimaryButton";
import VocabularyWordListItem from "./components/VocabularyWordListItem";

const VocabularyLessonView = ({
  categoryId,
  lessonId,
  currentVocabulary,
  data,
}: {
  categoryId: number;
  lessonId: number;
  currentVocabulary: VocabularyListItem;
  data: {
    words: LessonWord[];
    title: string;
  };
}) => {
  const router = useRouter();
  const [isBlurred, setIsBlurred] = useState(true);

  const lessonCompleteMutation = useMutation({
    mutationFn: (body: any) =>
      PostEducationLessonCompleteByLessonId(lessonId, body),
    mutationKey: ["complete-vocabulary-lesson-by-id"],
    onSuccess: () => {
      toast.success("وضعیت این درس به کامل شده تغیر یافت.");
      router.push(`/public/vocabulary/${categoryId}`);
    },
  });

  const handleFinishLesson = async () => {
    lessonCompleteMutation.mutate({
      completed: true,
    });
  };

  return (
    <div className={`min-h-[80vh] md:min-h-[60vh] py-10 gap-6 px-[5%]`}>
      <BackIconComponent
        className="mb-4"
        clickHandler={() => router.push(`/public/vocabulary/${categoryId}`)}
      />
      <div className="flex items-center gap-4 mb-6">
        <Image
          alt={currentVocabulary?.title}
          src={currentVocabulary?.image}
          className="w-[98px] h-[157.5px] md:w-[105.6px] md:h-[200px] rounded-lg object-cover"
        />
        <div>
          <div className="text-main text-xl md:text-2xl text-left font-bold">
            {data?.title || ""}
          </div>
          <div className="flex items-center h-14 text-main">
            <Checkbox
              className="[&_.MuiSvgIcon-root]:fill-primary"
              checked={!isBlurred}
              onChange={() => setIsBlurred((prev) => !prev)}
            />
            <TranslateIcon className="text-3xl" />
            <span className="pr-2">نمایش ترجمه</span>
          </div>
          <OutlineButton
            onClick={() =>
              router.push(`/app/quiz/${lessonId}/${lessonId}?isVocabulary=true`)
            }
            className="w-full max-w-sm"
          >
            کوئیز از این درس
          </OutlineButton>
        </div>
      </div>

      <div className="w-full max-w-[800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        {data?.words?.map((item: LessonWord, index: number) => (
          <VocabularyWordListItem
            key={item?.id}
            index={index}
            isBlurred={isBlurred}
            item={item}
          />
        ))}
      </div>
      {data?.words?.length > 0 && (
        <PrimaryButton
          className="mx-auto w-full max-w-[360px] block mt-6"
          onClick={handleFinishLesson}
        >
          تمام لغات را یاد گرفتم
        </PrimaryButton>
      )}
    </div>
  );
};

export default VocabularyLessonView;
