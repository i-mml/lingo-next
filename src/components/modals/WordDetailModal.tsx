import { useAuth } from "@/hooks/use-auth";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import useThemeCreator from "@/hooks/use-theme";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";
import CustomModal from "../shared/CustomModal";
import WaveLoading from "../shared/WaveLoading";
import PrimaryButton from "../shared/PrimaryButton";
import OutlineButton from "../shared/OutlineButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import TabsWithBorder from "../shared/TabsWithBorder";
import { partOfSpeechFields } from "@/constants/player-fields";
import { getEducationWordDetail } from "@/api/services/education";
import { getCmsDictionary } from "@/api/services/cms";

const tabsList: { id: number; title: string }[] = [
  {
    id: 1,
    title: "تعریف فارسی",
  },
  {
    id: 2,
    title: "تعریف انگلیسی",
  },
  {
    id: 3,
    title: "دیکشنری لانگ‌من",
  },
  {
    id: 4,
    title: "دیکشنری کالینز",
  },
];

interface IProps {
  open: boolean;
  toggleModal: () => void;
  word: { text: string; id: number };
  flashCardIsLoading?: boolean;
  addToFlashCardHandler?: (prm: {
    word: string;
    word_translation: string;
    word_rel_id: number;
  }) => void;
  hasFlashcardButton?: boolean;
}

