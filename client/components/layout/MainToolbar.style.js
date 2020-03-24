import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useStyles = makeStyles({
  appLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    color: pallete.brown
  },
  appIcon: {
    fontSize: "3rem"
  }
});

export default useStyles;
