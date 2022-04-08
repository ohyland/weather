import React from "react";
import { Stack, Switch, Typography } from "@mui/material";

export const SwitchTeperatureControl = ({ handleTemperature }) => {
  return (
    <div>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography> &#176;f</Typography>
        <Switch onChange={(e) => handleTemperature(e)} defaultChecked></Switch>
        <Typography> &#176;c</Typography>
      </Stack>
    </div>
  );
};
