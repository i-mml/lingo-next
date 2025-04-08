import { fetchCaptions } from "@/api/services/cms";
import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import useStore from "../store/useStore";
import { shallow } from "zustand/shallow";
import useThemeCreator from "@/hooks/use-theme";
import Play from "@/assets/play.svg";

const TranscriptionBox = React.memo(
  ({ goTocaptionsTime, movie, subtitle }: any) => {
    const { t: translate } = useTranslation();

    const subTitleCaptions = `/cms/subtitle/${subtitle?.subtitle_id}`;

    const { data: captionsData } = useQuery({
      queryKey: ["fetchCaptions", subtitle?.subtitle_id],
      queryFn: () => fetchCaptions(subTitleCaptions),
      enabled: !!subtitle?.subtitle_id,
    });

    const { currentCaptionIndex } = useStore(
      (state: any) => ({ currentCaptionIndex: state.currentCaptionIndex }),
      shallow
    );
    const { theme }: any = useThemeCreator();
    const boxRef = useRef(null);
    const scrollRef = useRef<{ isScroll: boolean; timeout: any }>({
      isScroll: false,
      timeout: null,
    });

    const handleStartScroll = (event: any) => {
      scrollRef.current.isScroll = true;
    };
    const handleStopScroll = () => {
      scrollRef.current.isScroll = false;
    };

    const renderPlayIcon = useCallback(
      (index: number) => (
        <Play
          color={
            index === currentCaptionIndex
              ? theme.palette?.text?.main
              : theme.palette?.text?.gray400
          }
        />
      ),
      [currentCaptionIndex, theme]
    );

    useEffect(() => {
      // @ts-ignore
      const activeElement = boxRef.current?.querySelector(".active");
      if (!!activeElement && !scrollRef.current?.isScroll) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, [boxRef.current, currentCaptionIndex, scrollRef.current.isScroll]);

    useEffect(() => {
      if (scrollRef.current.isScroll) {
        setTimeout(() => {
          scrollRef.current.isScroll = false;
        }, 7000);
      }
    }, [scrollRef.current.isScroll]);

    if (!captionsData?.data?.subtitle_lines?.subtitle) {
      return (
        <div className="w-full flex items-center justify-center flex-col min-h-[20vh] gap-2 lg:gap-5">
          <CircularProgress />
          <div className="text-main text-sm lg:text-lg" dir={theme.direction}>
            {translate("pages.player.Downloading Subtitle")}
          </div>
        </div>
      );
    }
    return (
      <div
        ref={boxRef}
        className="scroll-smooth overflow-hidden overflow-y-scroll"
        style={{
          maxHeight: "calc(100vh - 150px)",
        }}
        onWheel={handleStartScroll}
        onTouchMove={handleStartScroll}
        dir={"ltr"}
      >
        {captionsData?.data?.subtitle_lines?.subtitle?.map(
          (item: any, index: number) => {
            return (
              <Box
                onClick={() => {
                  handleStopScroll();
                  goTocaptionsTime(index, null, "index");
                }}
                className={index === currentCaptionIndex ? "active" : ""}
                key={index}
                sx={{
                  color:
                    index === currentCaptionIndex
                      ? theme.palette?.text?.main
                      : theme.palette?.text?.gray400,
                  fontSize: 16,
                  fontWeight: index === currentCaptionIndex ? "600" : "500",
                  padding: "12px",
                  wordWrap: "break-word",
                  fontFamily: "Dana",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "4px",
                  borderRadius:
                    index === currentCaptionIndex ? "16px" : "unset",
                  background:
                    index === currentCaptionIndex
                      ? theme.palette?.border?.main
                      : "unset",
                }}
              >
                {index === currentCaptionIndex && renderPlayIcon(index)}
                {item?.sentence?.subtitle}
              </Box>
            );
          }
        )}
      </div>
    );
  }
);

export default TranscriptionBox;
