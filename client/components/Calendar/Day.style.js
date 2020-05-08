import { makeStyles } from '@material-ui/core/styles';

const useDayStyles = makeStyles({
  day: {
    width: '14.2%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  today: {
    border: '1px solid #eee',
  },
});

export default useDayStyles;
