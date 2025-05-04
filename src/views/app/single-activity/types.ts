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

export type FillTheGapsAndListenAudioActivity = {
  id: string;
  type: "fillTheGapsAndListenAudio";
  text: string;
  audio?: string;
  answers: {
    text: string;
    correct: boolean;
  }[];
  required: boolean;
  statement?: string;
  gapPosition?: number[];
  translation?: string;
};

export type Activity =
  | WriteAndCompareActivity
  | ImageQuestionSingleChoiceTextAnswerActivity
  | TextQuestionSingleChoiceImageAnswerActivity
  | FillTheGapsAndListenAudioActivity;
