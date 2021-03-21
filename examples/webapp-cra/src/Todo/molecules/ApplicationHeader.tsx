import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export const ApplicationHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{"Todo Reducer Demo"}</Typography>
      </Toolbar>
    </AppBar>
  );
};
