import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useApiaryDetailsStyles = makeStyles({
  apiaryDetailsContainer: {
    textAlign: "center",
    position: "relative"
  },
  backIcon: {
    marginTop: "20px",
    color: pallete.brown,
    transition: "transform ease-out .3s",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)"
    },
    position: "absolute",
    top: 10,
    left: 10
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
  apiaryName: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 50
  },
  apiaryInfo: {
    fontSize: 17
  }
});

export default useApiaryDetailsStyles;
