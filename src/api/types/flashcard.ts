export interface FlashCardType {
  base_movie_file: string;
  episode: number;
  episode_detail: { name: string; duration: number };
  file: string;
  grammatical_json: string;
  id: number;
  is_learned: boolean;
  movie_detail: any;
  text: string;
  time_end: number;
  time_start: number;
  times_seen: number;
  translation: string;
  type: string;
  word: string;
  word_rel: number;
  word_rel_foreign: number;
  word_translation: string;
}
