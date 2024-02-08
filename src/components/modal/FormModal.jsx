import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material";
import { tokens } from "../../assets/color/theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 5,
  p: 1,
  borderRadius: "10px",
  width: "50%",
  "@media (max-width: 991px)": {
    width: "90%",
  },
  scrollbars: {
    width: "2px",
  },
};

export const FormModal = (props) => {
  const { modal_width = "50%", isOpen, handleClose = () => {} } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: modal_width,
          boxShadow: `0px 0px 8px 0px ${colors.grey[300]}`,
        }}
      >
        <div>{props.children}</div>
      </Box>
    </Modal>
  );
};
