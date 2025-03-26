export interface Example {
  en: string;
  fa: string;
}

export interface Topic {
  id: number;
  name: string;
  description_en: string;
  description_fa: string;
  grammar_en: string;
  grammar_fa: string;
  examples: Example[];
  slug: string;
  order: number;
  file: string | null;
}

export interface Subcategory {
  id: number;
  name: string;
  english_description: string;
  persian_description: string;
  topics: Topic[];
  order: number;
}

export interface GrammarCategory {
  id: number;
  name: string;
  level: string;
  english_description: string;
  persian_description: string;
  image: string;
  subcategories: Subcategory[];
  persian_name: string;
  slug: string;
  order: number;
}
