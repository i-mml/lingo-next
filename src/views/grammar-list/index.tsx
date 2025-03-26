"use client";

import { GrammarCategory } from "@/api/types/grammars";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Lottie from "lottie-react";
import GrammarLineal from "@/assets/lotties/grammar-lineal.json";
import useThemeCreator from "@/hooks/use-theme";

const GrammarListView = ({ grammars }: { grammars: GrammarCategory[] }) => {
  const { theme }: any = useThemeCreator();
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetGrammar =
    searchParams?.get("current_grammar")?.split(",") || null;

  const grammarsList = targetGrammar
    ? grammars?.filter((item: { id: number }) =>
        targetGrammar.includes(item.id.toString())
      )
    : grammars;

  const removeCurrentGrammarParam = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("current_grammar");

    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  return (
    <div className="px-[5%] py-8">
      <div className="flex items-center gap-4 !justify-start mb-6 lg:mb-8">
        <Lottie
          animationData={GrammarLineal}
          className="w-16 h-16 lg:w-[90px] lg:h-[90px]"
        />
        <header className="flex-1">
          <h1 className="text-lg lg:text-3xl font-bold text-main mb-2">
            آموزش گرامر زبان انگلیسی از صفر تا صد (کتاب Grammar in Use)
          </h1>
          <p className="text-gray400 text-sm lg:text-[16px]">
            با گرامر های زبانو تقریبا تمام مباحث گرامری برای سطوح مختلف رو
            میتونی یاد بگیری
          </p>
        </header>
      </div>

      <div className="gap-4">
        {grammarsList?.map((item: any) => (
          <Accordion
            classes={{
              root: "w-full mb-4 lg:mb-6 !rounded-xl border-b border-r-[6px] border-primary !bg-backgroundMain",
            }}
            style={{
              backgroundColor: theme.palette?.background?.main,
            }}
            key={item.id}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon style={{ color: theme.palette?.text?.main }} />
              }
              aria-controls={item?.name}
              id={item?.name}
              className="!py-2"
              classes={{ content: "!block !bg-backgroundMain" }}
            >
              <h2 className="font-semibold text-[16px] lg:text-xl text-main">
                {item?.name || ""}
              </h2>
              <p className="text-[10px] lg:text-sm text-gray400 mt-2">
                {item?.persian_description || ""}
              </p>
            </AccordionSummary>
            <AccordionDetails className="bg-layout !rounded-b-xl border-none">
              {item?.subcategories?.map((node: any, index: number) => (
                <div
                  className={`flex items-center justify-between gap-4 py-4 lg:py-6 ${
                    index !== item?.subcategories?.length - 1 && "border-b"
                  } border-gray400`}
                  key={node?.id}
                >
                  <div className="">
                    <h3 className="text-main text-sm lg:text-lg font-bold">
                      سطح {node?.name}
                    </h3>
                    <p className="text-gray300 text-[10px] mt-0.5 lg:text-sm line-clamp-2 lg:line-clamp-1">
                      {node?.persian_description}
                    </p>
                  </div>
                  <PrimaryButton
                    className="w-1/3 lg:w-1/5 !h-12"
                    onClick={() =>
                      router.push(`/app/grammar/${item?.id}/${node?.id}`)
                    }
                  >
                    آموزش
                  </PrimaryButton>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      {!!targetGrammar && (
        <PrimaryButton
          className="w-full md:w-[50%] mx-auto mt-5 block"
          onClick={removeCurrentGrammarParam}
        >
          مشاهده همه
        </PrimaryButton>
      )}
    </div>
  );
};

export default GrammarListView;
