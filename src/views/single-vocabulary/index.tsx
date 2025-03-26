"use client";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { getVocabularyLessonsByCategoryId } from "@/api/services/education";
import {
  VocabularyCategoryLesson,
  VocabularyListItem,
} from "@/api/types/education";
import WaveLoading from "@/components/shared/WaveLoading";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BackIconComponent from "@/components/shared/BackIconComponent";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

const page_size = 20;

const SingleVocabularyView = ({
  categoryId,
  currentVocabulary,
  lessonsList,
}: {
  categoryId: number;
  currentVocabulary: VocabularyListItem;
  lessonsList: VocabularyCategoryLesson[];
}) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [allData, setAllData] =
    useState<VocabularyCategoryLesson[]>(lessonsList);

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getVocabularyLessonsByCategoryId(categoryId, { page_size, page }),
    queryKey: ["get-vocabulary-category-lessons", categoryId, page],
    staleTime: 0,
    enabled: page > 1,
  });

  useEffect(() => {
    if (data?.results) {
      setAllData((prev) => [...prev, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    if (lessonsList?.length > 0) {
      setAllData(lessonsList);
    }
  });

  return (
    <div className={`min-h-[80vh] md:min-h-[60vh] py-10 gap-6 px-[5%]`}>
      <BackIconComponent
        className="mb-4"
        clickHandler={() => router.push(`/public/vocabulary`)}
      />

      <div className="flex flex-col items-center justify-center gap-4 mb-6">
        <Image
          width={117}
          height={188.5}
          alt={currentVocabulary?.title}
          src={currentVocabulary?.image}
          className="w-[117px] h-[188.5px] md:w-[138px] md:h-[223.4px] rounded-lg object-cover"
        />
        <div className="text-main text-xl md:text-2xl text-center font-bold">
          واژگان کتاب {currentVocabulary?.title || ""}
        </div>
      </div>
      {allData?.length > 0 && (
        <>
          <InfiniteScroll
            dataLength={allData?.length}
            next={() => {
              setPage((prev) => prev + 1);
            }}
            hasMore={data?.count - page * page_size > 1}
            className="px-2 !overflow-hidden"
            loader={<WaveLoading />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {allData?.map((item: VocabularyCategoryLesson) => (
                <Link
                  href={`/public/vocabulary/${categoryId}/${item?.id}`}
                  key={item?.id}
                  className="w-full relative p-4 md:p-6 rounded-lg overflow-hidden cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${currentVocabulary?.image})`,
                    }}
                  ></div>
                  <div className="absolute inset-0 backdrop-blur-[2.5px] backdrop-grayscale-[19%] backdrop-brightness-[35%]"></div>

                  <div className="relative z-20">
                    <div
                      className="text-center text-white font-medium text-lg lg:text-xl"
                      dir="ltr"
                    >
                      {item?.title}
                    </div>
                  </div>
                  {item?.completed && (
                    <div className="flex items-center justify-center gap-4 text-white/90 text-[16px] lg:text-lg mt-2 absolute right-2 top-0">
                      <CheckBoxIcon className="!text-green-600 w-7 h-7" />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default SingleVocabularyView;