const WordDetailModal = (props: IProps) => {
  const {
    open,
    toggleModal,
    word,
    addToFlashCardHandler,
    flashCardIsLoading,
    hasFlashcardButton,
  } = props;
  const { theme: themeType } = useTheme();
  const { theme }: any = useThemeCreator();
  const { whoAmI } = useAuth();

  const [currentTab, setCurrentTab] = useState(1);
  const [result, setResult] = useState("");
  const [resultCollisen, setResultCollisen] = useState("");

  const fields = word
    ? Object.entries(word)?.filter(
        (item) => item?.[0] !== "id" && item?.[0] !== "pt"
      )
    : [];

  const { data, isLoading } = useQuery({
    queryKey: ["fetchCaptions", word?.id, word],
    queryFn: () =>
      getEducationWordDetail(
        word?.id ? `id=${word?.id}` : `term=${word?.text}`
      ),
    enabled:
      (!!word?.id || !!word?.text) &&
      whoAmI?.userpreference?.preferred_language === 2,
    staleTime: 20000,
  });

  const { data: longmanData, isLoading: longmanLoading } = useQuery({
    queryKey: ["fetchCaptions", word?.text],
    queryFn: () => getCmsDictionary(word?.text),
    enabled: currentTab === 4 || currentTab === 3,
    staleTime: 20000,
  });

  const { handleTextToSpeech, textToSpeachMutation } = useTextToAudio();
  const wordData = data?.data?.data;

  const fetchBaseHtml = useCallback(() => {
    fetch("/assets/base.html")
      .then((response) => response.text())
      .then((data) => {
        const modifiedHtml =
          themeType === "dark"
            ? data.replace(/color\s*:\s*#000/gi, "color: #fff")
            : data.replace(/color\s*:\s*white/gi, "color: #161b1b");

        // ?.replace(/jpg"/g, `jpg?version=1.2.71"`)

        setResult(
          modifiedHtml.replace(
            /<div class="entry_content">/,
            `<div class="entry_content">${longmanData?.data?.[0]?.longman_html?.replace(
              /https?:\/\/m2\.res\.zabanshenas\.com\/dictionary\/loen/g,
              "https://www.ldoceonline.com"
            )}</div>`
          )
        );
      })
      .catch((error) => console.error("Error fetching base.html:", error));
  }, [themeType === "dark", longmanData?.data]);

  const fetchBaseHtmlCollisen = useCallback(() => {
    fetch("/assets/base_collisen.html")
      .then((response) => response.text())
      .then((data) => {
        const modifiedHtml =
          themeType === "dark"
            ? data
                .replace(/color\s*:\s*#000/gi, "color: #fff")
                .replace(/color\s*:\s*#555/gi, "color: #999")
            : data.replace(/color\s*:\s*white/gi, "color: #161b1b");

        setResultCollisen(
          modifiedHtml
            ?.replace(`CCCCCCC`, `${longmanData?.data?.[0]?.collins_html}`)
            .replace(
              /\/images\/thumb/g,
              "https://www.collinsdictionary.com/images/thumb"
            )
        );
      })
      .catch((error) => console.error("Error fetching base.html:", error));
  }, [themeType === "dark", longmanData?.data]);

  useEffect(() => {
    fetchBaseHtml();
  }, [fetchBaseHtml]);

  useEffect(() => {
    fetchBaseHtmlCollisen();
  }, [fetchBaseHtmlCollisen]);

  return (
    <CustomModal open={open} toggle={toggleModal}>
      <div className="min-w-[90vmin] w-full lg:w-[100%] min-h-[60vh]">
        {isLoading || longmanLoading ? (
          <WaveLoading isBlack={themeType !== "dark"} />
        ) : (
          <>
            <div className="w-full text-2xl lg:text-3xl mb-4 text-center text-primary font-semibold flex flex-col lg:grid grid-cols-3 gap-1 lg:gap-3">
              <div className="flex gap-3 items-center order-2 lg:order-none">
                {hasFlashcardButton && (
                  <PrimaryButton
                    onClick={
                      addToFlashCardHandler
                        ? () =>
                            addToFlashCardHandler({
                              word: wordData?.text,
                              word_translation: wordData?.persian_translate,
                              word_rel_id: word?.id,
                            })
                        : () => {}
                    }
                    buttonProps={{
                      disabled: flashCardIsLoading,
                    }}
                    className="min-w-[60px] !py-0"
                  >
                    {flashCardIsLoading ? (
                      <WaveLoading isBlack={themeType !== "dark"} />
                    ) : (
                      <div className="flex justify-center items-center gap-1 lg:gap-2 ">
                        <LibraryAddIcon
                          sx={{
                            color: theme.palette.text.main,
                          }}
                        />
                        <span className="text-main">افزودن به فلش کارت</span>
                      </div>
                    )}
                  </PrimaryButton>
                )}

                <OutlineButton
                  buttonProps={{
                    disabled: textToSpeachMutation.isLoading,
                  }}
                  onClick={() =>
                    handleTextToSpeech({
                      text:
                        whoAmI?.userpreference?.preferred_language === 2
                          ? wordData?.text
                          : word?.text,
                      language:
                        whoAmI?.userpreference?.preferred_language === 2
                          ? "en-US"
                          : "de-DE",
                    })
                  }
                  className="min-w-[60px] !py-0 justify-center flex items-center"
                >
                  {textToSpeachMutation.isLoading ? (
                    <WaveLoading />
                  ) : (
                    <VolumeUpIcon className="!text-main" />
                  )}
                </OutlineButton>
              </div>
              <span className="">{wordData?.text || ""}</span>

              {/* empty div */}
              <span className=""> </span>
            </div>

            {wordData?.definitions?.length > 0 ? (
              <TabsWithBorder
                activeTab={currentTab}
                tabList={tabsList}
                onTabClick={(id) => setCurrentTab(id)}
                wrapperClassName="w-fit min-w-[100%]"
                listClassName="min-w-[400px] overflow-hidden overflow-x-auto !pl-[130px]"
              />
            ) : whoAmI?.userpreference?.preferred_language === 2 ? (
              <div>
                <div className="flex items-center text-lg lg:text-xl mt-5 gap-3">
                  <span className="text-gray400">ترجمه: </span>
                  <span className="text-main">
                    {wordData?.persian_translate || ""}
                  </span>
                </div>
                <div className="flex items-center text-lg lg:text-xl mt-5 gap-3">
                  <span className="text-gray400">ریشه کلمه: </span>
                  <span className="text-main">{wordData?.lemma || ""}</span>
                </div>
                <div className="flex items-center text-lg lg:text-xl mt-5 gap-3">
                  <span className="text-gray400">جزء کلمه: </span>
                  <span className="text-main">{wordData?.tag || ""}</span>
                </div>
              </div>
            ) : (
              <div>
                {fields?.map((item) => (
                  <div className="flex items-center justify-center gap-6 mb-3">
                    <span className="text-gray400 w-[40%]">
                      {partOfSpeechFields?.[item?.[0]] || item?.[0]}:
                    </span>
                    <span className="text-main font-medium flex-1">
                      {item?.[1]}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {wordData?.definitions?.length > 0 &&
              wordData?.definitions
                ?.filter((node: { language: string }) =>
                  currentTab === 2
                    ? node?.language === "EN"
                    : currentTab === 1
                    ? node?.language === "FA"
                    : null
                )
                ?.map((definition: any) => (
                  <div
                    className={`mb-3 ${
                      currentTab === 1 || currentTab === 3
                        ? "text-left"
                        : "text-right"
                    } px-[5%] rounded-lg py-4 bg-layout w-[100%] mx-auto shadow-md`}
                    dir={currentTab === 1 || currentTab === 3 ? "ltr" : "rtl"}
                  >
                    <div className="text-main text-lg lg:text-[20px] font-medium">
                      {definition?.example}
                    </div>
                    <div className="text-gray400 text-[16px] lg:text-lg mt-2">
                      {definition?.definition}
                    </div>
                  </div>
                ))}
            {result !== "" &&
              longmanData?.data?.length > 0 &&
              currentTab === 3 && (
                <div
                  dangerouslySetInnerHTML={{ __html: result }}
                  dir="ltr"
                  className="lg:px-[5%]"
                />
              )}
            {resultCollisen !== "" &&
              longmanData?.data?.[0]?.collins_html.length > 0 &&
              currentTab === 4 && (
                <div
                  dangerouslySetInnerHTML={{ __html: resultCollisen }}
                  dir="ltr"
                  className="lg:px-[5%] w-full"
                />
              )}
          </>
        )}
      </div>
    </CustomModal>
  );
};

export default WordDetailModal;
