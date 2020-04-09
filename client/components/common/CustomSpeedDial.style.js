import { makeStyles } from '@material-ui/core/styles';
import pallete from '../../style/pallete';

const useSpeedDialStyle = makeStyles({
  fab: {
    backgroundColor: pallete.backgroundCard,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: pallete.backgroundCard,
      boxShadow: 'none',
    },
    width: 25,
    height: 25,
  },
  speedDial: {
    height: 30,
  },
});

export default useSpeedDialStyle;
