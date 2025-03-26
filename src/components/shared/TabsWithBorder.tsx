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
    <div className={clsx("border-b border-placeholder", wrapperClassName)}>
      <div
        className={clsx(
          "flex items-center gap-4 md:gap-8 px-[5%]",
          listClassName
        )}
      >
        {tabList?.map((item) => (
          <div
            className={clsx(
              `text-placeholder text-sm md:text-[16px] font-semibold border-b border-placeholder pb-[11px] mb-[-1px] cursor-pointer`,
              activeTab === item?.id
                ? "!text-primary !border-b-[3px] !border-primary pb-2.5"
                : "",
              tabClassName
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
