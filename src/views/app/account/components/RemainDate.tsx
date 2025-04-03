import useThemeCreator from "@/hooks/use-theme";
import React from "react";

const RemainDate = ({
  remainDay = 0,
  wholePeriod = 0,
}: {
  remainDay: number;
  wholePeriod: number;
}) => {
  const calculatedWdth = `${(remainDay / wholePeriod) * 100}`;

  const { theme }: any = useThemeCreator();

  return (
    <div
      className="w-[141px] h-[141px] grid place-items-center my-auto mx-auto lg:mr-auto rounded-[50%]"
      style={{
        background: `radial-gradient(closest-side, ${
          theme?.palette?.background?.main
        } 80%, transparent 80% 100%),conic-gradient(${
          remainDay < 7 ? "red" : theme?.palette?.background?.primary
        } ${calculatedWdth}%, #e7e7e7 0)`,
      }}
    >
      <div className="text-center text-main text-lg">
        <div className="text-center text-main text-2xl">{remainDay}</div>
        <div className="text-center text-main text-lg">روز مانده</div>
      </div>
    </div>
  );
};

export default RemainDate;
