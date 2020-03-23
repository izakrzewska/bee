import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useBeehivesListStyles = makeStyles({
  beehivesListContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20
  },
  beehiveCard: {
    minWidth: 275,
    width: "25%",
    margin: 15,
    color: pallete.brown,
    backgroundColor: pallete.backgroundCard,
    padding: 10,
    position: "relative"
  }
});

export default useBeehivesListStyles;
