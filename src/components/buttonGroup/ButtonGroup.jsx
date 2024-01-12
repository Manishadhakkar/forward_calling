import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useTheme } from "@mui/material";
import { tokens } from "../../assets/color/theme";

export default function SplitButton({ options, handleClickBtn }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function getLabelById(id) {
    const option = options.find((option) => option.id === id);
    return option ? option.label : null;
  }

  const handleClick = () => {
    handleClickBtn(selectedIndex);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          size="medium"
          sx={{
            backgroundColor: colors.greenAccent[700],
            textTransform: "none",
            color: theme.palette.mode === "dark" ? "white" : "black",
          }}
          variant="contained"
          onClick={handleClick}
        >
          {getLabelById(selectedIndex)}
        </Button>

        <Button
          size="medium"
          sx={{
            backgroundColor: colors.greenAccent[700],
            textTransform: "none",
            color: theme.palette.mode === "dark" ? "white" : "black",
          }}
          variant="contained"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" label="Slect" autoFocusItem>
                  {options.map((option) => (
                    <>
                    <MenuItem
                      key={option.id}
                      disabled={option.id === selectedIndex}
                      selected={option.id === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, option.id)}
                    >
                      {option.label}
                    </MenuItem>
                    </>
                    
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
