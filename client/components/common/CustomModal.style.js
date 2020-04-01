import { makeStyles } from '@material-ui/core/styles';
import pallete from '../../style/pallete';

const useCustomModalStyle = makeStyles({
  modal: {
    padding: '30px',
    width: '50%',
    height: '50%',
    backgroundColor: pallete.backgroundCard,
    position: 'absolute',
    left: '25%',
    top: '25%',
    border: `5px solid ${pallete.primary}`,
    display: 'flex',
    flexDirection: 'column',
  },
  modalButtonSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 'auto',
    '& > button': {
      marginRight: 10,
    },
    '& > button:last-of-type': {
      marginRight: 0,
    },
  },
  modalHeading: {
    textAlign: 'center',
    marginBottom: 30,
  },
  modalContent: {
    minHeight: '60%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default useCustomModalStyle;
