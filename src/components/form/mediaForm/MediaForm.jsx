import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  useTheme,
  Tooltip,
} from "@mui/material";
import { MdClose, MdDeleteSweep } from "react-icons/md";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import Speech from "react-speech";
import FormTextField from "../../textfield/FormTextField";
import { tokens } from "../../../assets/color/theme";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import "../styles.css";
import { audioTypeList } from "../../../utility/config";

var a;

const MediaForm = (props) => {
  const {
    initialValue = {},
    handleFormData,
    onHandleClose,
    clickedBtn,
    errorMessage,
    setErrorMessage,
  } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState({
    value: initialValue ? initialValue?.name : "",
    error: false,
    success: false,
  });

  const [uploadType, setUploadType] = useState({
    value: initialValue ? initialValue?.uploadType : "Media",
    error: false,
    success: false,
  });

  const [text, setText] = useState({
    value: initialValue ? initialValue?.text : "",
    error: false,
    success: false,
  });

  const [selectFile, setSelectFile] = useState(
    clickedBtn !== "add"
      ? `${process.env.REACT_APP_MEDIA_URL}/${initialValue.media_file}.${initialValue.file_ext}`
      : " "
  );

  const [buttonName, setButtonName] = useState("Play");
  const [audio, setAudio] = useState(
    initialValue ? initialValue?.media_file : ""
  );

  const handleChangeName = (value) => {
    setErrorMessage("");
    setName(value);
  };
  const handleChangeType = (value) => {
    setErrorMessage("");
    setUploadType(value);
  };
  const handleChangeText = (value) => {
    setErrorMessage("");
    setText(value);
  };

  useEffect(() => {
    if (a) {
      a.pause();
      a = null;
      setButtonName("Play");
    }
    if (selectFile) {
      a = new Audio(selectFile);
      a.onended = () => {
        setButtonName("Play");
      };
    }
  }, [selectFile]);

  const handleClick = (e) => {
    e.preventDefault();
    if (buttonName === "Play" && a) {
      a.play();
      setButtonName("Pause");
    } else if (buttonName === "Pause" && a) {
      a.pause();
      setButtonName("Play");
    }
  };

  const addFile = (e) => {
    if (e.target.files[0]) {
      setSelectFile(URL.createObjectURL(e.target.files[0]));
      setAudio(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setAudio("");
    setSelectFile(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name.value);

    if (uploadType.value === "Media") {
      if (audio) {
        formData.append("media_file", audio);
      } else {
        return;
      }
    } else {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&q=${text.value}&tl=en`;
      formData.append("media_file", url);
    }

    handleFormData(formData);
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        backgroundColor: colors.form[500],
        color: colors.form[100],
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={onHandleClose}>
            <MdClose color={colors.form[100]} />
          </IconButton>
        }
        title={clickedBtn === "add" ? "Add Media" : "Update Media"}
      />
      <CardContent color={colors.form[100]}>
        <Box
          sx={{
            "& .MuiTextField-root": { mb: 1 },
            "&::-webkit-scrollbar": {
              width: "6px",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "gray",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "lightgray",
              borderRadius: "3px",
            },
          }}
          className={"formResponsiveHeight"}
          noValidate={true}
        >
          {errorMessage && <span className="error_msg">{errorMessage}</span>}
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <FormTextField
                type="alpha"
                placeholder={"Enter Media Name"}
                label={"Name"}
                Value={name.value}
                onChangeText={handleChangeName}
                Required={true}
                CustomErrorLine={"Enter proper name"}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormTextDropdown
                Value={uploadType.value}
                onSelect={handleChangeType}
                label={"Media Type *"}
                CustomErrorLine={"Choose one"}
                Required={true}
                Options={audioTypeList}
              />
            </Grid>
            {uploadType.value === "Media" ? (
              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div>
                    {/* <input type="file" onChange={addFile} /> */}
                    {clickedBtn === "add" && !audio ? (
                      <input
                        type="file"
                        accept=".mp3, .wav"
                        onChange={addFile}
                      />
                    ) : clickedBtn === "add" && audio ? (
                      <>
                        <input
                          type="file"
                          accept=".mp3, .wav"
                          onChange={addFile}
                        />
                      </>
                    ) : clickedBtn === "edit" && !audio ? (
                      <input
                        type="file"
                        accept=".mp3, .wav"
                        onChange={addFile}
                      />
                    ) : (
                      <>
                        <span>
                          {initialValue.media_file}.{initialValue.file_ext}
                        </span>
                        <span style={{ marginLeft: 2 }}>
                          <Tooltip title={"Remove"}>
                            <IconButton onClick={handleRemove}>
                              <MdDeleteSweep />
                            </IconButton>
                          </Tooltip>
                        </span>
                      </>
                    )}
                  </div>
                  <div>
                    <IconButton onClick={handleClick} disabled={!audio}>
                      {buttonName === "Play" ? (
                        <FaRegPlayCircle />
                      ) : (
                        <FaRegPauseCircle />
                      )}
                    </IconButton>
                  </div>
                </Box>
              </Grid>
            ) : (
              <>
                <Grid item xs={12} md={9}>
                  <FormTextField
                    type="textarea"
                    isMultiline={true}
                    placeholder={"Enter Text to speech"}
                    label={"Text"}
                    Value={text.value}
                    onChangeText={handleChangeText}
                    Required={true}
                    CustomErrorLine={"Enter proper text"}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{
                    "& span": {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                    marginTop: "4%",
                    "& button": {
                      width: "30px",
                      height: "30px",
                    },
                    "& button > svg": {
                      display: "flex",
                    },
                    "& .rs-play": {
                      display: text.success ? "block" : "none",
                    },
                    "& .rs-pause": {
                      display: text.success ? "block" : "none",
                    },
                    "& .rs-stop": {
                      display: "none",
                    },
                    "& .rs-resume": {
                      display: text.success ? "block" : "none",
                    },
                    
                  }}
                >
                  <Speech
                    stop={true}
                    pause={true}
                    resume={true}
                    text={text.value}
                    lang={"en-EN"}
                    voice="Google UK English"
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", mr: 1, ml: 1 }}>
        <Button size="small" variant="contained" onClick={onHandleClose}>
          {"Cancel"}
        </Button>
        <Button
          type="submit"
          size="small"
          onClick={handleFormSubmit}
          sx={{ backgroundColor: colors.greenAccent[500] }}
          variant="contained"
        >
          {clickedBtn === "add" ? "Save" : "Update"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaForm;
