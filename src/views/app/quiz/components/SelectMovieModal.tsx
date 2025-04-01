"use client";

import { getCmsEpisodeSearch } from "@/api/services/cms";
import CustomModal from "@/components/shared/CustomModal";
import useDebounce from "@/hooks/use-debounce";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  selectMovieModal: boolean;
  toggleSelectMovie: () => void;
  handleOnChange: any;
}

const SelectMovieModal = (props: IProps) => {
  const { selectMovieModal, toggleSelectMovie, handleOnChange } = props;
  const { t: translate } = useTranslation();

  const [search, setSearch] = useState("");
  const debouncedSearchValue = useDebounce(search, 300);

  const { data: movieListData, isLoading: movieListLoading } = useQuery({
    queryKey: ["get-search-data", debouncedSearchValue],
    queryFn: () => getCmsEpisodeSearch(debouncedSearchValue),
  });

  return (
    <CustomModal open={selectMovieModal} toggle={toggleSelectMovie}>
      <div className="w-full lg:w-[500px] min-h-[60vh]">
        <div className="pt-10">
          <div className="text-main font-bold text-[16px] lg:text-2xl text-center mb-6">
            {translate("pages.victionary.Search Episode Movie")}
          </div>
          <div className="w-full relative grid place-items-center">
            <Autocomplete
              disablePortal
              options={
                movieListData?.data?.results?.length > 0
                  ? movieListData?.data?.results?.map(
                      (item: { id: number; name: string }) => {
                        return { label: item?.name, id: item?.id };
                      }
                    )
                  : []
              }
              className="w-[100%] lg:w-[60%]"
              autoHighlight
              dir="ltr"
              clearIcon
              clearOnEscape
              loading={movieListLoading}
              onChange={handleOnChange}
              noOptionsText={translate(
                "pages.quiz.No Option Found In Autocomplete"
              )}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  label=""
                  dir="ltr"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  {...params}
                />
              )}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default SelectMovieModal;
