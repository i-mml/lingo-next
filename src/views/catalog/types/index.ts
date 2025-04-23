import { CmsBannerItem, CmsCatalogItem, CmsCatalogList } from "@/api/types/cms";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CatalogPageTypes {
  isAnimation?: boolean;
  isFreeOnly?: boolean;
  catalogData: CmsCatalogList[];
  banners: CmsBannerItem[];
  faqData?: FaqItem[];
}

export type ContentType =
  | "Book"
  | "Music"
  | "Podcast"
  | "Animation"
  | "Serial"
  | "Movie";

export type ContentTypeInfo = {
  title: string;
  route: string;
  listRoute: string;
};
