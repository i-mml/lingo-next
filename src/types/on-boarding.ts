export interface ILanguageLevel {
  id: number;
  translatedLevel: string;
  englishLevel: string;
  disabled: boolean;
}

import { ReactElement } from "react";

export interface IAvailableLanguage {
  id: number;
  icon: ReactElement;
  name: string;
  disabled: boolean;
}

export interface ICmsLanguage {
  id: number;
  name: string;
  code: string;
  icon: string;
}

export interface IAccent {
  id: number;
  name: string;
}

export interface IOnboardData {
  language: ICmsLanguage | null;
  accent: IAccent | null;
  level: number | null;
  weekly_time: number | null;
  referral_code: string | null;
  age_range?: number | null;
  user_goal?: number | null;
  learning_preference?: number | null;
}
