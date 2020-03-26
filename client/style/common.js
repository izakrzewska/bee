import { makeStyles } from "@material-ui/core/styles";
import pallete from "./pallete";

const useCommonStyle = makeStyles({
  modal: {
    padding: "30px",
    width: "50%",
    height: "50%",
    backgroundColor: pallete.backgroundCard,
    position: "absolute",
    left: "25%",
    top: "25%",
    border: `5px solid ${pallete.primary}`,
    display: "flex",
    flexDirection: "column"
  },
  modalButtonSection: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "auto",
    "& > button": {
      marginRight: 10
    },
    "& > button:last-of-type": {
      marginRight: 0
    }
  },
  modalHeading: {
    textAlign: "center",
    marginBottom: 30
  },
  modalContent: {
    minHeight: "60%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  heading: {
    fontSize: "2rem"
  },
  subheading: {
    fontSize: "1.5rem"
  },
  primaryButton: {
    minWidth: 100,
    backgroundColor: pallete.primary,
    padding: 10,
    transition: "transform ease-out .3s",
    "&:hover": {
      backgroundColor: pallete.primary,
      transform: "scale(1.1)"
    },
    "&:focus": {
      backgroundColor: pallete.primary
    }
  },
  secondaryButton: {
    maxWidth: "100px",
    backgroundColor: pallete.backgroundCard,
    padding: 10,
    transition: "transform ease-out .3s",
    border: `1px solid ${pallete.primary}`,
    "&:hover": {
      backgroundColor: pallete.backgroundCard,
      transform: "scale(1.1)"
    },
    "&:focus": {
      backgroundColor: pallete.backgroundCard
    }
  },
  backIcon: {
    transition: "transform ease-out .3s",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.2)"
    },
    position: "absolute",
    top: 100,
    left: 40
  },
  link: {
    textDecoration: "none",
    color: pallete.brown,
    "&:active": {
      color: pallete.brown
    }
  },
  icon: {
    color: pallete.brown,
    transition: "transform ease-out .3s",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.2)"
    }
  },
  hidden: {
    display: "none"
  },
  cardInactive: {
    opacity: 0.5
  }
});

export default useCommonStyle;
