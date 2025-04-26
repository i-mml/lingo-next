"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PrimaryButton from "../../components/shared/PrimaryButton";
import { useQueryClient } from "@tanstack/react-query";

const PaymentRedirect = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const target = searchParams.get("target");
  const status = searchParams.get("status");
  const description = searchParams.get("description");

  useEffect(() => {
    queryClient.invalidateQueries();
    queryClient.removeQueries();
  }, []);

  return (
    <div className="grid place-items-center bg-layout h-[100vh]">
      <div className="w-[90%] max-w-[350px] border border-primary py-8 px-4 rounded-xl cards-md-box-shadow m-2">
        <Image
          alt="logo"
          src="/zabano-main-logo.png"
          className="w-28 mx-auto"
          width={112}
          height={112}
          priority
        />
        <div
          className={`$${
            Number(status) === 1 ? "text-green-500" : "text-red-500"
          } text-center font-semibold text-xl lg:text-2xl mt-4`}
        >
          تراکنش {Number(status) === 1 ? "موفق" : "ناموفق"}
        </div>

        <div className="text-main text-lg lg:text-xl text-center mt-4">
          {description || "این یک توضیح تستی میباشد"}
        </div>

        <Link href={target === "SITE" ? "zabano://return" : "/app/account"}>
          <PrimaryButton className="w-full mt-6" onClick={() => {}}>
            بازگشت به {target === "SITE" ? "اپلیکیشن" : "سایت"}
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default PaymentRedirect;
