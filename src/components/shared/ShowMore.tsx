import React, { useState } from "react";

const ShowMore = ({
  text,
  maxLength,
  className,
  textClassName,
}: {
  text: string;
  maxLength: number;
  className: string;
  textClassName?: string;
}) => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className={className}>
      <p
        className={`text-main text-lg ${
          showMore ? "" : "line-clamp-4"
        } ${textClassName}`}
      >
        {text}
      </p>

      {!showMore && text?.length > maxLength && (
        <button
          onClick={toggleShowMore}
          className="w-full mt-2 text-sm text-gray400 md:text-base"
        >
          مشاهده بیشتر
        </button>
      )}
    </div>
  );
};

export default ShowMore;
