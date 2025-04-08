import useThemeCreator from "@/hooks/use-theme";
import { Dialog, Slide } from "@mui/material";
import React, { ReactNode } from "react";

interface IProps {
  open: boolean;
  toggle: () => void;
  children: ReactNode;
  onlyLightBg?: boolean;
}

const Transition = function Transition(props: any) {
  return <Slide direction="up" {...props} />;
};

const CustomModal = (props: IProps) => {
  const { open, toggle, children } = props;
  const { theme } = useThemeCreator();

  return (
    <Dialog
      open={open}
      onClose={toggle}
      TransitionComponent={Transition as any}
      keepMounted
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0,0,0,0.8)",
        },
      }}
      className="z-[9999] custom-modal"
      classes={{
        paper: "!mx-0",
      }}
      dir={theme.direction}
    >
      <div className="relative w-full">
        <div className="absolute -top-4 right-[45%] !block md:!hidden w-[10%] h-1 bg-gray-700 rounded sm:block"></div>
        {children}
      </div>
    </Dialog>
  );
};

export default CustomModal;
