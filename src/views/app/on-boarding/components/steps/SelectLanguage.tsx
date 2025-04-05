import ChinaFlag from "@/assets/cn.svg";
import GermanyFlag from "@/assets/de.svg";
import EarthIcon from "@/assets/earth.svg";
import EnglishFlag from "@/assets/english-flag.svg";
import SpainFlag from "@/assets/es.svg";
import FranceFlag from "@/assets/fr.svg";
import ItalyFlag from "@/assets/it.svg";
import { IAvailableLanguage } from "@/types/on-boarding";

export const availableLanguage: IAvailableLanguage[] = [
  {
    id: 2,
    icon: <EnglishFlag />,
    name: "انگلیسی",
    disabled: false,
  },
  {
    id: 5,
    icon: <GermanyFlag />,
    name: "آلمانی",
    disabled: false,
  },
  {
    id: 3,
    icon: <SpainFlag />,
    name: "اسپانیایی",
    disabled: true,
  },
  {
    id: 4,
    icon: <FranceFlag />,
    name: "فرانسوی",
    disabled: true,
  },
  {
    id: 6,
    icon: <ItalyFlag />,
    name: "ایتالیایی",
    disabled: true,
  },
  {
    id: 7,
    icon: <ChinaFlag />,
    name: "چینی",
    disabled: true,
  },
];
