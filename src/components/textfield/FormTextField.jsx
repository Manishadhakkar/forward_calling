import TextField from "@mui/material/TextField";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ERR_BLANK, ERR_EMAIL } from "./textFieldString";
import { removeSpacesAndBraces } from "../../utility/utilty";

const FormTextField = (props) => {
  const {
    type,
    label,
    placeholder,
    Value,
    onChangeText,
    Required,
    CustomErrorLine,
    hidden,
    isDisable,
    isHidden,
    customFormat,
    prefix,
    isMultiline,
    priceSymbol,
    confirmErr,
    ...rest
  } = props;

  const theme = useTheme();
  const [name, setName] = useState({
    value: Value ? Value : "",
    error: false,
    success: false,
  });
  const [formatLength, setFormatLength] = useState();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  useEffect(() => {
    if (customFormat !== undefined) {
      setName({
        value: "",
        error: false,
        success: false,
      });
    }
  }, [customFormat]);
  useEffect(() => {
    if (customFormat !== undefined) {
      let inputData = customFormat ? customFormat : "";
      var output = removeSpacesAndBraces(inputData);
      setFormatLength(output.length);
    }
  }, [customFormat]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleIvrChange = (e) => {
    const text = e.target.value;
    const data = text.trimStart();
    if (Required) {
      const alphaTest = /^[0-9*#]$/gm;
      if (data.length > 0) {
        if (!alphaTest.test(String(data).toLowerCase())) {
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else {
        setError(ERR_BLANK);
        const value = {
          value: data,
          success: false,
        };
        onChangeText(value);
        setName(value);
      }
    } else if (!Required) {
      if (data.length > 0) {
        const alphaTest = /^[0-9*#]$/gm;
        if (!alphaTest.test(String(data).toLowerCase())) {
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else {
        setError("");
        const value = {
          value: data,
          success: true,
        };
        onChangeText(value);
        setName(value);
      }
    }
  };

  const handleIvrBlur = (e) => {
    const text = e.target.value;
    const data = text.trimStart();
    if (Required) {
      if (data.length <= 0) {
        setError(ERR_BLANK);
        const value = {
          ...name,
          error: true,
          success: false,
        };
        setName(value);
        onChangeText(value);
      } else {
        const ivrRegex = /^[0-9*#]$/gm;
        if (!ivrRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      }
    } else if (!Required && data.length > 0) {
      const ivrRegex = /^[0-9*#]$/gm;
      if (!ivrRegex.test(String(data).toLowerCase())) {
        setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
        const value = {
          ...name,
          error: true,
          success: false,
        };
        setName(value);
        onChangeText(value);
      } else {
        setError("");
        const value = {
          ...name,
          error: false,
          success: true,
        };
        setName(value);
        onChangeText(value);
      }
    }
  };

  const handleChangeText = (e) => {
    const text = e.target.value;
    const data = text.trimStart();
    if (Required) {
      if (type === "email") {
        const emailTest =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (data.length > 0) {
          if (!emailTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "text") {
        const textTest = /^[a-zA-Z ]*$/gm;
        if (data.length > 0) {
          if (!textTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "textarea" || "password") {
        if (data.length > 0) {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "alpha") {
        const alphaTest = /^[a-zA-Z0-9 ]*$/gm;
        if (data.length > 0) {
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "num") {
        const alphaTest = /^[0-9]*$/gm;
        if (data.length > 0) {
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      }
    } else if (!Required) {
      if (type === "email") {
        if (data.length > 0) {
          const emailTest =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!emailTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "text") {
        if (data.length > 0) {
          const textTest = /^[a-zA-Z ]*$/gm;
          if (!textTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "textarea" || "password") {
        if (data.length > 0) {
          const textRegex = /[\w[\]`!@#$%&*()={}:;<>+'-]*/gm;
          if (!textRegex.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "alpha") {
        if (data.length > 0) {
          const alphaTest = /^[a-zA-Z0-9 ]*$/gm;
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "num") {
        if (data.length > 0) {
          const alphaTest = /^[0-9]*$/gm;
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      }
    }
  };

  const handleBlurText = (e) => {
    const text = e.target.value;
    const data = text.trimStart();
    if (Required) {
      if (type === "email") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const emailTest =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!emailTest.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "text") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const textSRegex = /^[a-zA-Z ]*$/gm;
          if (!textSRegex.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : "Error");
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "textarea" || "password") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const textSRegex = /[\w[\]`!@#$%&*()={}:;<>+'-]*/gm;
          if (!textSRegex.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : "Error");
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "alpha") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const alphaRegex = /^[a-zA-Z0-9 ]*$/gm;
          if (!alphaRegex.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : "Error");
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "num") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const alphaRegex = /^[0-9 ]*$/gm;
          if (!alphaRegex.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : "Error");
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      }
    } else if (!Required && data.length > 0) {
      if (type === "email") {
        const emailTest =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailTest.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "text") {
        const textSRegex = /^[a-zA-Z ]*$/gm;
        if (!textSRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "textarea" || "password") {
        const textSRegex = /[\w[\]`!@#$%&*()={}:;<>+'-]*/gm;
        if (!textSRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "alpha") {
        const alphaRegex = /^[a-zA-Z0-9 ]*$/gm;
        if (!alphaRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "num") {
        const alphaRegex = /^[0-9 ]*$/gm;
        if (!alphaRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      }
    }
  };
  const handleChangeNumber = (e) => {
    const text = e.value;
    const data = text.trimStart();
    if (Required) {
      if (data.length > 0) {
        if (data.length > formatLength || data.length < formatLength) {
          setError(CustomErrorLine);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else {
        setError(ERR_BLANK);
        const value = {
          value: data,
          success: false,
        };
        onChangeText(value);
        setName(value);
      }
    } else if (!Required) {
      if (data.length > 0) {
        if (data.length > formatLength || data.length < formatLength) {
          setError(CustomErrorLine);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else {
        setError("");
        const value = {
          value: data,
          success: true,
        };
        onChangeText(value);
        setName(value);
      }
    }
  };
  const handleBlurNumber = (e) => {
    e.preventDefault();
    const text = e.target.value;
  };

  const handleChangePhone = (e) => {
    // e.preventDefault();
    const text = e.target.value;
    const data = text.trimStart();
    if (Required) {
      const phnRegex = /^\d{10,14}$/gm;
      if (!phnRegex.test(String(data).toLowerCase())) {
        setError(CustomErrorLine ? CustomErrorLine : "Error");
        const value = {
          value: data,
          success: false,
        };
        onChangeText(value);
        setName(value);
      } else {
        setError("");
        const value = {
          value: data,
          success: true,
        };
        onChangeText(value);
        setName(value);
      }
    } else if (!Required) {
      if (data.length > 0) {
        const textSRegex = /^[a-zA-Z ]*$/gm;
        if (!textSRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else {
        setError("");
        const value = {
          ...name,
          error: false,
          success: true,
        };
        setName(value);
        onChangeText(value);
      }
    }
  };

  const handleBlurPhone = (e) => {
    e.preventDefault();
    const text = e.target.value;
    const data = text.trimStart();
    if (Required) {
      if (data.length <= 0) {
        setError(ERR_BLANK);
        const value = {
          ...name,
          error: true,
          success: false,
        };
        setName(value);
        onChangeText(value);
      } else {
        const phoneRex = /^\d{10,14}$/gm;
        if (!phoneRex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      }
    } else if (!Required && data.length > 0) {
      const phoneRex = /^\d{10,14}$/gm;
      if (!phoneRex.test(String(data).toLowerCase())) {
        setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
        const value = {
          ...name,
          error: true,
          success: false,
        };
        setName(value);
        onChangeText(value);
      } else {
        setError("");
        const value = {
          ...name,
          error: false,
          success: true,
        };
        setName(value);
        onChangeText(value);
      }
    }
  };

  return (
    <>
      {type === "formatNo" ? (
        <>
          <PatternFormat
            margin="normal"
            size="small"
            fullWidth
            format={customFormat}
            // format={"+ (##) #### ###"}
            value={Value ? Value : name.value}
            onValueChange={handleChangeNumber}
            onBlur={(e) => handleBlurNumber(e)}
            valueIsNumericString={true}
            customInput={TextField}
            placeholder={placeholder}
            label={label}
            required={Required}
          />
          {error && (
            <FormHelperText sx={{ color: "#FF0000" }}>{error}</FormHelperText>
          )}
        </>
      ) : type === "password" ? (
        <>
          <TextField
            type={showPassword ? "text" : "password"}
            disabled={isDisable}
            margin="normal"
            hidden={hidden}
            fullWidth
            label={label}
            placeholder={placeholder}
            required={Required}
            value={Value ? Value : name.value}
            onChange={handleChangeText}
            onBlur={(e) => {
              handleBlurText(e);
            }}
            error={error ? true : false}
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color:
                  theme.palette.mode === "dark"
                    ? "#FAF0E6 !important"
                    : "#352F44 !important",
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "none !important",
              },
              display: isHidden ? "none" : "block",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <FormHelperText sx={{ color: "#FF0000" }}>{error}</FormHelperText>
          )}
          {confirmErr && (
            <FormHelperText sx={{ color: "#FF0000" }}>
              {"The passwords do not match"}
            </FormHelperText>
          )}
        </>
      ) : type === "phoneNo" ? (
        <>
          <TextField
            disabled={isDisable}
            margin="normal"
            hidden={hidden}
            fullWidth
            label={label}
            placeholder={placeholder}
            required={Required}
            value={Value ? Value : name.value}
            onChange={handleChangePhone}
            onBlur={(e) => {
              handleBlurPhone(e);
            }}
            error={error ? true : false}
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color:
                  theme.palette.mode === "dark"
                    ? "#FAF0E6 !important"
                    : "#352F44 !important",
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "none !important",
              },
              display: isHidden ? "none" : "block",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end" sx={{ mr: 1 }}>
                  + {prefix}
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <FormHelperText sx={{ color: "#FF0000" }}>{error}</FormHelperText>
          )}
        </>
      ) : type === "price" ? (
        <>
          <TextField
            disabled={isDisable}
            margin="normal"
            hidden={hidden}
            fullWidth
            label={label}
            placeholder={placeholder}
            type={type}
            required={Required}
            value={Value ? Value : name.value}
            onChange={handleChangeText}
            onBlur={(e) => {
              handleBlurText(e);
            }}
            error={error ? true : false}
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color:
                  theme.palette.mode === "dark"
                    ? "#FAF0E6 !important"
                    : "#352F44 !important",
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "none !important",
              },
              display: isHidden ? "none" : "block",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end" sx={{ mr: 1 }}>
                  {priceSymbol}
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <FormHelperText sx={{ color: "#FF0000" }}>{error}</FormHelperText>
          )}
        </>
      ) : type === "number" ? (
        <>
          <TextField
            disabled={isDisable}
            margin="normal"
            hidden={hidden}
            fullWidth
            label={label}
            placeholder={placeholder}
            type={type}
            required={Required}
            value={Value ? Value : name.value}
            onChange={handleChangeText}
            onBlur={(e) => {
              handleBlurText(e);
            }}
            error={error ? true : false}
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color:
                  theme.palette.mode === "dark"
                    ? "#FAF0E6 !important"
                    : "#352F44 !important",
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "none !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {},

              display: isHidden ? "none" : "block",
            }}
            {...rest}
          />
          {error && (
            <FormHelperText sx={{ color: "#FF0000" }}>{error}</FormHelperText>
          )}
        </>
      ) : type === "ivrnumber" ? (
        <>
          <TextField
            disabled={isDisable}
            margin="normal"
            hidden={hidden}
            fullWidth
            label={label}
            placeholder={placeholder}
            type={type}
            required={Required}
            value={Value ? Value : name.value}
            onChange={handleIvrChange}
            onBlur={(e) => {
              handleIvrBlur(e);
            }}
            error={error ? true : false}
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color:
                  theme.palette.mode === "dark"
                    ? "#FAF0E6 !important"
                    : "#352F44 !important",
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "none !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {},

              display: isHidden ? "none" : "block",
            }}
            {...rest}
          />
          {error && (
            <FormHelperText sx={{ color: "#FF0000" }}>{error}</FormHelperText>
          )}
        </>
      ) : type === "capvalue" ? (
        <>
          <TextField
            multiline={type === "textarea" ? true : false}
            disabled={isDisable}
            margin="none"
            hidden={hidden}
            fullWidth
            label={label}
            placeholder={placeholder}
            type={type}
            required={Required}
            value={Value ? Value : name.value}
            onChange={handleChangeText}
            onBlur={(e) => {
              handleBlurText(e);
            }}
            error={error ? true : false}
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color:
                  theme.palette.mode === "dark"
                    ? "#FAF0E6 !important"
                    : "#352F44 !important",
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "none !important",
              },
              display: isHidden ? "none" : "block",
            }}
            {...rest}
          />
          {error && (
            <FormHelperText
              style={{
                display: isHidden ? "none" : "block",
              }}
              sx={{ color: "#FF0000" }}
            >
              {error}
            </FormHelperText>
          )}
        </>
      ) : (
        <>
          <TextField
            multiline={isMultiline}
            disabled={isDisable}
            margin="normal"
            hidden={hidden}
            fullWidth
            label={label}
            placeholder={placeholder}
            type={type}
            required={Required}
            value={Value ? Value : name.value}
            onChange={handleChangeText}
            onBlur={(e) => {
              handleBlurText(e);
            }}
            error={error ? true : false}
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color:
                  theme.palette.mode === "dark"
                    ? "#FAF0E6 !important"
                    : "#352F44 !important",
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "none !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {},

              display: isHidden ? "none" : "block",
            }}
            {...rest}
          />
          {error && (
            <FormHelperText sx={{ color: "#FF0000" }}>{error}</FormHelperText>
          )}
        </>
      )}
    </>
  );
};

export default FormTextField;
