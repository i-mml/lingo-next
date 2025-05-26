import { useUserInfo } from "@/store";
import { useLoginModal } from "@/store/use-login-modal";
import { IOnboardData } from "@/types/on-boarding";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import StarterPoint from "./components/steps/StarterPoint";
import { PostUserPreferences } from "@/api/services/user-preferences";
import SelectLanguage from "./components/steps/SelectLanguage";
import SelectAccent from "./components/steps/SelectAccent";
import SelectLevel from "./components/steps/SelectLevel";
import SelectWeeklyGoal from "./components/steps/SelectWeeklyGoal";
import EnableNotification from "./components/steps/EnableNotif";
import WhatsAchieved from "./components/steps/WhatsAchieved";
import SelectAgeRange from "./components/steps/SelectAgeRange";
import SelectUserGoal from "./components/steps/SelectUserGoal";
import SelectLearningPreference from "./components/steps/SelectLearningPreference";

const OnBoardingView = () => {
  const [step, setStep] = useState(1);
  const [onBoardData, setOnBoardData] = useState<IOnboardData>({
    language: null,
    accent: null,
    level: null,
    weekly_time: null,
    referral_code: null,
    age_range: null,
    user_goal: null,
    learning_preference: null,
  });

  const queryClient = useQueryClient();
  const { updateUser } = useUserInfo();
  const { closeModal } = useLoginModal();

  const userPreferanceMutate = useMutation({
    mutationFn: () =>
      PostUserPreferences({
        preferred_language: onBoardData.language?.id,
        preferred_accent:
          onBoardData.language?.id === 2 ? onBoardData.accent : (1 as any),
        knowledge_level: onBoardData.level as any,
        weekly_time: onBoardData?.weekly_time as any,
        referral_code: onBoardData?.referral_code as any,
        age_range: onBoardData?.age_range as any,
        user_goal: onBoardData?.user_goal as any,
        learning_preference: onBoardData?.learning_preference as any,
      })
        .then(() => {
          toast.success("تعیین سطح با موفقیت انجام شد.");
          updateUser({ is_onboard: true });
          queryClient.invalidateQueries();
          queryClient.removeQueries();
        })
        .catch(() => toast.error("تعیین سطح شما با خطا مواجه شد.")),
  });

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
      {step === 5 ? <SelectWeeklyGoal {...propsToPass} /> : null}
      {step === 6 ? <SelectAgeRange {...propsToPass} /> : null}
      {step === 7 ? <SelectUserGoal {...propsToPass} /> : null}
      {step === 8 ? <SelectLearningPreference {...propsToPass} /> : null}
      {step === 9 ? <EnableNotification {...propsToPass} /> : null}
      {step === 10 ? (
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
