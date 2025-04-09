"use client";

import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export function InitialHeader() {
  const searchParams = useSearchParams();

  return (
    <header className="fixed w-full top-0 right-0 flex justify-center py-2 z-20 bg-white">
      <div className="z-1 flex w-full items-center justify-between gap-2 px-2 sm:px-8">
        <div className="flex flex-1 items-center justify-start">
          <Link href="https://www.instagram.com/zabano.app?igsh=MTN5bWJuMXg3czBmeQ==">
            <InstagramIcon className="!text-[38px] lg:!text-[50px] !text-black" />
          </Link>
        </div>
        {/* <Link
          to="/login"
          className="focus-visible group flex h-16 w-14 flex-col items-center gap-1 rounded-b-3xl bg-secondary/30 px-[6px] pt-2 text-2xl transition-colors hover:bg-primary/25 dark:bg-card dark:hover:bg-border/70 sm:size-32 sm:rounded-b-4xl sm:pt-4 sm:text-3xl lg:w-36 lg:text-4xl"
          title="Lingo app"
        > */}
        <Image
          src="/zabano-main-logo.png"
          className="w-12 lg:w-[90px] h-12 lg:h-[90px] group-hover:animate-bounce"
          alt="main"
          width={90}
          height={48}
        />

        <div className="flex flex-1 items-center justify-end">
          <Link
            href={
              !!searchParams.get("fbclid") ||
              !!searchParams.get("from_instagram")
                ? "/login?from_instagram=true"
                : "/login"
            }
            className="text-xl lg:text-2xl font-semibold !text-black"
          >
            ورود
          </Link>
        </div>
      </div>
    </header>
  );
}
