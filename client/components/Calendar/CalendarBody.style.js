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
  daysListItem: {
    width: '14.2%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  days: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

export default useCalendarBodyStyles;
