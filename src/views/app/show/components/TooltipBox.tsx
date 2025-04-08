import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import React from "react";

export interface IProps {
  handleAction?: () => void;
  tooltipText?: string;
  item: any;
  disabled?: boolean;
  refetch?: () => void;
}

const ImageContainer = styled("div")`
  width: 48px;
  height: 48px;
  background-color: #323030;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  &:hover {
    background-color: #bb6502;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 38px;
    height: 38px;
  }
`;

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
          <ImageContainer>{item}</ImageContainer>
        </IconButton>
      </div>
    </Tooltip>
  );
}
