import clsx from "clsx";
import React, { ReactNode } from "react";

interface IProps {
  wrapperClassName?: string;
  tabClassName?: string;
  listClassName?: string;
  tabList: { id: number; title: string; icon?: ReactNode }[];
  activeTab: number;
  onTabClick: (clickedTabId: number) => void;
}

const TabsWithBorder = ({
  wrapperClassName,
  tabClassName,
  listClassName,
  activeTab,
  tabList,
  onTabClick,
}: IProps) => {
  return (
    <div className={clsx("", wrapperClassName)}>
      <div
        className={clsx(
          "flex items-center gap-4 md:gap-8 px-[5%]",
          listClassName
        )}
      >
        {tabList?.map((item) => (
          <div
            className={clsx(
              `text-placeholder text-sm md:text-[16px] font-semibold pb-[11px] mb-[-1px] cursor-pointer`,
              activeTab === item.id ? "!text-main pb-0" : "",
              tabClassName
            )}
            key={item?.id}
            onClick={() => onTabClick(item?.id)}
          >
            {item?.icon}
            {item?.title}
            {activeTab === item.id && (
              <div className="w-[60%] h-1 mt-1 bg-primary mx-auto rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsWithBorder;
