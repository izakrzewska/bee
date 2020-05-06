import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import useCalendarStyles from './Calendar.style';

const Calendar = () => {
  const classes = useCalendarStyles();
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const getFirstDay = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const isLeapYear = () => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const days = isLeapYear ? DAYS_LEAP : DAYS;
  const [startDay, setStartDay] = useState(getFirstDay(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getFirstDay(date));
  }, [date]);


  return (
    <div className={classes.calendar}>
      <CalendarHeader setDate={setDate} day={day} month={month} year={year} />
      <CalendarBody
        setDate={setDate}
        days={days}
        today={today}
        startDay={startDay}
        day={day}
        month={month}
        year={year}
      />
    </div>
  );
};

export default Calendar;
