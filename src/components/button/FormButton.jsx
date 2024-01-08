import React from "react";
import Button from "@mui/material/Button";

const FormButton = (props) => {
  const { onAddclick, isDisable, label, ...rest } = props;

  const handleClick = (e) => {
    e.preventDefault();
    onAddclick();
  };

  return (
    <Button
      size="small"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2, textTransform: "none" }}
      type="submit"
      onClick={(e) => handleClick(e)}
      disabled={isDisable}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default FormButton;
