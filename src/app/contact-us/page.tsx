import React from "react";
import { Metadata } from "next";
import InitialLayoutDesktop from "@/components/layout/initil-layout";

export const metadata: Metadata = {
  title: "تماس با ما | زبانو",
  description: "فرم تماس با تیم زبانو - پلتفرم هوشمند آموزش زبان",
};

const ContactUsPage = () => {
  return (
    <InitialLayoutDesktop>
      <div className="min-h-screen py-10 bg-backgroundMain">
        <div className="py-8 mt-4 max-w-[90%] mx-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-main mb-8 text-center">
              تماس با ما
            </h1>

            <p className="text-lg text-gray400 leading-8 text-center mb-10">
              برای ارتباط با تیم زبانو، لطفاً فرم زیر را تکمیل کنید. ما در اسرع
              وقت با شما تماس خواهیم گرفت.
            </p>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-main mb-2"
                >
                  شماره تماس
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-backgroundMain text-main"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-main mb-2"
                >
                  ایمیل (اختیاری)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-backgroundMain text-main"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-main mb-2"
                >
                  توضیحات
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-backgroundMain text-main resize-none"
                  placeholder="پیام خود را اینجا بنویسید..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                ارسال پیام
              </button>
            </form>

            <div className="mt-12 text-center">
              <h2 className="text-xl font-bold text-main mb-4">
                راه‌های دیگر ارتباط با ما
              </h2>
              <p className="text-gray400">ایمیل: info@zabano.com</p>
            </div>
          </div>
        </div>
      </div>
    </InitialLayoutDesktop>
  );
};

export default ContactUsPage;
