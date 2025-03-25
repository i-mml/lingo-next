import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

export interface IProps {
  handleAction?: () => void;
  tooltipText?: string;
  item: any;
  disabled?: boolean;
  refetch?: () => void;
}

export default function TooltipBox({
  item,
  tooltipText,
  handleAction,
  disabled,
}: IProps) {
  return (
    <Tooltip
      title={tooltipText}
      enterDelay={500}
      leaveDelay={200}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -5],
              },
            },
          ],
        },
      }}
      arrow
    >
      <div>
        <IconButton
          size="large"
          onClick={handleAction}
          disabled={disabled}
          sx={{ cursor: "poiter", padding: 0 }}
        >
          <div className="w-[38px] h-[38px] md:w-12 md:h-12 bg-[#323030] flex items-center justify-center rounded-md hover:bg-[#bb6502]">
            {item}
          </div>
        </IconButton>
      </div>
    </Tooltip>
  );
}
