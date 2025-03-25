"use client";

import Link from "next/link";
import React, { useRef } from "react";
import HighlightWord from "./HighlightWord";
import { PlayerBox } from "./PlayerBox";

const SearchMovieItem = ({
  item,
  activeIndex,
  index,
  searchWord,
}: {
  item: any;
  activeIndex: number;
  index: number;
  searchWord: string;
}) => {
  const playerRef = useRef(null);

  return (
    <div className="relative pb-32 rounded-lg">
      {activeIndex === index ? (
        <PlayerBox
          playerRef={playerRef}
          height="unset"
          file={item?.file}
          handleAction={() => {}}
          withControlled={false}
          playerState={activeIndex === index}
          className="!rounded-b-none"
        />
      ) : (
        <div
          className="w-full h-[125px] md:h-[350px] object-cover bg-cover rounded-lg"
          // style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL + item?.image})` }}
          style={{
            backgroundImage: `url(${
              process.env.REACT_APP_CATALOG_CONTENT_URL + item?.image
            })`,
            backgroundPosition: "center center",
          }}
        >
          {/* <LazyImage
            src={process.env.REACT_APP_BASE_URL + item?.image}
            alt={item?.sentence}
            className="w-full max-h-[180px] md:max-h-[350px] object-cover"
          /> */}
        </div>
      )}
      {activeIndex === index && (
        <div
          className="absolute bottom:0 mt-4 text-center w-[100%] z-[999] rounded-b-[10px]"
          style={{
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div className="text-[16px] font-bold " dir="ltr">
            <HighlightWord
              sentence={item.sentence}
              targetWord={searchWord || ""}
            />
          </div>
          <div className="text-gray300 text-sm mb-2 font-semibold">
            {item?.translate}
          </div>
          <Link
            className="text-gray-400 opacity-85 font-semibold underline underline-offset-4 text-sm"
            href={`/public/video-info/${item?.movie_id}`}
            replace
          >
            <span>{item?.movie_name}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchMovieItem;
