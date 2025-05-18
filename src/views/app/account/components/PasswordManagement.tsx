"use client";

import BackIconComponent from "@/components/shared/BackIconComponent";
import { useRouter } from "next/navigation";
import React from "react";
import ProfileChangePassword from "../../account/components/ProfileChangePassword";

const PasswordManagement = () => {
  const router = useRouter();

  return (
    <section className="bg-backgroundLayout pt-0 py-6 md:pt-6">
      <div className="pt-10 md:pt-2 px-[5%]">
        <BackIconComponent
          clickHandler={() => router.push("/app/account")}
          className="mb-5"
        />
        <ProfileChangePassword />
      </div>
    </section>
  );
};

export default PasswordManagement;
