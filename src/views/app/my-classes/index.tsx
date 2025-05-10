"use client";

import { GetAcademyBookings } from "@/api/services/academy";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MyClassesView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-booked-classes-list"],
    queryFn: () => GetAcademyBookings(),
  });

  return <div>MyClassesView</div>;
};

export default MyClassesView;
