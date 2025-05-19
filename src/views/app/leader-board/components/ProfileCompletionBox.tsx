import React from "react";
import { User } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

interface UserPreference {
  preferred_language: number;
  preferred_accent: number;
  daily_goal: number;
  knowledge_level: number;
  preferred_accent_display: string;
  knowledge_level_display: string;
  preferred_language_display: {
    id: number;
    name: string;
    code: string;
    icon: string;
  };
}

interface ReferralInfo {
  referral_code: string;
  discount: {
    code: string;
    amount: number | null;
    percentage: number;
    packages: number[];
    is_active: boolean;
  };
  referred_count: number;
  referred_users: any[];
}

interface ChannelInfo {
  token: string;
  public_user_channel: string;
}

interface WhoAmIResponse {
  phone: string;
  name: string | null;
  email: string | null;
  birthday: string | null;
  userpreference: UserPreference;
  total_score: number;
  has_subscription: boolean;
  is_compeleted: boolean;
  referral_info: ReferralInfo;
  is_teacher: boolean;
  avatar: string | null;
  username: string | null;
  channel_info: ChannelInfo;
}

const ProfileCompletionBox: React.FC = () => {
  const { whoAmI } = useAuth();

  if (!whoAmI) return null;

  const missingFields = [];

  // Check required fields
  if (!whoAmI.avatar) missingFields.push("آواتار");
  if (!whoAmI.name || whoAmI.name.length < 2) missingFields.push("نام");
  if (!whoAmI.birthday) missingFields.push("تاریخ تولد");

  // Handle email and phone number logic
  if (!whoAmI.email && !whoAmI.phone) {
    missingFields.push("ایمیل یا شماره موبایل");
  } else if (whoAmI.phone && !whoAmI.email) {
    // missingFields.push("ایمیل");
  }

  // Check if username is in default format
  if (whoAmI.username && whoAmI.username.match(/^user-\d+$/)) {
    missingFields.push("نام کاربری یکتا");
  }

  if (missingFields.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-full hidden md:block">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-start gap-2 mb-2 md:mb-0 md:gap-0">
            <div className="bg-primary/10 p-3 rounded-full md:hidden">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-main md:mb-2">
              تکمیل پروفایل
            </h3>
          </div>
          <p className="text-gray400 mb-4">
            برای نمایش بهتر در جدول برترین‌ها و استفاده از تمام امکانات، لطفا
            اطلاعات زیر را در پروفایل خود تکمیل کنید:
          </p>
          <ul className="mb-4 flex items-center flex-wrap gap-4">
            {missingFields.map((field) => (
              <li key={field} className="flex items-center gap-2 text-gray300">
                <span className="w-2 h-2 bg-primary rounded-full" />
                {field}
              </li>
            ))}
          </ul>
          <Link
            href="/app/account/change-profile-information"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span>تکمیل پروفایل</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCompletionBox;
