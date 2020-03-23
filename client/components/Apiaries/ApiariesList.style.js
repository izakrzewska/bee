import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useApiariesListStyles = makeStyles({
  card: {
    minWidth: 275,
    width: "35%",
    margin: 15,
    color: pallete.brown,
    backgroundColor: pallete.backgroundCard,
    padding: 10
  },
  topIconsSection: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "flex-end",
    minHeight: "70px",
    height: "70px"
  },
  apiariesCardsSection: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  cardText: {
    color: pallete.brown
  },
  cardName: {
    color: pallete.brown,
    borderBottom: `1px solid ${pallete.backgroundCard}`,
    transition: "border-bottom ease-out .5s",
    "&:hover": {
      cursor: "pointer",
      borderBottom: `1px solid ${pallete.brown}`
    }
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  deleteIcon: {
    color: pallete.brown,
    transition: "transform ease-out .3s",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)"
    }
  },
  viewIcon: {
    color: pallete.brown,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "right",
    transition: "transform ease-out .3s",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)"
    }
  },
  addNewApiaryButton: {
    position: "absolute",
    right: "5%",
    top: "10%"
  },
  mainListContainer: {
    position: "relative"
  }
});

export default useApiariesListStyles;
