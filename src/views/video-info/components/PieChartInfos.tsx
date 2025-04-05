import React from "react";

const PieChartInfos = ({
  color,
  title,
  count,
}: {
  color: string;
  title: string;
  count: number;
}) => {
  return (
    <div className="flex items-center gap-2 mb-3 w-fit" dir="ltr">
      <span className={`w-6 h-6 rounded-full ${color}`}></span>
      <span className="text-gray400 w-6">{title}:</span>
      <span className="text-main w-6">{count}</span>
    </div>
  );
};

export default PieChartInfos;
