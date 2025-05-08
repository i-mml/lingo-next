import { ContentType } from "@/views/catalog/types";

export interface CmsCatalogItem {
  id: number;
  title: string;
  slug: string;
  is_locked: boolean;
  description: string;
  difficulty: number;
  difficulty_name: string;
  language: number;
  accent: number;
  image: string;
  preview_image: string;
  banner_image: string;
  content_type: ContentType;
  content_owner: string;
  duration: number | null;
  publish_date: string | null;
  created_at: string;
  updated_at: string;
  is_bookmarked: boolean;
}

export interface CmsCatalogList {
  title: string;
  movies: CmsCatalogItem[];
}

export interface CmsBannerItem {
  id: number;
  title: string;
  slug: string;
  is_locked: boolean;
  description: string;
  difficulty: number;
  difficulty_name: string;
  language: number;
  accent: number;
  image: string;
  preview_image: string;
  banner_image: string;
  content_type: ContentType;
  publish_date: string | null;
  created_at: string;
  updated_at: string;
}
export interface IPostsParams {
  page?: number;
  page_size?: number;
  search?: string;
  user_username: number;
}
