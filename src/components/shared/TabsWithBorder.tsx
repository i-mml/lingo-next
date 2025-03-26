import clsx from "clsx";
import React, { ReactNode } from "react";

interface IProps {
  wrapperClassName?: string;
  tabList: { id: number; title: string; icon?: ReactNode }[];
  activeTab: number;
  onTabClick: (clickedTabId: number) => void;
}

const TabsWithBorder = ({
  wrapperClassName,
  activeTab,
  tabList,
  onTabClick,
}: IProps) => {
  console.log(activeTab);
  return (
    <div className={clsx("border-b border-placeholder", wrapperClassName)}>
      <div className="flex items-center gap-4 md:gap-8 px-[5%]">
        {tabList?.map((item) => (
          <div
            className={clsx(
              `text-placeholder text-sm md:text-[16px] font-semibold border-b border-placeholder pb-[11px] mb-[-1px] cursor-pointer`,
              activeTab === item?.id
                ? "!text-primary !border-b-[3px] !border-primary pb-2.5"
                : ""
            )}
            key={item?.id}
            onClick={() => onTabClick(item?.id)}
          >
            {item?.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsWithBorder;
