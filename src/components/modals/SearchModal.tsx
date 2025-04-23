"use client";

import { GetCmsMovies } from "@/api/services/cms";
import useDebounce from "@/hooks/use-debounce";
import useThemeCreator from "@/hooks/use-theme";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InputWithIcon from "../shared/InputWithIcon";
import WaveLoading from "../shared/WaveLoading";
import Image from "next/image";
import NeedSubscriptionMovieBadge from "../shared/NeedSubscriptionMovieBadge";
import { languageLevels } from "@/constants/language-levels";
import EmptyFlashcards from "../shared/EmptyFlashcards";
import CustomModal from "../shared/CustomModal";

interface IProps {
  open: boolean;
  toggleModal: () => void;
}

const contentTypeRoute: any = {
  Music: { title: "موسیقی", link: "audio-info" },
  Book: { title: "کتاب‌صوتی", link: "audio-info" },
  Animation: { title: "انیمیشن", link: "video-info" },
  Serial: { title: "فیلم", link: "video-info" },
  Movie: { title: "فیلم", link: "video-info" },
};

const SearchModal = ({ open, toggleModal }: IProps) => {
  const { theme }: any = useThemeCreator();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["search-contents-in-modal", debouncedSearchValue],
    queryFn: () => GetCmsMovies(debouncedSearchValue),

    enabled: !!debouncedSearchValue && debouncedSearchValue?.length > 1,
  });

  const handleClickMovie = (movie: any) => {
    router.push(
      `/public/${contentTypeRoute?.[movie?.content_type]?.link}/${movie.id}`
    );
    toggleModal();
  };

  return (
    <CustomModal open={open} toggle={toggleModal}>
      <div className="md:w-[70vw] pb-10" dir="rtl">
        <h2 className="text-main text-lg lg:text-xl text-center font-semibold mb-6">
          جستجوی محتوا
        </h2>

        <div className="w-full">
          <InputWithIcon
            inputProps={{
              placeholder: "جستجو فیلم،سریال،انیمیشن،موسیقی،کتاب‌صوتی ...",
              value: searchValue,
              onChange: (e) => setSearchValue(e.target.value),
              className: "w-fit px-4",
            }}
            icon={
              <SearchIcon
                sx={{
                  color: theme?.palette?.text?.gray400,
                }}
              />
            }
          />
        </div>

        {!!debouncedSearchValue && (
          <>
            {isLoading ? (
              <div className="h-[20vh] grid place-content-center">
                <WaveLoading />
              </div>
            ) : data?.results?.length > 0 ? (
              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-5 gap-4"
                dir="rtl"
              >
                {data?.results?.map((movie: any) => (
                  <div
                    className="relative w-fit rounded-xl lg:mb-5"
                    key={movie?.id}
                  >
                    <Image
                      width={212}
                      height={318}
                      className={`w-full h-full rounded-xl object-cover`}
                      src={movie?.image}
                      alt={movie?.image}
                      onClick={() => handleClickMovie(movie)}
                    />
                    {movie?.is_locked && <NeedSubscriptionMovieBadge />}
                    <div className="w-full rounded-b-xl absolute bottom-0 py-2 px-2 bg-[rgba(0,0,0,0.4)]">
                      <h4 className="text-lg lg:text-xl font-semibold text-[white] line-clamp-1">
                        {contentTypeRoute?.[movie?.content_type]?.title}{" "}
                        {movie?.title}
                      </h4>
                      <p className="text-[white] text-[16px] lg:text-lg font-medium mt-2">
                        سطح{" "}
                        {
                          languageLevels?.[data?.difficulty || 1]
                            ?.standart_level
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyFlashcards
                hasDesc={false}
                customTitle="موردی یافت نشد ..!"
              />
            )}
          </>
        )}
      </div>
    </CustomModal>
  );
};

export default SearchModal;
