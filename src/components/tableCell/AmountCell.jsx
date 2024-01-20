import { Stack, Typography } from "@mui/material";
import React from "react";

const AmountCell = ({ value }) => {
  const parseCurrency = (input) =>
    input
      .match(/([a-zA-Z]+)(\d+)/)
      ?.slice(1)
      .map((str, i) => (i === 0 ? str.toUpperCase() : parseInt(str, 10)));

  const amount_curr = parseCurrency(value);

  console.log(amount_curr);

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <Typography variant="subtitle2">{amount_curr[0]}</Typography>
        <Typography variant="subtitle2">{amount_curr[1]}</Typography>
      </Stack>
    </div>
  );
};

export default AmountCell;
