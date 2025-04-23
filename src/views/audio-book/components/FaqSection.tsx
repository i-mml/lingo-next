"use client";

import React, { FC, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Defining the FaqItem interface
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  contentType: number;
  audioBookFaqs: FaqItem[];
  musicFaqs: FaqItem[];
  podcastFaqs: FaqItem[];
  preferredLanguage?: number;
}

const FaqSection: FC<FaqSectionProps> = ({
  contentType,
  audioBookFaqs,
  musicFaqs,
  podcastFaqs,
  preferredLanguage = 2,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const language =
    preferredLanguage === 2
      ? "انگلیسی"
      : preferredLanguage === 5
      ? "آلمانی"
      : "انگلیسی";

  let faqs = audioBookFaqs;
  let title = `سوالات متداول درباره کتاب‌های صوتی ${language}`;

  if (contentType === 2) {
    faqs = musicFaqs;
    title = `سوالات متداول درباره یادگیری زبان با موسیقی ${language}`;
  } else if (contentType === 4) {
    faqs = podcastFaqs;
    title = `سوالات متداول درباره پادکست‌های ${language}`;
  }

  return (
    <div className="py-8 px-[3%] md:px-[5%] mt-10 max-w-[90%] mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-main mb-6 text-center">
        {title}
      </h2>
      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => (
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
            mainEntity: faqs.map((faq) => ({
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
