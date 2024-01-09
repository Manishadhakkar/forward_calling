import {
    Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../../../assets/color/theme";
import { getAllCompanyRequest } from "../../../pages/app/campaign/service/campaign.request";
import Loader from "../../Loader/Loader";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import { MdClose } from "react-icons/md";

const AssignForm = ({
  onHandleClose,
  handleFormData,
  errorMessage,
  setErrorMessage,
  campaignId,
  clickedBtn,
  initialValue
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [companyList, setCompanyList] = useState([]);
  const [companyId, setCompanyId] = useState({
    value: initialValue ? initialValue?.company_id : "",
    error: false,
    success: false,
  });
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    getAllCompanyRequest()
      .then((res) => {
        const result = res.data?.data?.data?.map((ele) => {
          return {
            value: ele.id,
            label: ele.company_name,
          };
        });
        setCompanyList(result);
        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
      });
  }, []);

  const handleChangeCompany = (value) => {
    setErrorMessage("");
    setCompanyId(value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const data = {
        company_id: companyId.value,
        campaign_id: campaignId
    };
    handleFormData(data);
  };

  return (
    <>
      {isLoader && <Loader />}
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
            <IconButton aria-label="close" onClick={onHandleClose}>
              <MdClose color={colors.form[100]} />
            </IconButton>
          }
          title={"Assign to"}
        />
        {errorMessage && <span className="error_msg">{errorMessage}</span>}
        <CardContent
          color={colors.form[100]}
          className="contentResponsiveHeight"
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <FormTextDropdown
                Value={companyId.value}
                onSelect={handleChangeCompany}
                label={"Company *"}
                CustomErrorLine={"Choose one"}
                Required={true}
                Options={companyList}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", mr: 2, ml: 1 }}>
          <Button size="small" variant="contained" onClick={onHandleClose}>
            {"Cancel"}
          </Button>
          <Button
            type="submit"
            size="small"
            onClick={(e) => handleSubmitForm(e)}
            sx={{ backgroundColor: colors.greenAccent[500] }}
            variant="contained"
          >
            {clickedBtn === "assign" ? "Save" : "Update"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AssignForm;
