import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormControl, FormHelperText, useTheme } from "@mui/material";
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { convertFormatNumber } from "../../utility/utilty";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange,format_type, ...other } = props;

  console.log(other)

  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function NumberDropdown(props) {
  const {
    label,
    Options,
    Value,
    CustomErrorLine,
    Required,
    disable,
    onSelect,
    format_type,
  } = props;

  const [selectValue, setSelectValue] = useState({
    textmask: "",
    numberformat: "",
  });
  const [error, setError] = useState("");


  useEffect(() => {
    if (format_type) {

      const inputNumber = 919040650355;
      const formattedNumber = convertFormatNumber(inputNumber, format_type);
      setSelectValue({
        textmask: formattedNumber,
        numberformat: "",
      })
    }
  }, [format_type]);

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
        disabled={disable}
        onSelect={handleSelect}
        onBlur={handleChangeBlur}
        size="small"
        freeSolo
        id="free-solo-2-demo"
        placeholder="Select one"
        disableClearable
        options={Options?.map((option) => option.label)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            value={Value ? Value : selectValue.textmask}
            // inputComponent={TextMaskCustom(format_type)}
            inputComponent={<TextMaskCustom format_type={format_type} />}
          />
        )}
      />
      {error && (
        <FormHelperText sx={{ marginLeft: "inherit" }} error>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
}
