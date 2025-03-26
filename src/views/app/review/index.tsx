"use client";

import {
  GetEducationFlashcard,
  getFlashCardEpisodes,
} from "@/api/services/education";
import { FlashCardType } from "@/api/types/flashcard";
import BackIconComponent from "@/components/shared/BackIconComponent";
import EmptyFlashcards from "@/components/shared/EmptyFlashcards";
import useDebounce from "@/hooks/use-debounce";
import useThemeCreator from "@/hooks/use-theme";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import GlassLineal from "@/assets/lotties/glass_lineal.json";
import SectionTitle from "@/components/shared/SectionTitle";
import InputWithIcon from "@/components/shared/InputWithIcon";
import TabsWithBorder from "@/components/shared/TabsWithBorder";
import FlashcardModal from "./components/FlashcardModal";
import FlashCardList from "./components/FlashCardList";

const page_size = 50;

const ReviewView = () => {
  const swiperRef = useRef(null);
  const { theme }: any = useThemeCreator();

  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<FlashCardType[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState("");

  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search, 500);

  const { data: flashcardEpisodes } = useQuery({
    queryKey: ["get-flashcard-episodes"],
    queryFn: getFlashCardEpisodes,
  });

  const { data, refetch } = useQuery({
    queryKey: ["get-flashcard-list", page, searchValue, selectedEpisode],
    queryFn: () =>
      GetEducationFlashcard({
        page_size,
        page,
        word: search,
        episode: selectedEpisode ? Number(selectedEpisode) : undefined,
      }),
    staleTime: 0,
  });

  const [currentTab, setCurrentTab] = useState(1);
  const [filterData, setFilterData] = useState(
    !!data && data?.results.length > 0 ? data?.results : []
  );

  const [modal, setModal] = useState(false);
  const { t: translate } = useTranslation();
  const router = useRouter();

  const tabsList = [
    {
      id: 1,
      title: translate("pages.review.Is Learning Tab"),
      value: data?.results?.filter((item) => !item?.is_learned)?.length || 0,
    },
    {
      id: 2,
      title: translate("pages.review.Is Learned Tab"),
      value: data?.results?.filter((item) => item?.is_learned)?.length || 0,
    },
  ];

  const handleFilter = useCallback(
    async (id: number) => {
      setFilterData(
        id === 1
          ? allData?.filter((item) => !item?.is_learned)
          : allData?.filter((item) => item?.is_learned)
      );
    },
    [data, page, allData]
  );

  const toggleModal = () => {
    if (modal) {
      refetch();
    }
    setModal((prev) => !prev);
  };

  useEffect(() => {
    handleFilter(currentTab);
  }, [currentTab, allData, handleFilter]);

  useEffect(() => {
    if (!!data?.results) {
      setAllData((prevData) =>
        searchValue !== "" || selectedEpisode !== ""
          ? (data?.results as FlashCardType[])
          : [...prevData, ...(data?.results as any)]
      );
      //   if (filterData?.length === 0) {
      //     setFilterData(
      //       currentTab === 1
      //         ? allData?.filter((item) => !item?.is_learned)
      //         : allData?.filter((item) => item?.is_learned)
      //     );
      //   }
    }
  }, [data?.results]);

  if ((!data || data?.results?.length === 0) && searchValue === "") {
    return <EmptyFlashcards />;
  }
  return (
    <section className="min-h-[80vh] bg-backgroundLayout pt4 md:pt-6 pb-[75px] md:pb-12 px-[5%]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 !justify-start mb-0 lg:mb-5">
          <Lottie
            animationData={GlassLineal}
            className="w-16 h-16 lg:w-20 lg:h-20"
          />
          <h1 className="text-lg lg:text-3xl font-bold text-main">
            مرور واژگان
          </h1>
        </div>
        <BackIconComponent
          className="mt-2 lg:mb-9 !justify-start lg:!hidden"
          clickHandler={() => router.back()}
        />
      </div>

      <div className="flex">
        <div>
          <div className="page-title-box">
            <SectionTitle>
              {translate("pages.review.My Vocabulary")}
            </SectionTitle>
            <div className="words-numbers">
              {data?.count} {translate("pages.review.Words Uni")}
            </div>
          </div>
          <div className="sub-title hide-mobile">
            {translate("pages.review.Review All")}
          </div>
        </div>
        <Button
          className="flash-card-button hide-mobile"
          onClick={() => (filterData?.length > 0 ? toggleModal() : {})}
          disabled={filterData?.length === 0}
        >
          {translate("pages.review.Flashcard Button")}
        </Button>
      </div>
      <div className="mobile-flashcard-button-box hide-desktop">
        <Button
          className="flash-card-button hide-desktop"
          onClick={() => (filterData?.length > 0 ? toggleModal() : {})}
          disabled={filterData?.length === 0}
        >
          {translate("pages.review.Flashcard Button")}
        </Button>
      </div>
      <TabsWithBorder
        activeTab={currentTab}
        onTabClick={(id) => {
          setCurrentTab(id);
          handleFilter(id);
        }}
        tabList={tabsList}
      />

      <div className="flex items-center gap-[2%] mt-4">
        <InputWithIcon
          icon={
            <SearchIcon
              sx={{
                color: theme?.palette?.text?.gray400,
              }}
            />
          }
          className="w-[49%]"
          inputProps={{
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "جستجو کلمه",
            type: "text",
          }}
        />
        <select
          value={selectedEpisode}
          onChange={(e) => setSelectedEpisode(e.target.value)}
          className="bg-backgroundMain w-[49%] h-12 rounded-lg border text-main"
          style={{ borderColor: theme.palette.border.main }}
        >
          {selectedEpisode !== "" ? (
            <option value={""}>همه</option>
          ) : (
            <option disabled value="">
              انتخاب فیلم و اپیزود
            </option>
          )}
          {flashcardEpisodes?.map((item: { id: number; name: string }) => (
            <option value={item?.id} key={item?.id}>
              {item?.name || ""}
            </option>
          ))}
        </select>
      </div>

      <InfiniteScroll
        dataLength={filterData?.length}
        next={() => {
          setPage((prev) => prev + 1);
        }}
        hasMore={data?.count ? data?.count - page * page_size > 1 : false}
        className="px-2"
        loader=""
      >
        <FlashCardList data={filterData} refetch={refetch} />
      </InfiniteScroll>

      {modal ? (
        <FlashcardModal
          open={modal}
          toggle={toggleModal}
          data={filterData}
          swiperRef={swiperRef}
        />
      ) : null}
    </section>
  );
};

export default ReviewView;
