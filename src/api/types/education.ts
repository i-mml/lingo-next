// vocabulary
export interface VocabularyListItem {
  id: number;
  title: string;
  description: string;
  image: string;
}
export interface VocabularyCategoryLesson {
  id: number;
  title: string;
  description: string;
  word_category: number;
  created_at: string;
  completed: boolean;
}
export interface WordDefinition {
  language: string;
  definition: string;
  example: string;
}
export interface LessonWord {
  id: number;
  text: string;
  tag: string;
  lemma: string;
  cefr_level: string;
  persian_translate: string;
  definitions: WordDefinition[];
  synonyms: any;
  antonyms: any;
}
