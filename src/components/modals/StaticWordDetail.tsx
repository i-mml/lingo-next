import { useTextToAudio } from "@/hooks/use-text-to-audio";
import useThemeCreator from "@/hooks/use-theme";
import { useTheme } from "next-themes";
import React from "react";
import CustomModal from "../shared/CustomModal";
import WaveLoading from "../shared/WaveLoading";
import OutlineButton from "../shared/OutlineButton";
import TabsWithBorder from "../shared/TabsWithBorder";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const tabsList: { id: number; title: string }[] = [
  {
    id: 1,
    title: "تعریف فارسی",
  },
  {
    id: 2,
    title: "تعریف انگلیسی",
  },
];

interface IProps {
  open: boolean;
  toggleModal: () => void;
  wordData: {
    text: string;
    persian_translate: string;
    lemma?: string;
    tag?: string;
    definitions?: Array<{
      language: string;
      example: string;
      definition: string;
    }>;
  };
}

const StaticWordDetail = (props: IProps) => {
  const { open, toggleModal, wordData } = props;
  const [currentTab, setCurrentTab] = React.useState(1);
  const { handleTextToSpeech, textToSpeachMutation } = useTextToAudio();

  return (
    <CustomModal open={open} toggle={toggleModal}>
      <div className="min-w-[90vmin] w-full lg:w-[100%] min-h-[60vh]" dir="rtl">
        <div className="w-full text-2xl lg:text-3xl mb-4 text-center text-primary font-semibold flex flex-col lg:grid grid-cols-3 gap-1 lg:gap-3">
          <div className="flex gap-3 items-center order-2 lg:order-none">
            <OutlineButton
              buttonProps={{
                disabled: textToSpeachMutation.isLoading,
              }}
              onClick={() =>
                handleTextToSpeech({
                  text: wordData?.text,
                  language: "en-US",
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
          <span className=""> </span>
        </div>

        <TabsWithBorder
          activeTab={currentTab}
          tabList={tabsList}
          onTabClick={(id) => setCurrentTab(id)}
          wrapperClassName="w-fit min-w-[100%]"
          listClassName="min-w-[400px] overflow-hidden overflow-x-auto !pl-[130px]"
        />

        <div>
          <div className="flex items-center text-lg lg:text-xl mt-5 gap-3">
            <span className="text-gray400">ترجمه: </span>
            <span className="text-main">
              {wordData?.persian_translate || ""}
            </span>
          </div>
          {wordData?.lemma && (
            <div className="flex items-center text-lg lg:text-xl mt-5 gap-3">
              <span className="text-gray400">ریشه کلمه: </span>
              <span className="text-main">{wordData?.lemma}</span>
            </div>
          )}
          {wordData?.tag && (
            <div className="flex items-center text-lg lg:text-xl mt-5 gap-3">
              <span className="text-gray400">جزء کلمه: </span>
              <span className="text-main">{wordData?.tag}</span>
            </div>
          )}
        </div>

        {wordData?.definitions &&
          wordData.definitions.length > 0 &&
          wordData.definitions
            ?.filter((node: { language: string }) =>
              currentTab === 2
                ? node?.language === "EN"
                : currentTab === 1
                ? node?.language === "FA"
                : null
            )
            ?.map((definition: any, index: number) => (
              <div
                className={`mb-3 ${
                  currentTab === 2 ? "text-left" : "text-right"
                } px-[5%] rounded-lg py-4 bg-layout w-[100%] mx-auto shadow-md`}
                dir={currentTab === 2 ? "ltr" : "rtl"}
                key={index}
              >
                <div className="text-main text-lg lg:text-[20px] font-medium">
                  {definition?.example}
                </div>
                <div className="text-gray400 text-[16px] lg:text-lg mt-2">
                  {definition?.definition}
                </div>
              </div>
            ))}
      </div>
    </CustomModal>
  );
};

export default StaticWordDetail;
