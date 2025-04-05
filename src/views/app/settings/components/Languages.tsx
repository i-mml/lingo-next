"use client";

import BackIconComponent from "@/components/shared/BackIconComponent";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import React from "react";
import LanguageInformationForm from "../../account/components/LanguageInformationForm";

const SettingsLanguages = () => {
  const router = useRouter();
  const { whoAmI } = useAuth();

  return (
    <section className="bg-backgroundLayout pt-0 py-6 md:pt-6 min-h-[100vh] ">
      <div className="pt-10 md:pt-2 px-[5%]">
        <BackIconComponent
          clickHandler={() => router.push("/app/settings")}
          className="mb-5"
        />
        {!!whoAmI?.userpreference && (
          <LanguageInformationForm
            userPereferenceData={whoAmI?.userpreference}
          />
        )}
      </div>
    </section>
  );
};

export default SettingsLanguages;
