import { makeStyles } from '@material-ui/core/styles';

const useCalendarBodyStyles = makeStyles({
  calendarBody: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  daysList: {
    display: 'flex',
  },
  days: {
    display: 'flex',
  },
});

export default useCalendarBodyStyles;
