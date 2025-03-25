"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";

const WordTranslateListItem = (props: { text: string; isBlurred: boolean }) => {
  const { isBlurred, text } = props;
  const [blurred, setBlurred] = useState(isBlurred);

  useEffect(() => {
    setBlurred(isBlurred);
  }, [isBlurred]);

  return (
    <div
      className={clsx(
        `p-1 rounded-lg cursor-pointer transition-all duration-300`,
        blurred ? "filter blur-[8px]" : "filter blur-none"
      )}
      onClick={(e) => {
        e.stopPropagation();
        setBlurred((prev) => !prev);
      }}
    >
      {text || ""}
    </div>
  );
};

export default WordTranslateListItem;
