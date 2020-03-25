import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useApiaryCardStyle = makeStyles({
  apiaryCard: {
    margin: "15px 0",
    backgroundColor: pallete.backgroundCard,
    padding: 10,
    flexGrow: 1
  },
  apiaryCardActions: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

export default useApiaryCardStyle;
