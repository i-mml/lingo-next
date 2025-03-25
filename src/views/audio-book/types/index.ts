import { CmsCatalogList } from "@/api/types/cms";

export interface AudioBookProps {
  contentType?: 2 | 3 | 4;
  audioBooks: CmsCatalogList[];
}
