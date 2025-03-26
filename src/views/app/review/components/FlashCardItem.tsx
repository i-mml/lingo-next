import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Play from "@/assets/play.svg";

import OpenEye from "@/assets/open-eye.svg";
import useThemeCreator from "@/hooks/use-theme";
import WordTypeCard from "./WordTypeCard";
import HighlightWord from "@/components/shared/HighlightWord";
import { Drawer } from "@mui/material";
import FlashCardDrawerItem from "./FlashCardDrawerItem";
import { FlashCardActions } from "./FlashCardActions";

const FlashCardItem = ({
  item,
  refetch,
}: {
  item: any;
  refetch: () => void;
}) => {
  const { t: translate } = useTranslation();
  const { theme }: any = useThemeCreator();

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const wordGrammarJson =
    item?.grammatical_json?.length > 0
      ? JSON.parse(item?.grammatical_json)?.sentence?.words?.find(
          (node: { id: number }) => node.id === item?.word_rel
        )
      : "";

  return (
    <div className="cards-sm-box-shadow bg-backgroundMain py-[18px] px-4 mb-4 md:mb-6 w-full md:w-[calc(50%-12px)] rounded-2xl flex flex-col overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-main font-semibold text-base md:text-lg">
            {item?.word}
          </span>
          <span className="text-gray400 text-xs md:text-sm border-r border-borderMain pr-3 mr-1 ">
            {item?.word_translation}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <WordTypeCard title={wordGrammarJson?.pt} />
        </div>
      </div>
      <div className="text-sm md:text-base text-main text-left direction-ltr mx-3 my-4">
        <HighlightWord sentence={item?.text} targetWord={item?.word} />
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1 md:gap-[9px] text-gray400 text-xs md:text-sm font-medium">
          <Play
            onClick={toggleDrawer}
            className="!w-5 !h-5 cursor-pointer"
            fill="red"
          />
          <div className="text-gray300 text-xs md:text-sm">
            {item?.movie_detail?.title || ""}
          </div>
          {/* <li className="flas-series-season">فصل ۲ - قسمت ۴</li> */}
        </div>
        <div className="flex-1 flex relative w-full h-[100%] cursor-pointer">
          <div className="absolute bottom-0 top-0 left-0 w-fit transition-all ease-in-out mr-auto flex items-center gap-1 text-gray400">
            <OpenEye className="!mb-[2px] !w-4 !h-4" />
            <span>{item?.times_seen}</span>
            <span>{translate("pages.review.View Unit")}</span>
          </div>

          <FlashCardActions item={item} refetch={refetch} />
        </div>
      </div>
      {openDrawer && (
        <Drawer
          dir="rtl"
          className="[&_.MuiDrawer-paper]:h-[100vh] md:[&_.MuiDrawer-paper]:w-full [&_.MuiDrawer-paper]:w-[80%] [&_.MuiDrawer-paper]:max-w-[472px] [&_.MuiDrawer-paper]:bg-backgroundMain [&_.MuiDrawer-paper]:rounded-tl-3xl [&_.MuiDrawer-paper]:rounded-bl-3xl [&_.MuiDrawer-paper]:border-l-4 [&_.MuiDrawer-paper]:border-primary"
          open={openDrawer}
          onClose={toggleDrawer}
          anchor="bottom"
        >
          <FlashCardDrawerItem
            item={item}
            onClose={() => {
              toggleDrawer();
              refetch();
            }}
          />
        </Drawer>
      )}
    </div>
  );
};

export default FlashCardItem;
