import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  useTheme,
} from "@mui/material";
import _ from "lodash";
import { MdClose } from "react-icons/md";
import "../styles.css";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import { CheckTree } from "rsuite";
import "./style.css";
import { tokens } from "../../../assets/color/theme";

const fakeData = [
  {
    label: "User Controller",
    value: "user",
    children: [
      { label: "Get All User", value: 1, visible: true },
      { label: "Add User", value: 2, visible: true },
      { label: "Edit User", value: 3, visible: true },
      { label: "Status User", value: 4, visible: true },
    ],
    visible: true,
  },
  {
    label: "Role Controller",
    value: "role",
    children: [
      { label: "Get All Role", value: 5, visible: true },
      { label: "Add Role", value: 6, visible: true },
      { label: "Edit Role", value: 7, visible: true },
      { label: "Status Role", value: 8, visible: true },
    ],
    visible: true,
  },
];

const RoleMappingForm = (props) => {
  const { initialValue, handleFormData, onHandleClose, clickedBtn, roleList } =
    props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [disable, setDisable] = useState(false);
  const [editDisable, setEditDisable] = useState(true);
  const [selectRole, setSelectRole] = useState({
    value: initialValue ? initialValue.id : [],
    error: false,
    success: false,
  });
  const [data, setData] = useState(fakeData);
  const [permission, setPermission] = useState(
    clickedBtn === "edit" ? initialValue.routeDetails : []
  );

  const handleSelectRole = (value) => {
    setSelectRole(value);
  };

  const handleChangeFun = (value) => {
    console.log(">>>>>", value);

    setPermission(value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(permission);

    // const data = {
    //   role: { id: parseInt(selectRole.value) },
    //   routes: selectFunction.selectvalue,
    // };
    // handleFormData(data);
  };

  return (
    <Box component="form" noValidate>
      <Card
        component="form"
        sx={{
          boxShadow: "none",
          backgroundColor: colors.form[500],
          color: colors.form[100],
        }}
      >
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={onHandleClose}>
              <MdClose />
            </IconButton>
          }
          title={
            clickedBtn === "add"
              ? "Add Role Function Map"
              : "Update Role Function Map"
          }
        />

        <Box
          sx={{
            width: "100%",
            "& .MuiTextField-root": { mb: 2 },
            padding: "10px",
          }}
          noValidate={true}
        >
          <FormTextDropdown
            Value={selectRole.value}
            onSelect={handleSelectRole}
            placeholder={"Select Role "}
            label={"Select Role *"}
            CustomErrorLine={"Select a role"}
            multiSelect={false}
            Required={true}
            disable={initialValue ? true : false}
            Options={roleList}
          />
        </Box>
        <Box
          sx={{
            "& .rs-checkbox-checker > label::before": {
              backgroundColor: "inherit",
            },
          }}
        >
          <CheckTree
            data={data}
            onChange={handleChangeFun}
            value={permission}
            showIndentLine
          />
        </Box>
        <CardActions sx={{ justifyContent: "space-between", m: 1 }}>
          <Button size="small" variant="contained" onClick={onHandleClose}>
            {"Cancel"}
          </Button>
          <Button
            variant="contained"
            type="submit"
            size="small"
            onClick={(e) => handleSubmitForm(e)}
            sx={{ backgroundColor: colors.greenAccent[500] }}
            disabled={clickedBtn === "add" ? disable : editDisable}
          >
            {clickedBtn === "add" ? "Add" : "Update"}"
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default RoleMappingForm;
