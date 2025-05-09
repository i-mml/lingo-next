export type Unit = {
  id: number;
  unit_id: string;
  title: string;
  level_id: number;
  level_text: string;
  grammar_description: string;
  practical_use: string;
  summary: string;
  finished: boolean;
  words: number;
  accents: string[];
  images: string[];
  covers: string[];
  activities: any[];
  is_locked?: boolean;
  is_finished?: boolean;
};
