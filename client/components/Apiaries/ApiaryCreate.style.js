import { makeStyles } from '@material-ui/core/styles';

const useApiariesCreateStyles = makeStyles({
  addApiaryForm: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  addApiaryButton: {
    marginTop: 20,
    textAlign: 'right',
  },
  apiaryLocation: {
    height: 350,
    overflow: 'hidden',
  },
  nameContainer: {
    width: '50%',
    marginBottom: 10,
  },
  textFieldContainer: {
    marginBottom: 30,
  },
});

export default useApiariesCreateStyles;
