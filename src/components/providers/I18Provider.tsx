"use client";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { useEffect } from "react";
import { useLanguage } from "@/store";

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
      });
    };

    loadResources();
  }, [language]);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
