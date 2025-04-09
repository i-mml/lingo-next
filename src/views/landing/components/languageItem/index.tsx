"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const LanguageItem = ({ item }: any) => {
  const searchParams = useSearchParams();
  const fromInstagram =
    !!searchParams.get("fbclid") || !!searchParams.get("from_instagram");

  return (
    <Link
      href={fromInstagram ? "/public/home?from_instagram=true" : "/public/home"}
      className={`relative flex flex-col items-center justify-center w-[110px] h-[125px] p-[23px] rounded-[10px] bg-[#f8f8f8] shadow-md transition-opacity duration-200 ${
        item.available ? "opacity-100" : "opacity-30"
      } hover:h-[110px]`}
    >
      <img
        src={item?.image || ""}
        alt={item?.name}
        className="w-[47px] h-auto transition-all duration-200 hover:w-[60px]"
      />
      <div className="mt-[17px] text-[16px] font-bold text-[#20114a]">
        {item?.name}
      </div>
      {!item.available && (
        <div className="absolute top-[6%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white px-[10px] py-[5px] rounded-[5px] text-[12px] font-bold w-[60px]">
          به زودی
        </div>
      )}
    </Link>
  );
};

export default LanguageItem;
