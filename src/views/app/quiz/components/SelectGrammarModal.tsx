"use client";

import { GetEducationGrammars } from "@/api/services/education";
import CustomModal from "@/components/shared/CustomModal";
import PrimaryButton from "@/components/shared/PrimaryButton";
import WaveLoading from "@/components/shared/WaveLoading";
import useThemeCreator from "@/hooks/use-theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface IProps {
  selectGrammarModal: boolean;
  toggleSelectGrammar: () => void;
  handleSelectGrammar: (topicId: number) => void;
}

const SelectGrammarModal = (props: IProps) => {
  const { selectGrammarModal, toggleSelectGrammar, handleSelectGrammar } =
    props;
  const { theme }: any = useThemeCreator();

  const { data, isLoading } = useQuery({
    queryKey: ["get-grammars-list-for-quiz"],
    queryFn: () => GetEducationGrammars(""),
  });

  return (
    <CustomModal open={selectGrammarModal} toggle={toggleSelectGrammar}>
      <div className="w-full min-h-[60vh]">
        <div className="pt-10">
          <div className="text-main font-bold text-[16px] lg:text-2xl text-center mb-6">
            گرامر مورد نظرتون رو انتخاب کنید
          </div>
        </div>
        {isLoading ? (
          <WaveLoading />
        ) : (
          <div className="w-full">
            {data?.results?.map((item: any) => (
              <Accordion
                classes={{
                  root: "w-full mb-4 lg:mb-6 !rounded-xl border-b border-r-[6px] border-primary !bg-backgroundLayout relative",
                }}
                style={{
                  backgroundColor: theme.palette?.background?.main,
                }}
                key={item.id}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      style={{ color: theme.palette?.text?.main }}
                    />
                  }
                  aria-controls={item?.name}
                  id={item?.name}
                  className="!py-2"
                  classes={{ content: "!block !bg-backgroundLayout" }}
                >
                  <div className="font-semibold text-[16px] lg:text-xl text-main">
                    {item?.name || ""}
                  </div>
                  <div className="text-[10px] lg:text-sm text-gray400 mt-2">
                    {item?.persian_description || ""}
                  </div>
                </AccordionSummary>
                <AccordionDetails className="bg-layout !rounded-b-xl border-none">
                  {item?.subcategories?.map((node: any, index: number) => (
                    <div
                      className={`flex items-center justify-between gap-4 py-4 lg:py-6 ${
                        index !== item?.subcategories?.length - 1 && "border-b"
                      } border-gray400`}
                      key={node?.id}
                    >
                      <div className="flex-1">
                        <h4 className="text-main text-sm lg:text-lg font-bold">
                          سطح {node?.name}
                        </h4>
                        <p className="text-gray300 text-[10px] mt-0.5 lg:text-sm line-clamp-2 lg:line-clamp-1">
                          {node?.persian_description}
                        </p>
                      </div>

                      <PrimaryButton
                        className="w-1/3 lg:w-1/5 !h-12"
                        onClick={() => handleSelectGrammar(item?.id)}
                      >
                        شروع کوئیز
                      </PrimaryButton>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default SelectGrammarModal;
