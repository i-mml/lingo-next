import React from "react";
import useTextSteamer from "@/hooks/use-text-streamer";
import { HTMLParser } from "@/utils/html-parser";

const GrammarStreamBox = ({
  texts,
  className,
  isEng,
}: {
  texts: string[];
  className?: string;
  isEng?: boolean;
}) => {
  const textToShow = useTextSteamer(texts.join("\n"), 35, true);

  return (
    <div
      className={`text-main whitespace-pre-wrap leading-6 ${className}`}
      dir={isEng ? "ltr" : "rtl"}
    >
      {HTMLParser(
        textToShow?.replace(
          /\*\*(.*?)\*\*/g,
          '<span class="font-semibold">$1</span>'
        )
      )}
    </div>
  );
};

export default GrammarStreamBox;
