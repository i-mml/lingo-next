"use client";

import React, { FC, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FaqItem } from "../types";

interface FaqSectionProps {
  faqData: FaqItem[];
}

const FaqSection: FC<FaqSectionProps> = ({ faqData }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  if (!faqData || faqData.length === 0) {
    return null;
  }

  return (
    <div className="py-8 px-[3%] md:px-[5%] mt-10 max-w-[90%] mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-main mb-6 text-center">
        سوالات متداول درباره یادگیری زبان با محتوای تصویری
      </h2>
      <div className="flex flex-col gap-4">
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            className="border border-borderMain !rounded-lg cards-sm-box-shadow !bg-backgroundMain"
          >
            <AccordionSummary
              expandIcon={
                expanded === `panel${index}` ? (
                  <RemoveIcon className="text-main" />
                ) : (
                  <AddIcon className="text-main" />
                )
              }
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
              className="!bg-backgroundMain !rounded-lg cards-sm-box-shadow"
            >
              <span className="text-base md:text-lg font-medium text-main">
                {faq.question}
              </span>
            </AccordionSummary>
            <AccordionDetails className="bg-backgroundMain rounded-b-xl">
              <p className="text-base text-gray400 leading-7 text-justify">
                {faq.answer}
              </p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      {/* Structured Data for FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
};

export default FaqSection;
