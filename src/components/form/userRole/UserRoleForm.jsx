import React, { useState } from "react";
import "../styles.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import FormTextField from "../../textfield/FormTextField";
import { tokens } from "../../../assets/color/theme";
import "../styles.css";

const UserRoleForm = (props) => {
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
    value: initialValue ? initialValue.name : "",
    error: false,
    success: initialValue ? true : false,
  });
  const [description, setDescription] = useState({
    value: initialValue ? initialValue.description : "",
    error: false,
    success: initialValue ? true : false,
  });

  let isValueNOTChanged =
    name.value === initialValue.title &&
    description.value === initialValue.description;
  let disable =
    name.error ||
    name.value === "" ||
    name.success === false ||
    description.error ||
    isValueNOTChanged;

  const handleChangeName = (value) => {
    setErrorMessage("");
    setName(value);
  };
  const handleChangeDescription = (value) => {
    setErrorMessage("");
    setDescription(value);
  };

  const handleSubmitForm = () => {
    const slug_name = name.value.replace(/ /g, '_');
    const data = {
      name: name.value,
      description: description.value,
      slug: slug_name.toLowerCase(),
    };
    handleFormData(data);
  };

  return (
    <>
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
          title={clickedBtn === "add" ? "Add Role" : "Update Role"}
        />
        {errorMessage && <span className="error_msg">{errorMessage}</span>}
        <CardContent color={colors.form[100]}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { mb: 1 },
            }}
            className={"formResponsiveHeight"}
            noValidate={true}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <FormTextField
                  type="textarea"
                  placeholder={"Enter User Name"}
                  label={"User Name"}
                  Value={name.value}
                  onChangeText={handleChangeName}
                  Required={true}
                  CustomErrorLine={"Enter proper name"}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormTextField
                  type="textarea"
                  placeholder={"Enter Description"}
                  label={"Role Description"}
                  Value={description.value}
                  onChangeText={handleChangeDescription}
                  Required={false}
                  CustomErrorLine={"Enter proper description"}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", m: 1 }}>
          <Button size="small" variant="contained" onClick={onHandleClose}>
            {"Cancel"}
          </Button>
          <Button
            size="small"
            onClick={handleSubmitForm}
            sx={{ backgroundColor: colors.greenAccent[500] }}
            variant="contained"
            disabled={disable}
          >
            {clickedBtn === "add" ? "Save" : "Update"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default UserRoleForm;
