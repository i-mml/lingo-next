import useThemeCreator from "@/hooks/use-theme";
import { Box, Paper, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { useVideoPlayerStore } from "../store/playerStore";
import { shallow } from "zustand/shallow";
import { CustomTab } from "./CustomTab";
import { WordsBox } from "./WordsBox";
import TranscriptionBox from "./TranscriptionBox";
import WaveLoading from "@/components/shared/WaveLoading";
import TabsWithBorder from "@/components/shared/TabsWithBorder";
import GrammarStreamBox from "@/components/shared/GrammarStreamBox";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { GrammarBox } from "./GrammarBox";

const grammarTabsList = [
  {
    id: 1,
    title: "فارسی",
  },
  {
    id: 2,
    title: "انگلیسی",
  },
];

export const FlashCardBox = React.memo(
  ({
    activeTab,
    handleTabChange,
    data,
    subtitle,
    currentGrammerText,
    goTocaptionsTime,
    refetchFlashCards,
    movie,
    handleAction,
    currentSubtitle,

    movieFullData,
  }: any) => {
    const { theme }: any = useThemeCreator();
    const { t: translate } = useTranslation();
    const router = useRouter();

    const {
      subtitle_grammars,
      loadingSubtitleGrammar,
    }: { subtitle_grammars: any; loadingSubtitleGrammar: boolean } =
      useVideoPlayerStore(
        (state) => ({
          subtitle_grammars: state.subtitle_grammars,
          loadingSubtitleGrammar: state.loadingSubtitleGrammar,
        }),
        shallow
      );

    const [currentTab, setCurrentTab] = useState(1);

    const linkToGrammarPage = () => {
      const grammarsIds = Object.entries(
        subtitle_grammars?.data?.data?.categories
      )
        .map((item) => item?.[1])
        ?.join(",");
      router.push(`/public/grammar-list?current_grammar=${grammarsIds}`);
    };

    return (
      <Paper
        sx={{
          boxShadow: { xs: "unset", md: "0 5px 10px 0 rgba(0,0,0,.3)" },
          color: theme?.palette?.text?.main,
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          border: { xs: "unset", md: "2px solid #393939" },
          margin: { xs: "0", md: "24px" },
          overflow: "unset",
          backgroundColor: theme?.palette?.background?.main,
          borderRadius: "16px",
          padding: `${window.innerHeight < 700 ? "30px" : "0"} 16px 0`,
          rowGap: "0px",
          columnGap: "8px",
          minHeight: { xs: "0", md: "calc(100vh - 48px)" },
          height: { xs: "100%", md: "auto" },
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          style={{
            display: isMobile ? "none" : "flex",
            justifyContent: "space-between",
            backgroundColor: theme.palette?.background?.main,
            padding: "4px",
            borderRadius: "8px",
          }}
          // classes={{
          //   fixed: "!overflow-x-auto",
          // }}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
          {movieFullData?.language === 2 ? (
            <CustomTab
              label="گرامر"
              index={3}
              isActive={activeTab === 3}
              handleTabChange={(event: any, index: number) => {
                handleTabChange(event, index);
                if (currentSubtitle && handleAction) {
                  handleAction?.(currentSubtitle?.sentence?.subtitle);
                }
              }}
            />
          ) : (
            <CustomTab handleTabChange={() => {}} />
          )}
          <CustomTab
            label="اجزا جمله"
            index={2}
            isActive={activeTab === 2}
            handleTabChange={(event: any, index: number) => {
              handleTabChange(event, index);
            }}
          />
          <CustomTab
            label="واژگان متن"
            index={0}
            isActive={activeTab === 0}
            handleTabChange={handleTabChange}
          />
          <CustomTab
            label="متن فیلم"
            index={1}
            isActive={activeTab === 1}
            handleTabChange={handleTabChange}
          />
        </Tabs>
        <Box
          style={{
            maxHeight: "calc(100vh - 150px)",
            overflowY: activeTab === 1 ? "hidden" : "auto",
            display: "flex",
            flexDirection: "column",
            scrollbarWidth: "thin",
            scrollbarColor: "#100e0e #232823",
            paddingRight: activeTab === 1 ? "8px" : 0,
          }}
        >
          {activeTab === 0 &&
            (data?.results?.filter((item: any) => item.word)?.length > 0 ? (
              data?.results
                ?.filter((item: any) => item.word)
                ?.map((item: any, index: number) => (
                  <WordsBox
                    key={item.time_end + index}
                    item={item}
                    onClickHandler={() =>
                      goTocaptionsTime(item.time_end, item.time_end, "time")
                    }
                    refetchFlashCards={refetchFlashCards}
                  />
                ))
            ) : (
              <Box
                sx={{
                  padding: 2,
                  width: "100%",
                  columnGap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  background: theme.palette?.background?.disabled,
                  color: theme.palette?.text?.main,
                  borderRadius: 2,
                  rowGap: 1,
                }}
              >
                <div className="text-center w-full">
                  {translate("pages.player.Flashcard Not Found")}
                </div>
              </Box>
            ))}
          {activeTab === 1 && (
            <TranscriptionBox
              subtitle={subtitle}
              goTocaptionsTime={goTocaptionsTime}
              movie={movie}
            />
          )}

          {activeTab === 2 && currentGrammerText?.sentence?.subtitle && (
            <Box
              sx={{
                width: "100%",
                padding: 2,
                background: theme.palette?.background?.disabled,
                borderRadius: 2,
                mb: 1,
                display: "inline-flex",
              }}
            >
              <Box className="text-main text-sm lg:text-lg font-semibold break-words">
                {currentSubtitle?.sentence?.subtitle || ""}
              </Box>
            </Box>
          )}
          {activeTab === 3 && (
            <>
              {!!loadingSubtitleGrammar ? (
                <WaveLoading />
              ) : subtitle_grammars?.data?.data?.explanation_en?.definition ? (
                <div className="lg:pt-4 pb-5 lg:pb-10">
                  {subtitle_grammars?.data?.data?.explanation_en
                    ?.definition && (
                    <Box
                      sx={{
                        background: theme.palette?.background?.disabled,
                        color: theme.palette?.text?.main,
                        borderRadius: 2,
                        padding: "8px 16px",
                        marginBottom: "16px",
                      }}
                    >
                      <Box className="text-main text-[16px] lg:text-2xl font-semibold break-words">
                        {subtitle_grammars?.data?.data?.explanation_en
                          ?.definition || ""}
                      </Box>
                    </Box>
                  )}

                  <div className="mb-5 !mt-0">
                    <TabsWithBorder
                      tabList={grammarTabsList}
                      activeTab={currentTab}
                      onTabClick={(id) => setCurrentTab(id)}
                    />
                  </div>

                  <div
                    style={{
                      background: theme.palette?.background?.disabled,
                      color: theme.palette?.text?.main,
                      borderRadius: 14,
                      padding: "8px 16px",
                      width: "95%",
                      margin: "0 auto",
                    }}
                  >
                    {currentTab === 1 &&
                      Object.entries(
                        subtitle_grammars?.data?.data?.explanation_fa
                      )?.map((object) =>
                        Array.isArray(object[1]) ? (
                          <Box
                            key={object?.[0]}
                            sx={{
                              marginBottom: "16px",
                            }}
                          >
                            <div className="font-semibold text-sm lg:text-lg text-main capitalize text-right">
                              {object?.[0] || ""}
                            </div>
                            <GrammarStreamBox
                              texts={object?.[1] || ""}
                              className="text-right"
                            />
                          </Box>
                        ) : (
                          <Fragment key={object?.[1] as any}></Fragment>
                        )
                      )}

                    {currentTab === 2 &&
                      Object.entries(
                        subtitle_grammars?.data?.data?.explanation_en
                      )?.map((object) =>
                        Array.isArray(object[1]) ? (
                          <Box
                            key={object?.[0]}
                            sx={{
                              marginBottom: "16px",
                            }}
                          >
                            <div className="font-semibold text-sm lg:text-lg text-main capitalize">
                              {object?.[0] || ""}
                            </div>
                            <GrammarStreamBox texts={object?.[1] || ""} isEng />
                          </Box>
                        ) : (
                          <Fragment key={object?.[1] as any}></Fragment>
                        )
                      )}
                  </div>
                  {(currentTab === 2 || currentTab === 1) &&
                    Object.entries(subtitle_grammars?.data?.data?.categories)
                      .length > 0 && (
                      <PrimaryButton
                        className="w-full md:w-[50%] mx-auto mt-5 block"
                        onClick={linkToGrammarPage}
                      >
                        مطالعه بیشتر
                      </PrimaryButton>
                    )}
                </div>
              ) : null}
            </>
          )}
          {activeTab === 2 && (
            <Box
              sx={{
                padding: 2,
                width: "100%",
                columnGap: 2,
                display: "flex",
                flexWrap: "wrap",
                background: theme.palette?.background?.disabled,
                color: theme.palette?.text?.main,
                borderRadius: 2,
                rowGap: 1,
              }}
            >
              {currentSubtitle ? (
                currentSubtitle?.sentence?.words?.map?.((item: any) =>
                  item?.pt ? (
                    <GrammarBox key={item?.id} item={item} />
                  ) : (
                    <Fragment key={item?.id}></Fragment>
                  )
                )
              ) : (
                <div className="text-center w-full">
                  {translate("pages.player.Grammer Not Found")}
                </div>
              )}
            </Box>
          )}
        </Box>
      </Paper>
    );
  }
);
