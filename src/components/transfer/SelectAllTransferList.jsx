import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { tokens } from "../../assets/color/theme";

export default function SelectAllTransferList({
  targetList,
  setTargetList,
  campaignTarget,
  setCampaignTarget,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [checked, setChecked] = useState([]);
  const leftChecked = checked.filter(
    (value) => targetList.map((item) => item.name).indexOf(value) !== -1
  );
  const rightChecked = checked.filter(
    (value) => campaignTarget.map((item) => item.name).indexOf(value) !== -1
  );

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) =>
    items?.filter((item) => checked.indexOf(item.name) !== -1).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(
        checked.filter(
          (value) => items.map((item) => item.name).indexOf(value) === -1
        )
      );
    } else {
      setChecked([...checked, ...items.map((item) => item.name)]);
    }
  };

  const handleCheckedRight = () => {
    setCampaignTarget([
      ...campaignTarget,
      ...leftChecked.map((name) => targetList.find((item) => item.name === name)),
    ]);
    setTargetList(targetList.filter((item) => !leftChecked.includes(item.name)));
    setChecked(checked.filter((value) => leftChecked.indexOf(value) === -1));
  };

  const handleCheckedLeft = () => {
    setTargetList([
      ...targetList,
      ...rightChecked.map((name) =>
        campaignTarget.find((item) => item.name === name)
      ),
    ]);
    setCampaignTarget(
      campaignTarget.filter((item) => !rightChecked.includes(item.name))
    );
    setChecked(checked.filter((value) => rightChecked.indexOf(value) === -1));
  };

  const customList = (title, items) => {
    return (
      <Card
        sx={{
          border:
            theme.palette.mode === "dark"
              ? `1px solid ${colors.grey[600]}`
              : `1px solid ${colors.grey[800]}`,
        }}
      >
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === items?.length && items.length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== items?.length &&
                numberOfChecked(items) !== 0
              }
              disabled={items?.length === 0}
              inputProps={{
                "aria-label": "all items selected",
              }}
            />
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
        <Divider />
        <CardContent>
          <List
            dense
            sx={{
              height: 230,
              overflowY: "scroll",
              "li:nth-child(2n+1)": {
                backgroundColor: colors.grey[900],
              },
            }}
            component="div"
            role="list"
          >
            {items.map((item) => {
              return (
                <ListItem key={item?.name} onClick={handleToggle(item?.name)}>
                  <ListItemIcon>
                    <Checkbox checked={checked.indexOf(item?.name) !== -1} />
                  </ListItemIcon>
                  <ListItemText id={item?.name} primary={item?.name} />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Grid md={5} xs={12} item>
        {customList("Targets", targetList)}
      </Grid>
      <Grid md={2} xs={12} item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid md={5} xs={12} item>
        {customList("Campaign Targets", campaignTarget)}
      </Grid>
    </>
  );
}
