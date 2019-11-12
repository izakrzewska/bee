import { makeStyles } from "@material-ui/core/styles";
import pallete from "../style/pallete";

const useStyles = makeStyles({
  appContainer: {
    padding: 0,
    height: "100%",
    backgroundColor: pallete.backgroundMain
  },
  appBar: {
    backgroundColor: pallete.primary,
    color: pallete.brown,
    marginBottom: 25
  }
});

export default useStyles;
