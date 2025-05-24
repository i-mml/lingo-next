import useThemeCreator from "@/hooks/use-theme";
import { IOnboardData } from "@/types/on-boarding";
import ExtensionIcon from "@mui/icons-material/Extension";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import Lottie from "lottie-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import OnBoardCard from "../OnBoardCard";
import BackIconComponent from "@/components/shared/BackIconComponent";
import Celebrate from "@/assets/lotties/celebrate-linear.json";
import OnBoardBottomNav from "../OnBoardBottomNav";
import { useRouter, useSearchParams } from "next/navigation";
import { Film, BookOpen } from "lucide-react";
import Link from "next/link";

interface IProps {
  step: number;
  setOnBoardData: Dispatch<SetStateAction<IOnboardData>>;
  nextAction: () => void;
  prevAction: () => void;
  loading?: boolean;
}

const WhatsAchieved = (props: IProps) => {
  const { step, nextAction, prevAction } = props;

  const { theme }: any = useThemeCreator();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);

  const redirectLink = searchParams.get("rdc")
    ? searchParams.get("rdc")
    : "/public/home";

  if (showOptions) {
    return (
      <OnBoardCard>
        <div className="text-primary font-bold text-xl md:text-2xl">
          دوست داری با چه روشی شروع کنی؟
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
          <Link
            href={"/app/units"}
            className="flex-1 flex items-center gap-3 bg-gradient-to-r from-green-100 to-green-50 shadow-lg h-20 rounded-xl px-6 py-5 hover:scale-105 transition-transform cursor-pointer"
          >
            <BookOpen className="w-8 h-8 text-green-500" />
            <span className="text-black font-bold text-lg">
              یادگیری درس به درس
            </span>
          </Link>
          <Link
            href={"/" + redirectLink}
            className="flex-1 flex items-center gap-3 bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg h-20 rounded-xl px-6 py-5 hover:scale-105 transition-transform cursor-pointer"
          >
            <Film className="w-8 h-8 text-blue-500" />
            <span className="text-black font-bold text-lg">
              یادگیری با فیلم و سریال
            </span>
          </Link>
        </div>
      </OnBoardCard>
    );
  }
  return (
    <OnBoardCard>
      <BackIconComponent
        className="absolute top-[-34px] z-[999]"
        clickHandler={prevAction}
      />
      <div className="earth-icon">
        <Lottie
          animationData={Celebrate}
          className="w-20 h-20 lg:w-24 lg:h-24 mx-auto"
        />
      </div>
      <div className="title w-[90%] mx-auto mb-6">
        با زبانو چی به دست میاری؟
      </div>

      <div className="border-b border-gray-500 mb-4 px-4 mx-[5%] flex items-center !justify-start pb-3 gap-4 !text-right">
        <QuestionAnswerIcon
          style={{ color: theme.palette.text.primary, fontSize: 28 }}
        />
        <div>
          <div className="text-main font-medium text-[16px] lg:text-lg">
            مکالمه با اعتماد به نفس بالا
          </div>
          <div className="text-gray400 text-sm lg:text-[16px] mt-2">
            تمرین مکالمه و شنیدار بدون استرس
          </div>
        </div>
      </div>

      <div className="border-b border-gray-500 mb-4 px-4 mx-[5%] flex items-center !justify-start pb-3 gap-4 !text-right">
        <SpellcheckIcon
          style={{ color: theme.palette.text.primary, fontSize: 28 }}
        />
        <div>
          <div className="text-main font-medium text-[16px] lg:text-lg">
            از کلمات سخت، فلش کارت به همراه سکانس های فیلم میسازی
          </div>
          <div className="text-gray400 text-sm lg:text-[16px] mt-2">
            یادگیری کلمات رایج و عبارات پر تکرار
          </div>
        </div>
      </div>

      <div className="mb-4 px-4 mx-[5%] flex items-center !justify-start pb-3 gap-4 !text-right">
        <ExtensionIcon
          style={{ color: theme.palette.text.primary, fontSize: 28 }}
        />
        <div>
          <div className="text-main font-medium text-[16px] lg:text-lg">
            یادگیری درون سرگرمی
          </div>
          <div className="text-gray400 text-sm lg:text-[16px] mt-2">
            چالش های جذاب، تکنیک‌های آموزش هوشمند و دنیایی از سرگرمی
          </div>
        </div>
      </div>

      <OnBoardBottomNav
        selected={"true"}
        step={step}
        handleNextAction={() => {
          nextAction();
          setShowOptions(true);
        }}
      />
    </OnBoardCard>
  );
};

export default WhatsAchieved;
