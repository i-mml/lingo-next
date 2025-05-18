"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import React from "react";
import UserInformationForm from "./UserInformationForm";
import BackIconComponent from "@/components/shared/BackIconComponent";

const EditProfileInformation = () => {
  const router = useRouter();
  const { whoAmI } = useAuth();

  return (
    <section className="bg-backgroundLayout pt-0 py-6 md:pt-6">
      <div className="pt-10 md:pt-2 px-[5%]">
        <BackIconComponent
          className="mb-5"
          clickHandler={() => router.push("/app/account")}
        />
        <UserInformationForm userData={whoAmI} />
      </div>
    </section>
  );
};

export default EditProfileInformation;
