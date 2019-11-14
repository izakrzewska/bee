import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../../style/pallete";

const useApiariesListMarkerStyle = makeStyles({
  apiaryMarker: {
    color: pallete.brown,
    transition: "transform ease-out .3s",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)"
    }
  }
});

export default useApiariesListMarkerStyle;
