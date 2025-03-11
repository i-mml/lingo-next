import { Box, Modal } from "@mui/material";
import React from "react";

interface VideoModalProps {
  open: boolean;
  handleClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          maxHeight: "450px",
          maxWidth: "250px",
          bgcolor: "white",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
        }}
      >
        <video width="100%" controls autoPlay>
          <source src="/videos/how-to-use.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Modal>
  );
};

export default VideoModal;
