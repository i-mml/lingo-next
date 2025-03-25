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
    return word?.replace(/[.,!?]/g, "");
  };

  const isPartOfTarget = (word: string) => {
    const cleanedWord = removePunctuation(word);
    const cleanedTarget = removePunctuation(targetWord);

    const index = cleanedTarget?.indexOf(cleanedWord);
    return index !== -1;
  };

  return sentence?.split(" ")?.map((word: string, index) => (
    // @ts-ignore
    <span
      className={clsx(
        "font-medium",
        !!isPartOfTarget(word) ? "text-primary" : "text-main"
      )}
      key={index}
    >
      {word + " "}
    </span>
  ));
};

export default HighlightWord;
