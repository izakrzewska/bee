import React from 'react';
import { node } from 'prop-types';
import useDayStyles from './Day.style';

const Day = ({ children }) => {
  const classes = useDayStyles();
  return (
    <div className={classes.day}>
      {children}
    </div>
  );
};

Day.propTypes = {
  children: node.isRequired,
};
export default Day;
