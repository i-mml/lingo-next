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

export type ImageQuestionSingleChoiceTextAnswerActivity = {
  id: string;
  type: "imageQuestionSingleChoiceTextAnswer";
  required: boolean;
  question: {
    audio: string;
    image: string;
  };
  answers: {
    text: string;
    correct: boolean;
  }[];
};

export type Activity = WriteAndCompareActivity; // Extend for other types as needed
