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
  heading: {
    fontSize: "2rem",
    color: pallete.brown
  },
  subheading: {
    fontSize: "1.5rem",
    color: pallete.brown
  },
  primaryButton: {
    maxWidth: "100px",
    backgroundColor: pallete.primary,
    color: pallete.brown,
    padding: 10,
    transition: "transform ease-out .3s",
    "&:hover": {
      backgroundColor: pallete.primary,
      color: pallete.brown,
      transform: "scale(1.1)"
    },
    "&:focus": {
      backgroundColor: pallete.primary,
      color: pallete.brown
    }
  },
  secondaryButton: {
    maxWidth: "100px",
    backgroundColor: pallete.backgroundCard,
    color: pallete.brown,
    padding: 10,
    transition: "transform ease-out .3s",
    border: `1px solid ${pallete.primary}`,
    "&:hover": {
      backgroundColor: pallete.backgroundCard,
      color: pallete.brown,
      transform: "scale(1.1)"
    },
    "&:focus": {
      backgroundColor: pallete.backgroundCard,
      color: pallete.brown
    }
  }
});

export default useCommonStyle;
