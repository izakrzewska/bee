import React from 'react';
import { node, bool } from 'prop-types';
import classnames from 'classnames';
import useDayStyles from './Day.style';

const Day = ({ children, isToday }) => {
  const classes = useDayStyles();
  return (
    <div className={classnames(classes.day, isToday && classes.today)}>
      {children}
    </div>
  );
};

Day.propTypes = {
  children: node.isRequired,
  isToday: bool.isRequired,
};
export default Day;
