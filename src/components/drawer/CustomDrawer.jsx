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
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Button, Placeholder, RadioGroup, Form, Radio } from "rsuite";
import { tokens } from "../../assets/color/theme";
import Drawer from "@mui/material/Drawer";

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
            backgroundColor: `${colors.primary[700]} !important`,
          }}
        >
          <Card sx={{ width: "100%" }}>
            <CardHeader
              sx={{
                backgroundColor: colors.primary[800],
                color: colors.primary[200],
                borderBottom: `1px solid ${colors.borderColor[100]}`,
                height: "67px !important",
              }}
              action={
                <Stack direction="row" spacing={1}>
                  <Button
                    onClick={() => setIsOpen(false)}
                    style={{ color: "#000000" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleClickSubmit}
                    style={{ color: "#000000" }}
                    appearance="primary"
                  >
                    Confirm
                  </Button>
                </Stack>
              }
              title="Switch Account"
              subheader={selectRole}
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
