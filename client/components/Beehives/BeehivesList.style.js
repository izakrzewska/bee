import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useBeehivesListStyles = makeStyles({
  beehivesListContainer: {
    display: "flex",
    flexDirection: "column"
  },
  beehiveCard: {
    margin: "15px 0",
    backgroundColor: pallete.backgroundCard,
    padding: 10
  },
  cardInactive: {
    opacity: 0.5
  }
});

export default useBeehivesListStyles;
