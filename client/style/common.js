import { makeStyles } from '@material-ui/core/styles';
import pallete from './pallete';

const useCommonStyle = makeStyles({
  heading: {
    fontSize: '2rem',
  },
  subheading: {
    fontSize: '1.5rem',
  },
  primaryButton: {
    minWidth: 100,
    backgroundColor: pallete.primary,
    padding: 10,
    transition: 'transform ease-out .3s',
    '&:hover': {
      backgroundColor: pallete.primary,
      transform: 'scale(1.1)',
    },
    '&:focus': {
      backgroundColor: pallete.primary,
    },
  },
  secondaryButton: {
    maxWidth: '100px',
    backgroundColor: pallete.backgroundCard,
    padding: 10,
    transition: 'transform ease-out .3s',
    border: `1px solid ${pallete.primary}`,
    '&:hover': {
      backgroundColor: pallete.backgroundCard,
      transform: 'scale(1.1)',
    },
    '&:focus': {
      backgroundColor: pallete.backgroundCard,
    },
  },
  tertiaryButton: {
    backgroundColor: pallete.backgroundCard,
    padding: 10,
    transition: 'transform ease-out .3s',
    border: `1px solid ${pallete.brown}`,
    '&:hover': {
      backgroundColor: pallete.backgroundCard,
      transform: 'scale(1.1)',
    },
    '&:focus': {
      backgroundColor: pallete.backgroundCard,
    },
  },
  backIcon: {
    transition: 'transform ease-out .3s',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.2)',
    },
    position: 'absolute',
    top: 100,
    left: 40,
  },
  link: {
    textDecoration: 'none',
    color: pallete.brown,
    '&:active': {
      color: pallete.brown,
    },
  },
  icon: {
    color: pallete.brown,
    transition: 'transform ease-out .3s',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.2)',
    },
  },
  cardInactive: {
    opacity: 0.5,
  },
  toggleButton: {
    '&.MuiToggleButton-root': {
      '&.Mui-selected': {
        backgroundColor: pallete.primary,
        color: pallete.text,
        '&:hover': {
          backgroundColor: pallete.primary,
          color: pallete.text,
        },
      },
      '&:hover': {
        backgroundColor: pallete.lightAmber,
        color: pallete.text,
      },
    },
  },
});

export default useCommonStyle;
