import React, { useEffect, useState } from "react";
import { isIOS } from "react-device-detect";
import Joyride, { CallBackProps, Locale, Step } from "react-joyride";
import { shallow } from "zustand/shallow";
import { useVideoPlayerStore } from "../store/playerStore";
import useStore from "../store/useStore";
import useThemeCreator from "@/hooks/use-theme";

const PlayerOnboardingTour = () => {
  const { theme }: any = useThemeCreator();
  const [runTour, setRunTour] = useState(false);
  const { currentCaptionIndex } = useStore(
    (state: any) => ({
      currentCaptionIndex: state.currentCaptionIndex,
    }),
    shallow
  );
  const { pause } = useVideoPlayerStore(
    (state) => ({
      pause: state.pause,
    }),
    shallow
  );

  const persianLocale: Locale = {
    back: "بازگشت",
    close: "بستن",
    last: "پایان",
    next: "بعدی",
    nextLabelWithProgress: "بعدی",
    skip: "بستن",
  };
  const TOUR_STEPS: Step[] = [
    {
      target: "#first-step",
      title: "به زبانو خوش آمدید",
      content: "بعدی رو بزن تا بهت بگم داستان این صفحه چیه ..!",
      placement: "center",
      disableBeacon: true,
      hideBackButton: true,
      hideCloseButton: true,
      locale: { skip: null },
    },
    {
      target: "#subtitles-section-step",
      title: "مشاهده معنی هر کلمه",
      content:
        "با لمس هر کلمه میتوانید معنی و اطلاعات کامل کلمه لمس شده را ببینی و همین صحنه از محتوا رو فلش‌کارتش کنی.",
      placement: "bottom",
      locale: { skip: null },
    },
    {
      target: "#seventh-step",
      title: "بازگویی و مقایسه جمله",
      content:
        "بهترین تمرین برای اسپیکینگ و ریدینگ، دیالوگ درحال پخش رو تکرار کن و میزان تشابهش رو به شما نشون میدیم",
      placement: "top",
      locale: { skip: null },
    },
    {
      target: "#third-step",
      title: "اجزای جمله هر دیالوگ",
      content:
        "استاد جمله‌سازی و گرامر شو، اجزای تشکیل دهنده هر دیالوگ رو وقتی که یک زیرنویس  فعال بود ببین و یادبگیر.",
      placement: "top",
      locale: { skip: null },
    },
    {
      target: "#sixth-step",
      title: "تکرار جمله",
      content:
        "میخوای دقیقاً مثل شخصیتهای فیلم صحبت کنی؟ 🔁 با هر کلیک، دیالوگ رو با صدای استاندارد بشنو!",
      placement: "top",
      locale: { skip: null },
    },
    {
      target: "#fourth-step",
      title: "لیست فلش‌کارت‌های این فیلم",
      content:
        "معجزه یا فلش‌کارت؟ چون داری از همون دیالوگ‌هایی که عاشقشونی درس میگیری سرعت یادگیریت هم 3 برابره و 70درصد ماندگاری بیشتر توی ذهنت داره، و اینجوری مغزتون ناخودآگاه گرامر و تلفظ رو میپذیره.!",
      placement: "top",
      locale: { skip: null },
    },
    {
      target: "#fifth-step",
      title: "گرامر جمله درحال پخش",
      content:
        "در این بخش به کمک هوش مصنوعی به شما گرامر هر جمله توضیح داده میشه، هم به زبان فارسی هم انگلیسی.",
      placement: "top",
      locale: { skip: null },
    },
    {
      target: "#second-step",
      title: "لیست زیرنویس‌ها",
      content:
        "این بخش برای دسترسی به لیست کل زیرنویس‌ها است، به راحتی با کلیک روی هر زیرنویس برید به همون دقیقه از فیلم.",
      placement: "top",
      locale: { skip: null },
    },
    {
      target: "#eighth-step",
      title: "تنظیمات پلیر",
      content: `با کلیک روی تنظیمات، میتونید سرعت پخش (اگر برات سرعتش زیاد یا کمه)، اندازه زیرنویس‌ها، مدیریت نمایش زیرنویس‌ها ${
        isIOS ? "" : "،تماشای تمام صفحه"
      } را کنترل کنید.`,
      placement: "bottom",
      hideBackButton: true,
      locale: { skip: null },
    },
  ];

  const handleTourCallback = (data: CallBackProps) => {
    const { action, status } = data;

    if (action === "skip" || action === "close") {
      localStorage.setItem("onboardingCompleted", "true");
      setRunTour(false);
    }
    if (status === "finished" || status === "skipped") {
      localStorage.setItem("onboardingCompleted", "true");
      setRunTour(false);
    }
  };

  useEffect(() => {
    const isTourCompleted = localStorage.getItem("onboardingCompleted");

    if (isTourCompleted !== "true" && currentCaptionIndex > 0) {
      setTimeout(() => {
        pause();
        setRunTour(true);
      }, 1000);
    }
  }, [currentCaptionIndex]);

  if (!runTour) {
    return;
  }

  return (
    <div>
      <Joyride
        steps={TOUR_STEPS}
        run={runTour}
        continuous
        scrollToFirstStep
        showProgress
        showSkipButton
        callback={handleTourCallback}
        spotlightPadding={10}
        locale={persianLocale}
        hideCloseButton
        disableCloseOnEsc
        disableOverlayClose
        styles={{
          options: {
            arrowColor: theme.palette.text.main,
            backgroundColor: theme.palette.background.main,
            textColor: theme.palette.text.main,
            zIndex: 99999,
          },
          tooltipTitle: {
            fontWeight: 600,
            color: theme.palette.text.primary,
          },
          tooltip: {
            borderRadius: 12,
            padding: 24,
          },
          tooltipContent: {
            direction: "rtl",
          },
          buttonNext: {
            backgroundColor: theme.palette.background.primary,
            color: theme.palette.text.main,
            borderRadius: 8,
            width: 120,
          },
          buttonBack: {
            color: "red",
            fontWeight: 500,
          },
        }}
      />
    </div>
  );
};

export default PlayerOnboardingTour;
