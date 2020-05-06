import React from 'react';
import { func, number } from 'prop-types';
import {
  Button,
} from '@material-ui/core';
import useCalendarHeaderStyles from './CalendarHeader.style';

const CalendarHeader = ({
  setDate, day, month, year,
}) => {
  const classes = useCalendarHeaderStyles();
  const MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
  return (
    <div className={classes.calendarHeader}>
      <Button onClick={() => setDate(new Date(year, month - 1, day))}>Prev</Button>
      <div>
        {`${MONTHS[month]} ${year}`}
      </div>
      <Button onClick={() => setDate(new Date(year, month + 1, day))}>Next</Button>
    </div>
  );
};

CalendarHeader.propTypes = {
  setDate: func.isRequired,
  day: number.isRequired,
  month: number.isRequired,
  year: number.isRequired,
};

export default CalendarHeader;
