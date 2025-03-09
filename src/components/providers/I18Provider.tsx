"use client";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { useEffect } from "react";
import { useLanguage } from "@/store";
import English from "@/locales/en";
import Farsi from "@/locales/fa";
import German from "@/locales/de";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  useEffect(() => {
    const loadResources = async () => {
      await i18next.init({
        lng: language,
        fallbackLng: "EN",
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
        resources: {
          EN: {
            translation: English,
          },
          FA: {
            translation: Farsi,
          },
          DE: {
            translation: German,
          },
        },
      });
    };

    loadResources();
  }, [language]);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
