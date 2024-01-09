import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, FormHelperText, useTheme } from '@mui/material';

export default function FreeSolo(props) {
  const {
    label, Options, Value, CustomErrorLine, Required, disable, onSelect
  } = props;

  const [selectValue, setSelectValue] = useState({
    value: "",
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

  return (
    <FormControl fullWidth size="small" margin="normal">
      <Autocomplete
        autoComplete={true}
        value={Value ? Value : selectValue.value}
        onSelect={handleSelect}
        onBlur={handleChangeBlur}
        size='small'
        freeSolo
        id="free-solo-2-demo"
        placeholder='Select one'
        disableClearable
        options={Options?.map((option) => option.label)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      {error && (
        <FormHelperText sx={{ marginLeft: "inherit" }} error>{error}</FormHelperText>
      )}
    </FormControl>

  );
}