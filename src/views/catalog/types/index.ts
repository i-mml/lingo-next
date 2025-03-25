import { CmsBannerItem, CmsCatalogItem, CmsCatalogList } from "@/api/types/cms";

export interface CatalogPageTypes {
  isAnimation?: boolean;
  isFreeOnly?: boolean;
  catalogData: CmsCatalogList[];
  banners: CmsBannerItem[];
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
