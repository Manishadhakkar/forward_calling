import React from "react";
import { useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { FormControl } from "@mui/material";

const CampaignSwitch = (props) => {
  const theme = useTheme();
  const { isChecked, handleSwitch, style } = props;

  const handleChange = (e) => {
    handleSwitch(e.target.checked);
  };

  return (
    <FormControl
      fullWidth
      size="small"
      sx={{ alignItems: "center" }}
      style={{ ...style }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Switch
          inputProps={{ "aria-label": "Switch" }}
          checked={isChecked}
          onChange={handleChange}
          sx={{
            "&::before": {
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
              )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
              left: 12,
            },
            "&::after": {
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
              )}" d="M19,13H5V11H19V13Z" /></svg>')`,
              right: 12,
            },
            "& .MuiSwitch-switchBase": {
              "&.Mui-checked": {
                color: "#fff",
                "& + .MuiSwitch-track": {
                  opacity: 1,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
                },
              },
            },
          }}
        />
      </Stack>
    </FormControl>
  );
};

export default CampaignSwitch;
