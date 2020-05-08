import React from 'react';
import {
  arrayOf, number, instanceOf,
} from 'prop-types';
import uniqid from 'uniqid';
import useCalendarBodyStyles from './CalendarBody.style';
import Day from './Day';

const CalendarBody = ({
  days, month, startDay, today,
}) => {
  const classes = useCalendarBodyStyles();
  const DAYS_OF_THE_WEEK = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];
  return (
    <div className={classes.calendarBody}>
      <div className={classes.daysList}>
        {DAYS_OF_THE_WEEK.map((d) => (
          <div key={d} className={classes.daysListItem}>
            <strong>{d}</strong>
          </div>
        ))}
      </div>
      <div className={classes.days}>
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            return (
              <Day
                key={uniqid()}
                isToday={d === today.getDate()}
              >
                {d > 0 ? d : ''}
              </Day>
            );
          })}
      </div>
    </div>
  );
};

CalendarBody.propTypes = {
  days: arrayOf(number).isRequired,
  month: number.isRequired,
  startDay: number.isRequired,
  today: instanceOf(Date).isRequired,
};

export default CalendarBody;
