export type Sentence = {
  answers: string[];
  audio: string;
};

export type WriteAndCompareActivity = {
  id: string;
  type: "writeAndCompare";
  required: boolean;
  sentence: Sentence;
};

export type Activity = WriteAndCompareActivity; // Extend for other types as needed
