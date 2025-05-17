import React from "react";
import { format } from "date-fns";
import { Calendar, Clock, Users, CheckCircle, AlertCircle } from "lucide-react";

interface ClassCardProps {
  classData: {
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
  };
}

const ClassCard: React.FC<ClassCardProps> = ({ classData }) => {
  const formatTime = (time: string) => {
    return format(new Date(`2000-01-01T${time}`), "h:mm a");
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "MMM dd, yyyy");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
      {/* Header with Status */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Class #{classData.id}
          </h3>
          <p className="text-sm text-gray-500">{classData.user_email}</p>
        </div>
        <div className="flex items-center gap-2">
          {classData.payment_status.is_paid ? (
            <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              {classData.status_display}
            </span>
          ) : (
            <span className="flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
              <AlertCircle className="w-4 h-4" />
              Pending Payment
            </span>
          )}
        </div>
      </div>

      {/* Schedule Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Schedule</p>
              <p className="text-sm">{classData.schedule_info.day_of_week}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Time</p>
              <p className="text-sm">
                {formatTime(classData.schedule_info.start_time)} -{" "}
                {formatTime(classData.schedule_info.end_time)}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-sm">
                {formatDate(classData.schedule_info.start_date)} -{" "}
                {formatDate(classData.schedule_info.end_date)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Enrollment</p>
              <p className="text-sm">
                {classData.schedule_info.current_enrollment} /{" "}
                {classData.schedule_info.capacity} students
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      {classData.payment_status.is_paid && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Payment Tracking #</span>
            <span className="font-medium">
              {classData.payment_status.payment_tracking_number}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
            <span>Payment Date</span>
            <span className="font-medium">
              {format(
                new Date(classData.payment_status.payment_date),
                "MMM dd, yyyy"
              )}
            </span>
          </div>
        </div>
      )}

      {/* Session Count */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Sessions</span>
          <span className="font-medium text-primary">
            {classData.session_count}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
