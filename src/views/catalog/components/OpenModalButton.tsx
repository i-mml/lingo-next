import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import React from "react";
import OutlineButton from "@/components/shared/OutlineButton";

interface OpenModalButtonProps {
  handleOpen: () => void;
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ handleOpen }) => {
  return (
    <OutlineButton className="w-full my-4 !h-11 !p-0" onClick={handleOpen}>
      <HelpOutlineOutlinedIcon />
      <span className="px-2">برای نمایش ویدیو راهنما کلیک کنید</span>{" "}
    </OutlineButton>
  );
};

export default OpenModalButton;
