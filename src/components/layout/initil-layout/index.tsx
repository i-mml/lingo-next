"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { InitialHeader } from "./components/Header";
import Image from "next/image";
import Link from "next/link";

const InitialLayoutDesktop = ({ children }: { children: ReactNode }) => {
  let pathname = usePathname();

  if (pathname === "/login") {
    return children;
  }

  return (
    <section className="">
      <div className="w-full">{children}</div>
      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <span className="text-3xl">
                  <Image
                    src="/zabano-main-logo.png"
                    alt="logo"
                    width={45}
                    height={45}
                    className="w-[45px] h-[45px]"
                  />
                </span>
                <span className="text-2xl font-bold text-white">زبانو</span>
              </Link>
              <p className="text-gray-400 text-sm">
                یادگیری زبان با تکنولوژی پیشرفته و محتوای جذاب
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--primary)]/20 transition-all duration-300"
                >
                  <span className="text-xl">📱</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--primary)]/20 transition-all duration-300"
                >
                  <span className="text-xl">📧</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--primary)]/20 transition-all duration-300"
                >
                  <span className="text-xl">📞</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-6">دسترسی سریع</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/public/home"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    صفحه اصلی
                  </Link>
                </li>
                <li>
                  <Link
                    href="/public/download-app"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    دانلود اپلیکیشن
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    ثبت نام / ورود
                  </Link>
                </li>

                <li>
                  <Link
                    href="/public/contact-us"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    تماس با ما
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-6">دفتر مرکزی</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="text-[var(--primary)]">📍</span>
                  تهران ، خیابان آزادی ، کارخانه نوآوری آزادی
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="text-[var(--primary)]">📧</span>
                  info@zabano.com
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 زبانو. تمامی حقوق محفوظ است.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  سوالات متداول
                </Link>
                <Link
                  href="/terms-and-privacy"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  قوانین و مقررات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default InitialLayoutDesktop;
