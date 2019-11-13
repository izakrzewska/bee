import { makeStyles } from "@material-ui/core/styles";
import pallete from "../style/pallete";

const useStyles = makeStyles({
  appContainer: {
    padding: 0,
    minHeight: "100%",
    backgroundColor: pallete.backgroundMain
  },
  appBar: {
    backgroundColor: pallete.primary,
    color: pallete.brown
  }
});

export default useStyles;
