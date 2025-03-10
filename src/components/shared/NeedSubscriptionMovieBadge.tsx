import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React from "react";

const NeedSubscriptionMovieBadge = () => {
  return (
    <div
      className="absolute left-0 top-[-1px] flex items-center text-black p-1 gap-0.5 rounded-br-lg rounded-tl-lg"
      style={{
        backgroundImage: "linear-gradient(270deg,#ffe559,#ffab04)",
      }}
    >
      <AutoAwesomeIcon style={{ fontSize: 14 }} />
      <div className="text-[12px] font-bold">اشتراکی</div>
    </div>
  );
};

export default NeedSubscriptionMovieBadge;
