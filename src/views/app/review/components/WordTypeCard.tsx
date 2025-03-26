import { grammarBoxColors } from "@/constants/grammar-box-colors";
import React from "react";

interface IProps {
  title: string;
}

const WordTypeCard = (props: IProps) => {
  const { title = "" } = props;
  const rndInt = Math.floor(Math.random() * 3) + 1;

  return (
    <div
      className="w-fit px-1 py-2 rounded-[200px] text-xs md:text-sm text-center"
      style={{
        color: grammarBoxColors?.[rndInt].txt,
        backgroundColor: grammarBoxColors?.[rndInt].bg,
      }}
    >
      {title}
    </div>
  );
};

export default WordTypeCard;
