import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useBeehiveColorsStyles = makeStyles({
  colorBox: {
    width: "50px",
    height: "50px",
    display: "block",
    margin: 10
  },
  colorBoxCard: {
    width: "25px",
    height: "25px"
  },
  colorBoxContainer: {
    display: "flex"
  },
  beehiveCardColors: {
    position: "absolute",
    top: "5%",
    right: "5%"
  }
});

export default useBeehiveColorsStyles;
