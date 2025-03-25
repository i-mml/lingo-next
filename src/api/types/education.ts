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
