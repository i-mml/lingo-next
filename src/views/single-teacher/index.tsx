import { GetAuthTeachersById } from "@/api/services/auth";
import { GetCmsPosts } from "@/api/services/cms";
import { IPostsParams } from "@/api/types/cms";
import TabsWithBorder from "@/components/shared/TabsWithBorder";
import WaveLoading from "@/components/shared/WaveLoading";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import TeacherBio from "./components/TeacherBio";
import TeacherIntro from "./components/TeacherIntro";
import TeacherPosts from "./components/TeacherPosts";
import TeacherCard from "../teachers/components/TeacherCard";

const TeacherProfileView = () => {
  const { teacherId } = useParams();
  const [currentTab, setCurrentTab] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["get-teachers-by-id", teacherId],
    queryFn: () => GetAuthTeachersById(teacherId as string),
  });

  const { data: posts } = useQuery({
    queryKey: ["get-teachers-post-by-id"],
    queryFn: () =>
      GetCmsPosts({ user_username: Number(teacherId) } as IPostsParams),
  });

  const tabsList = [
    {
      id: 1,
      title: "معرفی",
      icon: <InfoOutlinedIcon />,
    },
    {
      id: 2,
      title: "پست‌ها",
      icon: <GridOnOutlinedIcon />,
    },
  ];

  if (isLoading) {
    return <WaveLoading />;
  }
  return (
    <div className="px-[5%] py-5 max-w-2xl mx-auto">
      <TeacherCard {...data} />
      <TabsWithBorder
        activeTab={currentTab}
        tabList={tabsList}
        onTabClick={setCurrentTab}
      />

      {currentTab === 1 ? <TeacherIntro /> : null}
      {currentTab === 2 ? <TeacherPosts posts={posts?.results} /> : null}
    </div>
  );
};

export default TeacherProfileView;
