import React from "react";
import { Container, AppBar } from "@material-ui/core";
import useStyles from "./App.style";
import MainToolbar from "./layout/MainToolbar";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../style/theme";

export default ({ children }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.appContainer}>
        <AppBar className={classes.appBar} position="static">
          <MainToolbar />
        </AppBar>
        <div className={classes.contentContainer}>{children}</div>
      </Container>
    </ThemeProvider>
  );
};
