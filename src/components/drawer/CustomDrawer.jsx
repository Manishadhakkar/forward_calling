import React, { useEffect, useState } from "react";
import "./styles.css";
import { Drawer, Button, Placeholder, RadioGroup, Form, Radio } from "rsuite";
import {
  getPermissionReq,
  totalAccDataReq,
} from "../layout/navBar/logout.request";
import { useTheme } from "@mui/material";
import { tokens } from "../../assets/color/theme";

const TopDrawer = ({ isOpen, setIsOpen, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoader, setIsLoader] = useState(false);
  const [selectData, setSelectData] = useState("");
  const [value, setValue] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setValue(data.company.company_name + data.roles[0].role_id);
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
      <Drawer
        size={"xs"}
        placement={"right"}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Drawer.Header
          style={{
            backgroundColor: colors.grey[800],
          }}
        >
          <Drawer.Title
            style={{
              color: colors.layoutColor[200],
            }}
          >
            Switch Account
          </Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleClickSubmit} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body
          style={{
            backgroundColor: colors.primary[800],
          }}
        >
          {isLoader && <Placeholder.Paragraph rows={8} />}

          {rows.length > 0 && (
            <Form.Group controlId="radioList">
              <RadioGroup name="radioList" value={value}>
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
                    {rowIndex !== rows.length - 1 && <hr />}
                  </>
                ))}
              </RadioGroup>
            </Form.Group>
          )}
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default TopDrawer;
