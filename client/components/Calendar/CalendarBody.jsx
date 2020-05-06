import React from 'react';
import {
  arrayOf, number, string, func,
} from 'prop-types';
import useCalendarBodyStyles from './CalendarBody.style';
import Day from './Day';

const CalendarBody = ({
  days, day, month, startDay, setDate, year, today,
}) => {
  const classes = useCalendarBodyStyles();
  const DAYS_OF_THE_WEEK = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];
  return (
    <div className={classes.calendarBody}>
      <div className={classes.daysList}>
        {DAYS_OF_THE_WEEK.map((d) => (
          <Day key={d}>
            <strong>{d}</strong>
          </Day>
        ))}
      </div>
      <div className={classes.days}>
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            return (
              <Day
                key={_}
                // isToday={d === today.getDate()}
                // isSelected={d === day}
                onClick={() => setDate(new Date(year, month, d))}
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
  day: string.isRequired,
  days: arrayOf(number).isRequired,
  month: string.isRequired,
  year: number.isRequired,
  startDay: number.isRequired,
  setDate: func.isRequired,
  today: number.isRequired,
};

export default CalendarBody;
