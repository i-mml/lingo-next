"use client";

import React from "react";
import TeacherCard from "./components/TeacherCard";
import { useQuery } from "@tanstack/react-query";
import { GetAuthTeachers } from "@/api/services/auth";
import WaveLoading from "@/components/shared/WaveLoading";
import { TeacherItem } from "@/api/types/auth";

const TeachersListView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-teachers-list"],
    queryFn: GetAuthTeachers,
  });
  console.log({ data });

  if (isLoading) {
    return <WaveLoading />;
  }

  return (
    <div className=" px-[5%] py-5">
      <div className="flex items-center gap-4 !justify-start mb-5">
        <h1 className="text-lg lg:text-3xl font-bold text-main">لیست اساتید</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {data.map((item: TeacherItem) => (
          <TeacherCard {...item} key={item?.id} />
        ))}
      </div>
    </div>
  );
};

export default TeachersListView;
