import { makeStyles } from "@material-ui/core/styles";
import pallete from "../../style/pallete";

const useLoadingStyles = makeStyles({
  loader: {
    color: pallete.brown,
    textIndent: "-9999em",
    margin: "88px auto",
    position: "relative",
    fontSize: "11px",
    transform: "translateZ(0)",
    animationDelay: "-0.16s",
    background: pallete.brown,
    animation: `$load 1s infinite ease-in-out`,
    width: "1em",
    height: "4em",
    "&::after": {
      position: "absolute",
      top: 0,
      content: "''",
      background: pallete.brown,
      animation: `$load 1s infinite ease-in-out`,
      width: "1em",
      height: "4em",
      left: "1.5em"
    },
    "&::before": {
      position: "absolute",
      top: 0,
      content: "''",
      background: pallete.brown,
      animation: `$load 1s infinite ease-in-out`,
      width: "1em",
      height: "4em",
      left: "-1.5em",
      animationDelay: "-0.32s"
    }
  },
  "@keyframes load": {
    "0%": {
      boxShadow: "0 0",
      height: "4em"
    },
    "40%": {
      boxShadow: "0 -2em",
      height: "5em"
    },
    "80%": {
      boxShadow: "0 0",
      height: "4em"
    },
    "100%": {
      boxShadow: "0 0",
      height: "4em"
    }
  }
});

export default useLoadingStyles;
