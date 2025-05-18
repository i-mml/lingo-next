import Image from "next/image";
import Link from "next/link";
import React from "react";

const SettingsItem = ({
  title,
  link,
  icon,
}: {
  title: string;
  link: string;
  icon: string;
}) => {
  return (
    <Link
      href={link}
      className="flex items-center w-full max-w-[500px] bg-backgroundMain rounded-2xl py-2 md:py-4 px-3 mb-4 gap-4"
    >
      <div className="bg-layout rounded-full w-12 h-12 grid place-items-center">
        <Image
          alt="title"
          width={36}
          height={36}
          src={icon}
          className="w-9 h-9"
        />
      </div>
      <div className="text-[16px] md:text-xl font-medium text-main">
        {title}
      </div>
    </Link>
  );
};

export default SettingsItem;
