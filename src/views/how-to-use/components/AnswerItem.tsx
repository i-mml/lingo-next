import React from "react";

interface IProps {
  title: string;
  description: string;
  num: number;
}

const AnswerItem = (props: IProps) => {
  const { title, description, num } = props;

  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-primary font-semibold">{num}</span>
      </div>
      <div>
        <h3 className="font-semibold mb-2 text-main">{title}</h3>
        <p className="text-gray400">{description}</p>
      </div>
    </div>
  );
};

export default AnswerItem;
