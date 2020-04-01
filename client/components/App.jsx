import React from 'react';
import { Container, AppBar } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { node } from 'prop-types';
import useStyles from './App.style';
import MainToolbar from './layout/MainToolbar';
import theme from '../style/theme';

const App = ({ children }) => {
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

App.propTypes = {
  children: node.isRequired,
};

export default App;
