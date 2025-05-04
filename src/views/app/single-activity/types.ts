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

export type FillTheGapsWithTextAndListenAudioActivity = {
  id: string;
  type: "fillTheGapsWithTextAndListenAudio";
  text: string;
  audio?: string;
  answers: string[];
  required: boolean;
  statement?: string;
  gapPosition?: number[];
  translation?: string;
};

export type RepeatAndCompareActivity = {
  id: string;
  type: "repeatAndCompare";
  required: boolean;
  sentences: {
    text: string;
    audio: string;
    translation?: string | null;
  }[];
};

export type Activity =
  | WriteAndCompareActivity
  | ImageQuestionSingleChoiceTextAnswerActivity
  | TextQuestionSingleChoiceImageAnswerActivity
  | FillTheGapsAndListenAudioActivity
  | FillTheGapsWithTextAndListenAudioActivity
  | RepeatAndCompareActivity;
