import { makeStyles } from '@material-ui/core/styles';

const useApiariesListStyles = makeStyles({
  switchViewSection: {
    textAlign: 'right',
    marginBottom: 10,
  },
  apiariesCardsSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  addNewApiaryButton: {
    margin: '20px 0',
  },
});

export default useApiariesListStyles;
