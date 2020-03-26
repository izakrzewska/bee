import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useBeehiveCardStyle = makeStyles({
  beehiveCard: {
    margin: "15px 0",
    backgroundColor: pallete.backgroundCard,
    padding: 10,
    position: "relative",
    minHeight: 180,
    display: "flex",
    flexDirection: "column"
  },
  beehiveCardActions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "auto"
  }
});

export default useBeehiveCardStyle;
