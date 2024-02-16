import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  useTheme,
} from "@mui/material";
import { TbHome2 } from "react-icons/tb";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import ReportCard from "../../../../components/cards/CallCard";
import { FcCallTransfer, FcEndCall, FcMissedCall } from "react-icons/fc";
import ReactApexChart from "react-apexcharts";
import { BsArrowDownShort } from "react-icons/bs";
import Copyright from "../../../../components/footer/Footer";
import { tokens } from "../../../../assets/color/theme";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
];

const fakeData = {
  series: [
    {
      name: "Answer",
      data: [44, 55, 41, 67, 22, 43],
    },
    {
      name: "Cancel",
      data: [13, 23, 20, 8, 13, 27],
    },
    {
      name: "Busy",
      data: [11, 17, 15, 15, 21, 14],
    },
    {
      name: "Congestion",
      data: [21, 7, 25, 13, 22, 8],
    },
    {
      name: "Chanunavail",
      data: [21, 7, 25, 13, 22, 8],
    },
  ],

  options: {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "01/01/2011 GMT",
        "01/02/2011 GMT",
        "01/03/2011 GMT",
        "01/04/2011 GMT",
        "01/05/2011 GMT",
        "01/06/2011 GMT",
      ],
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    responsive: [
      {
        breakpoint: 480,
        legend: {
          position: "bottom",
        },
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  },
};

const priceReport = {
  series: [44, 55, 41],
  options: {
    chart: {
      width: 380,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
      position: "top",
      horizontalAlign: "left",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};

const Dasboard = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        mt: 1,
        ml: 2,
        mr: 2,
        mb: 2,
        height: "80%",
        backgroundColor: "inherit",
      }}
    >
      <Breadcrumb pathList={paths} />
      <Box>
        <Box>
          <Grid container spacing={4} marginTop={"auto"}>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <ReportCard
                icon={<FcCallTransfer style={{ height: 32, width: 32 }} />}
                value={0}
                percentage={"25%"}
                captionTitle="higher"
                title={"Incoming Calls Today"}
              />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <ReportCard
                icon={<FcEndCall style={{ height: 32, width: 32 }} />}
                value={0}
                percentage={"2%"}
                captionTitle="higher"
                title={"Picked Calls Today"}
              />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <ReportCard
                icon={<FcMissedCall style={{ height: 32, width: 32 }} />}
                value={0}
                percentage={"0%"}
                captionTitle="higher"
                title={"Missed Calls Today"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} marginTop={"auto"}>
            <Grid item lg={7} sm={7} xl={7} xs={12}>
              <Card
                sx={{
                  height: "450px",
                  backgroundColor: colors.primary[400],
                  color: colors.grey[100],
                }}
              >
                <CardHeader
                  title="Latest call history"
                  action={
                    <Button
                      size="small"
                      variant="text"
                      sx={{
                        color: colors.greenAccent[700],
                      }}
                    >
                      Last 7 days <BsArrowDownShort />
                    </Button>
                  }
                />
                <Divider />
                <CardContent>
                  <ReactApexChart
                    options={fakeData.options}
                    series={fakeData.series}
                    type="bar"
                    height={350}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={5} sm={5} xl={5} xs={12}>
              <Card
                sx={{
                  height: "450px",
                  backgroundColor: colors.primary[400],
                  color: colors.grey[100],
                }}
              >
                <CardHeader
                  title="Latest revenue history"
                  action={
                    <Button
                      size="small"
                      variant="text"
                      sx={{
                        color: colors.greenAccent[700],
                      }}
                    >
                      Last 7 days <BsArrowDownShort />
                    </Button>
                  }
                />
                <Divider />
                <CardContent>
                  <ReactApexChart
                    options={priceReport.options}
                    series={priceReport.series}
                    type="donut"
                    height={350}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Box>
  );
};

export default Dasboard;
