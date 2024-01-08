import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 5,
  p: 1,
  borderRadius: "10px",
  "@media (max-width: 991px)": {
    width: "90%"
  },
};

export const CustomModal = (props) => {
  const { modal_width , isOpen, handleClose = () => {} } = props;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: modal_width }}>
        <div>{props.children}</div>
      </Box>
    </Modal>
  );
};
