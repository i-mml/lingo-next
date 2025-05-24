import React from "react";
import GroupClassInfoCard from "@/components/shared/GroupClassInfoCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import moment from "moment-jalaali";

interface MyClassCardProps {
  classData: any;
}

const MyClassCard: React.FC<MyClassCardProps> = ({ classData }) => {
  // Map booking data to GroupClassInfoCard format
  const groupClass = {
    id: classData.id,
    course: {
      id: classData.course_id || 0,
      title: classData.class_title || "کلاس من",
      level: classData.class_level || "-",
      type: classData.class_type || "-",
      description: classData.class_description || "-",
      fee: classData.fee || 0,
      total_sessions: classData.session_count || 0,
      is_online: classData.is_online || false,
    },
    day_of_week: classData.schedule_info?.day_of_week || "-",
    start_time: classData.schedule_info?.start_time || "-",
    end_time: classData.schedule_info?.end_time || "-",
    start_date: classData.schedule_info?.start_date || "-",
    end_date: classData.schedule_info?.end_date || "-",
    capacity: classData.schedule_info?.capacity || 0,
    current_enrollment: classData.schedule_info?.current_enrollment || 0,
    available_capacity:
      (classData.schedule_info?.capacity || 0) -
      (classData.schedule_info?.current_enrollment || 0),
    payment_link: classData.payment_link || "",
  };

  return (
    <div className="bg-white dark:bg-[#181c20] rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-[#222]">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {classData.payment_status?.is_paid ? (
            <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium dark:bg-green-900 dark:text-green-300">
              <CheckCircleIcon fontSize="small" /> پرداخت شده
            </span>
          ) : (
            <span className="flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium dark:bg-yellow-900 dark:text-yellow-200">
              <ErrorIcon fontSize="small" /> پرداخت نشده
            </span>
          )}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500">
          {classData.user_email}
        </div>
      </div>
      <GroupClassInfoCard course={groupClass} variant="list" />
      {classData.payment_status?.is_paid && (
        <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
          <div className="flex items-center justify-between">
            <span>کد پیگیری پرداخت:</span>
            <span className="font-bold">
              {classData.payment_status.payment_tracking_number}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span>تاریخ پرداخت:</span>
            <span>
              {moment(classData.payment_status.payment_date).format(
                "jYYYY/jM/jD"
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClassCard;
