"use client";

import {
  GetEducationGrammarById,
  GetEducationGrammarTopicsById,
} from "@/api/services/education";
import GrammarStreamBox from "@/components/shared/GrammarStreamBox";
import PrimaryButton from "@/components/shared/PrimaryButton";
import TabsWithBorder from "@/components/shared/TabsWithBorder";
import WaveLoading from "@/components/shared/WaveLoading";
import PrintIcon from "@mui/icons-material/Print";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const grammarTabsList = [
  {
    id: 1,
    title: "فارسی",
  },
  {
    id: 2,
    title: "انگلیسی",
  },
];

const SingleGrammarView = () => {
  const { grammarId, subcategoryId } = useParams();
  const [currentTab, setCurrentTab] = useState(1);
  const router = useRouter();

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const fetchGrammarDatas = async () => {
    const [grammarData, topicsData] = await Promise.all([
      GetEducationGrammarById(Number(grammarId)),
      GetEducationGrammarTopicsById(Number(grammarId), Number(subcategoryId)),
    ]);

    return { grammarData: grammarData?.data, topicsData: topicsData?.data };
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get-single-grammar-data", subcategoryId, grammarId],
    queryFn: fetchGrammarDatas,
    enabled: !!subcategoryId && !!grammarId,
  });
  console.log(data);

  const styleBaseOnLanguage: any =
    currentTab === 1
      ? { direction: "rtl", textAlign: "right" }
      : { direction: "ltr", textAlign: "left" };

  if (isLoading) {
    return (
      <div className="w-full h-[85vh] flex items-center justify-center">
        <WaveLoading />
      </div>
    );
  }
  return (
    <>
      <div className="px-[5%] py-8 min-h-[88vh]" ref={contentRef}>
        <div className="flex items-center">
          <h1
            className="text-xl lg:text-2xl font-bold text-main text-left"
            style={styleBaseOnLanguage}
          >
            {data?.grammarData?.name}
          </h1>
          <button
            className="ml-2 print:!hidden"
            onClick={() => reactToPrintFn()}
          >
            <PrintIcon className="text-primary !text-3xl lg:text-4xl mr-2" />
          </button>
          <PrimaryButton
            className="w-40 lg:w-80 mr-auto hidden md:block print:!hidden"
            onClick={() =>
              router.push(
                `/app/quiz/${grammarId}/${subcategoryId}?iGrammarQuiz=true`
              )
            }
          >
            کوئیز از همین گرامر
          </PrimaryButton>
        </div>
        <h2
          className={`text-main text-[16px] lg:text-lg mt-3`}
          style={styleBaseOnLanguage}
        >
          {currentTab === 1
            ? data?.grammarData?.persian_description
            : data?.grammarData?.english_description}
        </h2>

        <div className="bg-backgroundMain border border-gray400 w-full pt-5 pb-2 px-5 rounded-lg my-5 print:!hidden">
          {data?.topicsData?.results?.map((item: any, index: number) => (
            <a
              className="text-sm lg:text-[16px] text-gray300 font-medium flex gap-2 text-left mb-3"
              href={`#section_${item?.id}`}
              dir="ltr"
              key={index}
            >
              <span>{index + 1}.</span>
              <span className="line-clamp-1 underline">{item?.name || ""}</span>
            </a>
          ))}
        </div>
        <TabsWithBorder
          wrapperClassName="mb-5 lg:mb-8 !mt-0 print:!hidden"
          activeTab={currentTab}
          onTabClick={(id) => setCurrentTab(id)}
          tabList={grammarTabsList}
        />

        {data?.topicsData?.results?.map((node: any) => (
          <section
            key={node?.id}
            className="pt-1.5 lg:pt-3 mb-10 lg:mb-14"
            id={`section_${node?.id}`}
          >
            <GrammarStreamBox
              isEng={currentTab === 2}
              texts={[node?.name]}
              className={`font-bold pb-1 border-b-2 border-primary text-main mb-3 w-fit text-xl lg:text-2xl ${
                currentTab === 2 ? "mr-auto" : "ml-auto"
              }`}
            />

            <article
              className={`text-main text-[16px] lg:text-lg px-1.5 mb-4`}
              style={styleBaseOnLanguage}
            >
              {currentTab === 1 ? node?.description_fa : node?.description_en}
            </article>
            <article
              className={`text-main text-[16px] lg:text-lg px-2.5 font-medium flex items-start gap-1.5 mb-6 lg:mb-8`}
              style={styleBaseOnLanguage}
            >
              <span className="font-extrabold text-3xl h-fit text-primary">
                *
              </span>{" "}
              <span>
                {currentTab === 1 ? node?.grammar_fa : node?.grammar_en}
              </span>
            </article>

            {node?.examples?.map((example: any) => (
              <div
                key={example?.en}
                className="mb-3 lg:mb-4 border-spacing-0.5 border-primary border rounded-xl text-sm lg:text-lg text-main px-4 py-2 bg-backgroundMain"
              >
                <p className="text-left mb-1.5" dir="ltr">
                  {example?.en || ""}
                </p>
                <p>{example?.fa || ""}</p>
              </div>
            ))}
          </section>
        ))}

        <PrimaryButton
          className="fixed w-[90%] left-[5%] !block bottom-10 md:!hidden print:!hidden"
          onClick={() =>
            router.push(
              `/app/quiz/${grammarId}/${subcategoryId}?iGrammarQuiz=true`
            )
          }
        >
          کوئیز از همین گرامر
        </PrimaryButton>
      </div>
    </>
  );
};

export default SingleGrammarView;
