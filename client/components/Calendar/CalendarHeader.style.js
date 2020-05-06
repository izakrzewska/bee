import { makeStyles } from '@material-ui/core/styles';

const useCalendarHeaderStyles = makeStyles({
  calendarHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: '10px 10px 5px 10px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f5f6fa',
  },
});

export default useCalendarHeaderStyles;
