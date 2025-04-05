"use client";

import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import PrimaryButton from "../shared/PrimaryButton";
import { Button } from "@mui/material";
import CustomModal from "../shared/CustomModal";

const LogoutModal = (props: any) => {
  const { open, onClose } = props;
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    deleteCookie("zabano-refresh-token");
    deleteCookie("zabano-access-token");
    setTimeout(() => {
      queryClient.invalidateQueries();
      queryClient.removeQueries();
    }, 500);

    router.replace("/public/home");
  };

  return (
    <CustomModal open={open} toggle={onClose}>
      <h3>آیا از خروج مطمئن هستید؟</h3>

      <div className="buttons w-full flex items-center gap-[4%] mt-10">
        <PrimaryButton onClick={handleLogout} className="logout-button w-[48%]">
          خروج
        </PrimaryButton>
        <Button
          onClick={onClose}
          className="cancel-button w-[48%] h-[50px] text-main"
        >
          انصراف
        </Button>
      </div>
    </CustomModal>
  );
};

export default LogoutModal;
