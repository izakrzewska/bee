import { makeStyles } from "@material-ui/core/styles";
import pallete from "../style/pallete";

const useStyles = makeStyles({
  appContainer: {
    padding: 0,
    height: "100%",
    backgroundColor: pallete.background
  },
  appBar: {
    backgroundColor: pallete.primary,
    color: pallete.text
  }
});

export default useStyles;
