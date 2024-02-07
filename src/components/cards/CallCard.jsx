import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { BiUpArrowAlt } from "react-icons/bi";
import { tokens } from "../../assets/color/theme";

const ReportCard = ({ title, value, percentage, captionTitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card sx={{ height: 100, backgroundColor: colors.primary[400] }}>
      <CardContent>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item>
            <Typography
              sx={{ fontWeight: 700 }}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {title}
            </Typography>
            <Typography variant="h3">{value}</Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: colors.primary[900],
                height: 56,
                width: 56,
              }}
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
        <div
          style={{
            marginTop: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <BiUpArrowAlt />
          <Typography sx={{ marginRight: 1 }} variant="body2">
            {percentage}
          </Typography>
          <Typography variant="caption">{captionTitle}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
