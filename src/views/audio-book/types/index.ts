import { CmsCatalogList } from "@/api/types/cms";

interface UserPreference {
  preferred_language?: number;
  preferred_accent?: number;
  weekly_time?: number;
  knowledge_level?: number;
  preferred_accent_display?: string;
  knowledge_level_display?: string;
  preferred_language_display?: {
    name: string;
    code: string;
    icon: string;
  };
}

interface WhoAmI {
  phone?: string;
  name?: string;
  email?: string;
  birthday?: string;
  userpreference?: UserPreference;
  total_score?: number;
  has_subscription?: boolean;
  is_compeleted?: boolean;
  referral_info?: any;
}

export interface AudioBookProps {
  contentType?: 2 | 3 | 4;
  audioBooks: CmsCatalogList[];
  whoAmI?: WhoAmI;
}
