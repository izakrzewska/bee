import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useApiariesListStyles = makeStyles({
  apiaryCard: {
    margin: 15,
    backgroundColor: pallete.backgroundCard,
    padding: 10,
    flexGrow: 1
  },
  switchViewSection: {
    textAlign: "right",
    marginBottom: 10
  },
  apiariesCardsSection: {
    display: "flex",
    flexDirection: "column"
  },
  apiaryCardActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  addNewApiaryButton: {
    textAlign: "center",
    margin: "20px 0"
  }
});

export default useApiariesListStyles;
