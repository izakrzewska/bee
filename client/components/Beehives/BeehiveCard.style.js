import { makeStyles } from '@material-ui/core/styles';
import pallete from '../../style/pallete';

const useBeehiveCardStyle = makeStyles({
  beehiveCard: {
    margin: '15px 0',
    backgroundColor: pallete.backgroundCard,
    padding: 10,
    position: 'relative',
    minHeight: 180,
    display: 'flex',
    flexDirection: 'column',
  },
  beehiveCardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },
  beehiveColorsCard: {
    position: 'absolute',
    top: 15,
    right: 15,
    display: 'flex',
  },
  colorBoxCard: {
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    margin: 5,
  },
});

export default useBeehiveCardStyle;
