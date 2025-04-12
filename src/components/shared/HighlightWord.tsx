import clsx from "clsx";
import React from "react";

const HighlightWord = ({
  sentence = "",
  targetWord = "",
}: {
  sentence: string;
  targetWord: string;
}) => {
  const removePunctuation = (word: string) => {
    return word.replace(/[.,!?]/g, "");
  };

  const isExactMatch = (word: string) => {
    const cleanedWord = removePunctuation(word);
    const cleanedTarget = removePunctuation(targetWord);
    return cleanedWord === cleanedTarget;
  };

  return sentence.split(" ").map((word: string, index) => (
    <span
      className={clsx(
        "font-medium",
        isExactMatch(word) ? "text-primary" : "text-main"
      )}
      key={index}
    >
      {word + " "}
    </span>
  ));
};

export default HighlightWord;
