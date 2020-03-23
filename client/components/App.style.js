import { makeStyles } from "@material-ui/core/styles";
import pallete from "../style/pallete";

const useStyles = makeStyles({
  appContainer: {
    padding: 0,
    maxWidth: "100%",
    height: "100%"
  },
  appBar: {
    backgroundColor: pallete.primary,
    color: pallete.brown
  },
  contentContainer: {
    margin: "0 10%",
    padding: "5%"
  }
});

export default useStyles;
