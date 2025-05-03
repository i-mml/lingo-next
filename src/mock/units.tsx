import React from "react";
import VideoIcon from "@/assets/video-unit.svg";
import WriteIcon from "@/assets/write-unit.svg";
import InterpretIcon from "@/assets/interpret-unit.svg";
import GrammarVideoIcon from "@/assets/grammar-video-unit.svg";
import GrammarExercisesIcon from "@/assets/grammar-exercises-unit.svg";
import VocabularyIcon from "@/assets/vocabulary-unit.svg";
import AssessmentIcon from "@/assets/assesment-unit.svg";
import SpeakIcon from "@/assets/speak-unit.svg";

export const activitiesDictionary = {
  film: {
    key: "film",
    icon: <VideoIcon />,
    skill: "Listening",
  },
  speak: {
    key: "speak",
    icon: <SpeakIcon />,
    type: "Speaking",
  },
  write: {
    key: "write",
    label: "Write",
    icon: <WriteIcon />,
    color: "bg-green-100",
    type: "Writing",
    time: "4 min.",
  },
  roleplay: {
    key: "interpret",
    icon: <InterpretIcon />,
    type: "Speaking",
  },
  videoClass: {
    key: "grammar_video",
    icon: <GrammarVideoIcon />,
    type: "Grammar",
  },
  grammarExercises: {
    key: "grammar_exercises",
    icon: <GrammarExercisesIcon />,
    type: "Grammar",
  },
  vocabulary: {
    key: "vocabulary",
    icon: <VocabularyIcon />,
    type: "Vocabulary",
  },
  evaluation: {
    key: "assessment",
    icon: <AssessmentIcon />,
    type: "Assessment",
  },
};
