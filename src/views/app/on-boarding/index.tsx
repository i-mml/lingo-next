import { useUserInfo } from "@/store";
import { useLoginModal } from "@/store/use-login-modal";
import { IOnboardData } from "@/types/on-boarding";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import StarterPoint from "./components/steps/StarterPoint";
import { PostUserPreferences } from "@/api/services/user-preferences";
import SelectLanguage from "./components/steps/SelectLanguage";
import SelectAccent from "./components/steps/SelectAccent";
import SelectLevel from "./components/steps/SelectLevel";
import SelectDailyGoal from "./components/steps/SelectDailyGoal";
import EnableNotification from "./components/steps/EnableNotif";
import WhatsAchieved from "./components/steps/WhatsAchieved";
const OnBoardingView = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [onBoardData, setOnBoardData] = useState<IOnboardData>({
    language: null,
    accent: null,
    level: null,
    daily_goal: null,
    referral_code: null,
  });

  const { updateUser } = useUserInfo();
  const searchParams = useSearchParams();
  const { closeModal } = useLoginModal();

  const redirectLink = searchParams.get("rdc")
    ? searchParams.get("rdc")
    : "public/home";

  const userPreferanceMutate = useMutation({
    mutationFn: () =>
      PostUserPreferences({
        preferred_language: onBoardData.language?.id,
        preferred_accent:
          onBoardData.language?.id === 2 ? onBoardData.accent : (1 as any),
        knowledge_level: onBoardData.level as any,
        daily_goal: onBoardData?.daily_goal as any,
        referral_code: onBoardData?.referral_code as any,
      })
        .then(() => {
          toast.success("تعیین سطح با موفقیت انجام شد.");
          updateUser({ is_onboard: true });
          router.push("/" + redirectLink);
        })
        .catch(() => toast.error("تعیین سطح شما با خطا مواجه شد.")),
  });
  // const userPreferanceMutate = useMutation(() => PostUserpereference(
  //   {
  //     "preferred_language": 2,
  //     "preferred_accent": "british",
  //     "knowledge_level": 2
  //   }
  // ));

  const handleGoNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleGoPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmitUserPreference = async () => {
    closeModal();
    await userPreferanceMutate.mutateAsync();
  };

  const propsToPass = {
    step,
    nextAction: handleGoNextStep,
    prevAction: handleGoPrevStep,
    setOnBoardData,
    onBoardData,
  };

  return (
    <section
      className="w-full bg-[url('/images/on-boarding-banner.png')] bg-no-repeat bg-cover min-h-[100vh]"
      dir="rtl"
    >
      {step === 1 ? <StarterPoint {...propsToPass} /> : null}
      {step === 2 ? (
        <SelectLanguage
          {...propsToPass}
          nextAction={() => {}}
          setStep={setStep}
        />
      ) : null}
      {step === 3 ? (
        <SelectAccent {...propsToPass} languageId={onBoardData.language?.id} />
      ) : null}
      {step === 4 ? (
        <SelectLevel
          {...propsToPass}
          setStep={setStep}
          languageId={onBoardData.language?.id}
        />
      ) : null}
      {step === 5 ? <SelectDailyGoal {...propsToPass} /> : null}
      {step === 6 ? <EnableNotification {...propsToPass} /> : null}
      {step === 7 ? (
        <WhatsAchieved
          {...propsToPass}
          nextAction={handleSubmitUserPreference}
          loading={userPreferanceMutate.isPending}
        />
      ) : null}
    </section>
  );
};

export default OnBoardingView;
