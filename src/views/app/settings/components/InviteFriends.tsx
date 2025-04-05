import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React from "react";
import { useNavigate } from "react-router-dom";
import BackIconComponent from "src/components/backIcon";
import { useAuth } from "src/hooks/useAuth";
import useTheme from "src/hooks/useTheme";
import { StyledAccountPage } from "../../account/style";

const InviteFriends = () => {
  const { theme } = useTheme();
  const { whoAmI } = useAuth();
  const navigate = useNavigate();

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(whoAmI?.referral_info?.referral_code || "");
    } catch (err) {
      console.error("Error copying text: ", err);
    }
  };

  return (
    <StyledAccountPage>
      <div className="pt-10 md:pt-2">
        <BackIconComponent clickHandler={() => navigate("/app/settings")} className="mb-5 px-[5%]" />

        <div>
          <div className="flex items-center justify-between gap-4 w-[90%] mx-auto py-4 px-[5%] rounded-lg border border-dotted border-gray400">
            <span className="text-main font-semibold text-lg lg:text-xl">کد معرف من:</span>
            <div
              className="p-2 px-4 rounded-full cards-md-box-shadow flex items-center gap-6 cursor-pointer"
              onClick={handleCopyText}
            >
              <ContentCopyIcon style={{ color: theme.palette.text.primary, fontSize: 28 }} />
              <span className="text-primary text-xl lg:text-2xl font-bold">{whoAmI?.referral_info?.referral_code}</span>
            </div>
          </div>
        </div>
      </div>
    </StyledAccountPage>
  );
};

export default InviteFriends;
