import React, { useState } from "react";
import { Box, Chip, useTheme } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

const FormTextDropdown = (props) => {
  const {
    Options,
    Value,
    label,
    CustomErrorLine,
    multiSelect,
    Required,
    disable,
    defaultValue,
    onSelect,
    ...rest
  } = props;

  const theme = useTheme();

  const [selectValue, setSelectValue] = useState({
    value: "",
    error: false,
    success: false,
  });

  const [multSelectValue, setMultiSelectValue] = useState({
    value: defaultValue ? defaultValue : [],
    error: false,
    success: false,
  });

  const [error, setError] = useState("");

  const handleSelect = (event) => {
    const value = {
      value: event.target.value,
      error: false,
      success: true,
    };
    setSelectValue(value);
    onSelect(value);
    if (event.target.value) {
      setError("");
    }
  };

  const handleChangeBlur = () => {
    if (Required) {
      if (selectValue.value) {
        setError("");
        const value = {
          value: selectValue.value,
          error: false,
          success: true,
        };
        setSelectValue(value);
        onSelect(value);
      } else {
        const value = {
          value: "",
          error: true,
          success: false,
        };
        setSelectValue(value);
        onSelect(value);
        setError(CustomErrorLine ? CustomErrorLine : "Select One Option");
      }
    } else {
      setError("");
      const value = {
        value: selectValue.value,
        error: false,
        success: true,
      };
      setSelectValue(value);
      onSelect(value);
    }
  };

  const handleChangeMultiSelect = (data) => {
    if (Required) {
      if (multSelectValue.value.length > 0) {
        const value = {
          value: data.target.value,
          error: false,
          success: true,
        };
        setMultiSelectValue(value);
        onSelect(value);
        setError("");
      } else {
        const value = {
          value: data.target.value,
          error: false,
          success: true,
        };
        setMultiSelectValue(value);
        onSelect(value);
        setError(CustomErrorLine ? CustomErrorLine : "Select Atleast One");
      }
    } else {
      const value = {
        value: data.target.value,
        error: false,
        success: true,
      };
      setMultiSelectValue(value);
      onSelect(value);
      setError("");
    }
  };

  const handleChangeMultiBlur = (data) => {
    if (Required) {
      if (multSelectValue.value.length > 0) {
        setError("");
        const value = {
          value: data.target.value,
          error: false,
          success: true,
        };
        setMultiSelectValue(value);
        onSelect(value);
      } else {
        const value = {
          value: [],
          error: true,
          success: false,
        };
        setError(CustomErrorLine ? CustomErrorLine : "Select atleast one");
        setMultiSelectValue(value);
        onSelect(value);
      }
    } else {
      const value = {
        value: [],
        error: false,
        success: true,
      };
      setError("");
      setMultiSelectValue(value);
      onSelect(value);
    }
  };

  return (
    <FormControl fullWidth size="small" margin="normal">
      <InputLabel
        id="demo-select-small-label"
        sx={{
          color:
            theme.palette.mode === "dark"
              ? "#FAF0E6 !important"
              : "#352F44 !important",
        }}
      >
        {label}
      </InputLabel>
      {multiSelect === true ? (
        <Select
          error={error ? true : false}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          required={Required}
          fullWidth
          multiple
          value={multSelectValue.value}
          onChange={handleChangeMultiSelect}
          onBlur={handleChangeMultiBlur}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
              key={selected}
            >
              {selected.map((item) => (
                <Chip
                  key={item}
                  label={Options?.find((e) => e.id === item)?.label}
                />
              ))}
            </Box>
          )}
        >
          {Options?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={multSelectValue.value.includes(item.id)} />
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Select
          autoComplete={true}          
          error={error ? true : false}
          labelId="demo-simple-select-helper-label"
          value={Value ? Value : selectValue.value}
          label={label}
          onChange={handleSelect}
          onBlur={handleChangeBlur}
          disabled={disable}
          required={Required}
          size="small"
          sx={{
            "& .MuiFormLabel-root": {
              color:
                theme.palette.mode === "dark"
                  ? "#FAF0E6 !important"
                  : "#352F44 !important",
            },
          }}

        >
          <MenuItem value="">
            <em>-Select-</em>
          </MenuItem>
          {Options &&
            Options?.map((ele, index) => (
              <MenuItem value={ele.value} key={index}>
                {ele.label}
              </MenuItem>
            ))}
        </Select>
      )}

      {error && (
        // <FormHelperText sx={{ color: "#FF0000" }}>{error}</FormHelperText>
        <FormHelperText sx={{ marginLeft: "inherit" }} error>{error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormTextDropdown;
