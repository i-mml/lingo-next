import useThemeCreator from "@/hooks/use-theme";
import { Tab } from "@mui/material";
import React from "react";
import { isMobile } from "react-device-detect";

export function CustomTab(props: any) {
  const { handleTabChange, isActive, index } = props;

  const { theme }: any = useThemeCreator();

  return (
    <Tab
      fullWidth
      indicatorColor="secondary"
      TabIndicatorProps={{
        style: {
          backgroundColor: theme.palette?.text?.placeholder,
        },
      }}
      onClick={(event) => handleTabChange(event, index)}
      style={{
        color: isActive
          ? theme.palette?.text?.main
          : theme.palette?.text?.gray300,
        backgroundColor: isActive
          ? theme.palette?.background?.primary
          : theme.palette?.background?.gray200,
        borderRadius: isActive ? "8px" : "unset",

        fontWeight: isActive ? "600" : "400",
        minWidth: "calc(100% / 4)",
        padding: isMobile ? "4px" : "8px",
        minHeight: "unset",
      }}
      className="!text-[12px] !lg:text-sm"
      {...props}
    />
  );
}
