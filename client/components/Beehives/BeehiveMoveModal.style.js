import { makeStyles } from '@material-ui/core/styles';

const useBeehiveMoveModalStyles = makeStyles({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    '& button': {
      margin: '10px 10px',
    },
  },
});

export default useBeehiveMoveModalStyles;
