"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { InitialHeader } from "./components/Header";

const InitialLayoutDesktop = ({ children }: { children: ReactNode }) => {
  let pathname = usePathname();

  if (pathname === "/login") {
    return children;
  }

  return (
    <section className="!bg-white">
      <InitialHeader />
      <div className="pt-20 w-full">{children}</div>
      <footer dir="rtl">
        <div className="px-[5%] flex items-center justify-between flex-col lg:flex-row gap-4">
          <div className="">
            <p className="text-black text-2xl font-semibold">
              یادگیری زبان به روشی نوین
            </p>
          </div>
          <a
            referrerPolicy="origin"
            target="_blank"
            href="https://trustseal.enamad.ir/?id=516664&Code=mLN8y9GXSzfqHXof2IdYRi5nb70tufRe"
            rel="noreferrer"
          >
            <img
              referrerPolicy="origin"
              src="https://trustseal.enamad.ir/logo.aspx?id=516664&Code=mLN8y9GXSzfqHXof2IdYRi5nb70tufRe"
              alt=""
              style={{ cursor: "pointer" }}
              //   code="mLN8y9GXSzfqHXof2IdYRi5nb70tufRe"
            />
          </a>
        </div>
        <div className="bg-white py-4 text-gray400 text-[12px] lg:text-[16px] font-semibold text-center">
          کلیه حقوق برای شرکت زبانو محفوظ است 2024©
        </div>
      </footer>
    </section>
  );
};

export default InitialLayoutDesktop;
