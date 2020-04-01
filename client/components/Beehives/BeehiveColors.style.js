import { makeStyles } from '@material-ui/core/styles';
import pallete from '../../style/pallete';

const useBeehiveColorsStyles = makeStyles({
  colorBox: {
    width: '50px',
    height: '50px',
    display: 'block',
    margin: 10,
    borderRadius: '50%',
  },
  colorBoxCard: {
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    margin: 5,
  },
  colorBoxContainer: {
    display: 'flex',
  },
  beehiveColorsModal: {
    justifyContent: 'center',
    margin: '10px 0 20px 0',
  },
  beehiveColorsCard: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  borderActive: {
    border: `5px solid ${pallete.brown}`,
  },
  borderInactive: {
    border: '5px solid transparent',
  },
});

export default useBeehiveColorsStyles;
