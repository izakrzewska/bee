import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useApiariesCreateStyles = makeStyles({
  backIcon: {
    marginTop: "20px",
    color: pallete.brown,
    transition: "transform ease-out .3s",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)"
    }
  },
  addApiaryForm: {
    marginBottom: 0
  },
  addApiaryHeading: {
    fontSize: 25,
    marginTop: 25,
    marginBottom: 25
  },
  formInputs: {
    position: "relative",
    display: "flex",
    flexDirection: "column",

    "& label": {
      width: "50%",
      fontWeight: "bold"
    },

    "& input": {
      width: "50%"
    }
  },
  formButton: {
    position: "absolute",
    left: "60%",
    bottom: "10%"
  },
  button: {
    backgroundColor: pallete.secondary,
    color: pallete.brown,
    padding: 10,
    transition: "transform ease-out .3s",
    "&:hover": {
      backgroundColor: pallete.secondary,
      color: pallete.brown,
      transform: "scale(1.2)"
    }
  },

  apiaryLocation: {
    height: 350,
    overflow: "hidden"
  }
});

export default useApiariesCreateStyles;
