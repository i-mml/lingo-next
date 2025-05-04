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

export type TextQuestionSingleChoiceImageAnswerActivity = {
  id: string;
  type: "textQuestionSingleChoiceImageAnswer";
  required: boolean;
  question: {
    text: string;
    audio?: string;
  };
  answers: {
    image: string;
    correct: boolean;
  }[];
};

export type Activity =
  | WriteAndCompareActivity
  | ImageQuestionSingleChoiceTextAnswerActivity
  | TextQuestionSingleChoiceImageAnswerActivity; // Extend for other types as needed
