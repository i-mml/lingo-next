import React from "react";
import FlashCardItem from "./FlashCardItem";

const FlashCardList = ({
  data = [],
  refetch,
}: {
  data: any[];
  refetch: () => void;
}) => {
  return (
    <div className="flex items-center flex-wrap justify-between mt-4 md:mt-8">
      {data?.map((item) => (
        <FlashCardItem item={item} key={item?.id} refetch={refetch} />
      ))}
    </div>
  );
};

export default FlashCardList;
