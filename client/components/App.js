import React from "react";
import { Container, AppBar } from "@material-ui/core";
import useStyles from "./App.style";
import MainToolbar from "./layout/MainToolbar";

export default ({ children }) => {
  const classes = useStyles();
  const { appContainer, appBar } = classes;
  return (
    <Container className={appContainer}>
      <AppBar className={appBar} position='static'>
        <MainToolbar />
      </AppBar>
      <div className='container'>{children}</div>
    </Container>
  );
};
