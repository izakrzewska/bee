import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useStyles = makeStyles({
  container: {
    padding: 20
  },
  card: {
    minWidth: 275,
    marginBottom: 15,
    color: pallete.brown,
    backgroundColor: pallete.backgroundCard,
    padding: 10
  },
  cardText: {
    color: pallete.brown
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  deleteIcon: {
    color: pallete.brown
  },
  mapIcon: {
    color: pallete.brown,
    margin: 5,
    textAlign: "right"
  },
  button: {
    backgroundColor: pallete.secondary,
    color: pallete.brown,
    "&:hover": {
      backgroundColor: pallete.secondary,
      color: pallete.brown
    }
  }
});

export default useStyles;
