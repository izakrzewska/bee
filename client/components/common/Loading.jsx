import React from 'react';
import useLoadingStyles from './Loading.style';

const Loading = () => {
  const classes = useLoadingStyles();
  return <div className={classes.loader}>Loading...</div>;
};

export default Loading;
