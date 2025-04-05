import { Dispatch, SetStateAction } from "react";
import AccentIcon from "@/assets/accent.svg";
import EnglishFlag from "@/assets/english-flag.svg";
import UsaFlag from "@/assets/us.svg";

import { IAvailableLanguage } from "@/types/on-boarding";

export const availableLanguageAccent: IAvailableLanguage[] = [
  {
    id: 1,
    icon: <UsaFlag />,
    name: "American",
    disabled: false,
  },
  {
    id: 2,
    icon: <EnglishFlag />,
    name: "British",
    disabled: false,
  },
];
