"use client";

import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Link from "next/link";
import React from "react";

const mockPosts = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  content_data: {},
}));

const TeacherPosts = ({ posts }: any) => {
  return (
    <div className="grid grid-cols-3 mt-4">
      {mockPosts
        // ?.filter((node: any) => !!node?.content_data?.file)
        ?.map((item: any) => (
          <Link
            href={`/app/post/${item?.id}`}
            key={item?.id}
            className="aspect-square bg-gray-200 overflow-hidden border-r border-b border-main"
          >
            {item?.content_data?.movie_detail?.banner_image ? (
              <img
                alt={item?.content_data?.text}
                src={item?.content_data?.movie_detail?.banner_image}
                className="w-full h-full object-cover cursor-pointer"
              />
            ) : (
              <div className="bg-gray400 w-full h-full object-cover cursor-pointer grid place-items-center">
                <ImageOutlinedIcon className="!text-[26px] md:!text-[32px] text-white" />
              </div>
            )}
          </Link>
        ))}
    </div>
  );
};

export default TeacherPosts;
