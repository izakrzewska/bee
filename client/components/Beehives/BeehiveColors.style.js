import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useBeehiveColorsStyles = makeStyles({
  colorBox: {
    width: "50px",
    height: "50px",
    display: "block",
    margin: 10
  },
  colorBoxContainer: {
    display: "flex"
  }
});

export default useBeehiveColorsStyles;
