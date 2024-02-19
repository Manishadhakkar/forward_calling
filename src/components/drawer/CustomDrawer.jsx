import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  getPermissionReq,
  totalAccDataReq,
} from "../layout/navBar/logout.request";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Button, Placeholder, RadioGroup, Form, Radio } from "rsuite";
import { tokens } from "../../assets/color/theme";
import Drawer from "@mui/material/Drawer";
import { PiUserSwitchDuotone } from "react-icons/pi";

const TopDrawer = ({ isOpen, setIsOpen, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const init_select_role = JSON.parse(localStorage.getItem("select_role"));

  const [isLoader, setIsLoader] = useState(false);
  const [selectData, setSelectData] = useState("");
  const [selectRoleData, setRoleselectRata] = useState("");
  const [selectRole, setSelectRole] = useState("");
  const [value, setValue] = useState("");
  const [rows, setRows] = useState([]);

  function stringAvatar({ selectRole }) {
    return {
      children: `${selectRole?.split(" ")[0][0]}`,
    };
  }

  useEffect(() => {
    if (isOpen) {
      setValue(init_select_role);
      setSelectRole(data.name);
      setIsLoader(true);
      const queryData = {
        user_id: data.id,
      };
      totalAccDataReq(queryData)
        .then((res) => {
          setIsLoader(false);
          setRows(res.data.data);
        })
        .catch((err) => {
          setIsLoader(false);
        });
    }
  }, [isOpen]);

  const handleClickRole = (companyData, roleData) => {
    setValue(companyData.companies.company_name + roleData.id);
    const select_role = companyData.companies.company_name + roleData.id;
    setRoleselectRata(select_role);
    setSelectData({
      company_id: companyData.companies.id,
      role_id: roleData.id,
      slug: roleData.slug,
    });
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    if (selectData) {
      getPermissionReq(selectData.slug)
        .then((res) => {
          setIsOpen(false);
          localStorage.setItem("select_role", JSON.stringify(selectRoleData));
          const value = res.data?.data?.role_permissions.map((ele) => ele.slug);
          localStorage.setItem("authorization", JSON.stringify(value));
          window.location.reload();
        })
        .catch((err) => {
          setIsOpen(false);
        });
    }
  };

  return (
    <>
      <Drawer anchor={"right"} open={isOpen} onClose={() => setIsOpen(false)}>
        <Box
          sx={{
            width: 400,
            height: "100%",
            // backgroundColor: `${colors.primary[700]} !important`,
            background: `linear-gradient(to left, ${colors.primary[100]}, ${colors.primary[200]} )`,
          }}
        >
          <Card sx={{ width: "100%" }}>
            <CardHeader
              sx={{
                backgroundColor: colors.primary[900],
                color: colors.grey[100],
                borderBottom: `1px solid ${colors.grey[800]}`,
                height: "67px !important",
                ".& MuiCardHeader-action": {
                  margin: "auto !important",
                },
              }}
              avatar={<Avatar {...stringAvatar({ selectRole })} />}
              action={
                <IconButton
                  aria-label="switch"
                  size="medium"
                  onClick={handleClickSubmit}
                >
                  <Button
                    style={{
                      color: colors.grey[900],
                      backgroundColor: colors.greenAccent[400],
                    }}
                    appearance="primary"
                    size="sm"
                    endIcon={<PiUserSwitchDuotone />}
                  >
                    Switch
                  </Button>
                </IconButton>
              }
              title={"Switch Account"}
              subheader={
                <Typography variant="subtitle2" color={colors.green[100]}>
                  {selectRole}
                </Typography>
              }
            />
            <CardContent
              sx={{
                backgroundColor: colors.primary[700],
              }}
            >
              {rows.length > 0 && (
                <Form.Group controlId="radioList">
                  <RadioGroup name="radioList" value={value}>
                    {isLoader && <Placeholder.Paragraph rows={8} />}
                    {rows.map((row, rowIndex) => (
                      <>
                        <>
                          <p>{row.companies.company_name}:</p>
                          {row.roles.map((role, roleIndex) => (
                            <Radio
                              key={roleIndex}
                              onChange={() => handleClickRole(row, role)}
                              value={row.companies.company_name + role.id}
                            >
                              {role.name}
                            </Radio>
                          ))}
                        </>
                        {rowIndex !== rows.length - 1 && (
                          <Divider sx={{ mb: 2, mt: 2 }} />
                        )}
                      </>
                    ))}
                  </RadioGroup>
                </Form.Group>
              )}
            </CardContent>
          </Card>
        </Box>
      </Drawer>
    </>
  );
};

export default TopDrawer;
