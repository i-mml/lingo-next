"use client";

import React from "react";
import ClassCard from "./components/ClassCard";
import { BookOpen } from "lucide-react";

interface ClassData {
  id: number;
  schedule_info: {
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    day_of_week: string;
    capacity: number;
    current_enrollment: number;
  };
  session_count: number;
  status: number;
  status_display: string;
  payment_status: {
    is_paid: boolean;
    payment_date: string;
    payment_tracking_number: string;
  };
  user_email: string;
}

const MyClasses: React.FC = () => {
  // This would typically come from an API call
  const classes: ClassData[] = [
    {
      id: 1,
      schedule_info: {
        start_date: "2025-05-08",
        end_date: "2025-06-08",
        start_time: "11:00:00",
        end_time: "14:03:00",
        day_of_week: "شنبه و دوشنبه",
        capacity: 10,
        current_enrollment: 1,
      },
      session_count: 20,
      status: 2,
      status_display: "Payment Confirmed",
      payment_status: {
        is_paid: true,
        payment_date: "2025-05-08T08:28:14.843530Z",
        payment_tracking_number: "223608435231",
      },
      user_email: "mehdishariati12@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-600 mt-1">
            View and manage your enrolled classes
          </p>
        </div>

        {/* Classes List */}
        {classes.length > 0 ? (
          <div className="space-y-6">
            {classes.map((classData) => (
              <ClassCard key={classData.id} classData={classData} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Classes Found
              </h3>
              <p className="text-gray-600 max-w-sm">
                You haven't enrolled in any classes yet. Browse our available
                classes to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClasses;
