import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React from "react";

import { Chip } from "@mui/material";
import { partOfSpeechFields } from "@/constants/player-fields";

export function GrammarBox({ item }: any) {
  const grammarBoxColors = [
    { bg: "#505B4E", txt: "#E9FFE5" },
    { bg: "#49585A", txt: "#DAFFFD" },
    { bg: "#785C5C", txt: "#FFE1DD" },
    { bg: "#484F5E", txt: "#D8E3FF" },
  ];

  const rndInt = Math.floor(Math.random() * 3) + 1;

  const fields = item
    ? Object.entries(item)?.filter(
        (item) => item?.[0] !== "id" && item?.[0] !== "pt"
      )
    : [];

  return (
    <Accordion className="w-full !rounded-lg">
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className="!rounded-lg">
        <Chip
          label={`${item.text} | ${item.pt}`}
          sx={{
            color: grammarBoxColors?.[rndInt].txt,
            backgroundColor: grammarBoxColors?.[rndInt].bg,
            height: "24px",
            width: "100%",
            display: "block",
          }}
        />
      </AccordionSummary>
      <AccordionDetails>
        {fields?.map((item) => (
          <div className="flex items-center justify-between">
            <span className="text-main font-medium">{item?.[1] as any}</span>
            <span className="text-gray400">
              :{partOfSpeechFields?.[item?.[0]] || item?.[0]}{" "}
            </span>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
