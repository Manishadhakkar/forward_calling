import React, { useState } from "react";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Tooltip } from "@mui/material";
import { ERR_BLANK, ERR_EMAIL } from "./textFieldString";
import { GoQuestion } from "react-icons/go";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const PasswordTextField = (props) => {
    const {
        type,
        label,
        placeholder,
        Value,
        onChangeText,
        Required,
        CustomErrorLine,
        hidden,
        hint,
        visible
    } = props;

    const [name, setName] = useState({
        value: Value ? Value : "",
        error: false,
        success: false,
    });
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleChangeText = (e) => {
        const text = e.target.value;
        const data = text.trimStart();
        if (Required) {
            const passwordTest = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
            if (data.length > 0) {
                if (!passwordTest.test(String(data))) {
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
                const passwordTest = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
                if (!passwordTest.test(String(data))) {
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

    const handleBlurText = (e) => {
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
                const passwordTest = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
                if (!passwordTest.test(String(data))) {
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
            const passwordTest = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
            if (!passwordTest.test(String(data))) {
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
        <FormControl
            variant="outlined"
            fullWidth
            margin="dense"
            size="small">
            <InputLabel htmlFor="outlined-adornment-password">
                {label}
            </InputLabel>
            <OutlinedInput
                type={showPassword ? "text" : "password"}
                endAdornment={
                    hint ? (
                        <InputAdornment position="end">
                            <Tooltip title={hint}>
                                <IconButton edge="end">
                                    <GoQuestion />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ) : visible ? (
                        <InputAdornment position="end">
                            <Tooltip title={hint}>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end">
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ) : (
                        <></>
                    )
                }
                placeholder={placeholder}
                label={label}
                onChange={handleChangeText}
                onBlur={(e) => {
                    handleBlurText(e);
                }}
                hidden={hidden}
                required={Required}
                value={Value ? Value : name.value}
            />
            {error && (
                <FormHelperText error id="accountId-error">
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default PasswordTextField;
