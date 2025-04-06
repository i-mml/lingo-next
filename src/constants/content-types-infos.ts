import { ContentType, ContentTypeInfo } from "@/views/catalog/types";

export const contentTypeInfos: Record<ContentType, ContentTypeInfo> = {
  Book: {
    title: "کتاب صوتی",
    route: "audio-info",
    listRoute: "audio-book",
  },
  Music: {
    title: "موسیقی",
    route: "audio-info",
    listRoute: "music-list",
  },
  Podcast: {
    title: "پادکست",
    route: "podcast-info",
    listRoute: "podcast-list",
  },
  Animation: {
    title: "انیمیشن",
    route: "video-info",
    listRoute: "animations",
  },
  Serial: {
    title: "فیلم‌و‌سریال",
    route: "video-info",
    listRoute: "catalog",
  },
  Movie: {
    title: "فیلم‌و‌سریال",
    route: "video-info",
    listRoute: "catalog",
  },
};
