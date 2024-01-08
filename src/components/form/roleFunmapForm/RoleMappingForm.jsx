import _ from "lodash";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
  useTheme,
  Grid,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormCheckBox from "../../checkBox/FormCheckBox";
import { tokens } from "../../../assets/color/theme";
import { MdClose } from "react-icons/md";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import "./styles.css";
import {
  getAllRoleReq,
  getPermissionReq,
} from "../../../pages/auth/roleFunctions/service/permission.request";
import Loader from "../../Loader/Loader";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ p: 1, width: "100%" }}>{children}</Box>}
    </div>
  );
}

const RoleMappingForm = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    handleFormData,
    errorMessage,
    setMessage,
    actionType,
    initialValue = {},
    onHandleClose,
    clickedBtn,
    user_slug,
  } = props;
  const [isLoader, setIsLoader] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [selectRole, setSelectRole] = useState({
    value: initialValue ? initialValue.id : [],
    error: false,
    success: false,
  });
  const [functions, setFunctions] = useState([]);
  const [groups, setAllGroups] = useState([]);
  const [value, setValue] = useState("User");

  const handleSelectRole = (value) => {
    setSelectRole(value);
  };

  useEffect(() => {
    getAllRoleReq()
      .then((res) => {
        const result = res.data?.data?.map((ele) => {
          return {
            value: ele.id,
            label: ele.name,
          };
        });
        setRoleList(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setIsLoader(true);
    if (actionType === "add") {
      getPermissionReq(user_slug)
        .then((res) => {
          const allGroups = res?.data?.data?.groups;
          setAllGroups(allGroups);
          let allData = res?.data?.data?.role_permissions;
          const result = allData.map((elm) => ({
            ...elm,
            checked: false,
          }));
          setFunctions(result);
          setIsLoader(false);
        })
        .catch(() => {
          setIsLoader(false);
        });
    } else {
      const arr = initialValue.permission;
      const checkArr = { checked: true };
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Object.assign(arr[i], checkArr);
      }
      var item_id_list = [];
      arr.map((ele) => item_id_list.push(ele.id));

      getPermissionReq(user_slug)
        .then((res) => {
          const allGroups = res?.data?.data?.groups;
          setAllGroups(allGroups);
          const fetchData = res?.data?.data?.role_permissions?.map((ele) => ({
            ...ele,
            checked: item_id_list.includes(ele.id) ? true : false,
          }));
          setFunctions(fetchData);
          setIsLoader(false);
        })
        .catch((e) => {
          setIsLoader(false);
        });
    }
  }, []);

  const handleChangeCheck = (key) => {
    const result = functions.map((functionName) => {
      if (functionName.id === key) {
        return {
          ...functionName,
          checked: !functionName.checked,
        };
      } else {
        return {
          ...functionName,
        };
      }
    });
    setFunctions(result);
  };

  const functionResultTrue = (functions) => {
    const resultArray = [];
    functions.forEach((func) => {
      if (func.checked === true) {
        resultArray.push(func.id);
      }
    });
    return resultArray;
  };

  const handleSaveData = () => {
    const formData = {
      role_id: selectRole.value,
      permission: functionResultTrue(functions).join(","),
    };
    handleFormData(formData);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {isLoader && <Loader />}
      <Box noValidate>
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
            title={
              clickedBtn === "add"
                ? "Add Role Function Map"
                : "Update Role Function Map"
            }
          />
          {errorMessage && <span className="error_msg">{errorMessage}</span>}
          <CardContent color={colors.form[100]}>
            <Box className={"formResponsiveHeight"}>
              <Grid container>
                <Grid item xs={12} md={12}>
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
                </Grid>
              </Grid>
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  height: 224,
                  border: `0.5px solid ${colors.borderColor[100]}`,
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider", width: "30%" }}
                >
                  {groups &&
                    groups.map((item) => {
                      return (
                        <Tab
                          style={{
                            backgroundColor:
                              item.permission_group === value
                                ? colors.borderColor[100]
                                : colors.container[100],
                          }}
                          onClick={() => handleChange(item.permission_group)}
                          label={item.permission_group}
                          {...a11yProps(item.permission_group)}
                        />
                      );
                    })}
                </Tabs>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "scroll",
                    width: "70%",
                  }}
                >
                  {functions &&
                    functions.map((item) => {
                      return (
                        <TabPanel value={value} index={item.permission_group}>
                          <FormCheckBox
                            key={item.id}
                            Label={item.name}
                            checked={item.checked}
                            handleChangeCheck={() => handleChangeCheck(item.id)}
                          />
                        </TabPanel>
                      );
                    })}
                </div>
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between", m: 1 }}>
            <Button size="small" variant="contained" onClick={onHandleClose}>
              {"Cancel"}
            </Button>
            <Button
              variant="contained"
              type="submit"
              size="small"
              onClick={(e) => handleSaveData(e)}
              sx={{ backgroundColor: colors.greenAccent[500] }}
            >
              {clickedBtn === "add" ? "Add" : "Update"}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default RoleMappingForm;
