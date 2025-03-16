import React from "react";
import CustomModal from "@/components/shared/CustomModal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  inModalCallback?: () => void;
}

const LoginModal = (props: ModalProps) => {
  const { open, onClose, inModalCallback } = props;
  return (
    <CustomModal open={open} toggle={onClose}>
      <div className="w-full lg:w-[500px] min-h-[60vh]">
        login modal
        {/* <LoginView inModal inModalCallback={inModalCallback ? inModalCallback : onClose} /> */}
      </div>
    </CustomModal>
  );
};

export default LoginModal;
