import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import useStyles from "./MainToolbar.style";
import { Link } from "react-router";
import useCommonStyles from "../../style/common";
import classnames from "classnames";

const MainToolbar = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <Toolbar>
      <div className={classes.appLogo}>
        <Link to={"/"} className={commonClasses.link}>
          <EmojiNatureIcon className={classes.appIcon} />
        </Link>
      </div>
      <div className={classes.navigationBar}>
        <Link
          to={"/apiaries"}
          className={classnames(commonClasses.link, classes.navigationLink)}
        >
          <Typography>Pasieki</Typography>
        </Link>
        <Link
          to={"/"}
          className={classnames(commonClasses.link, classes.navigationLink)}
        >
          <Typography>Kalendarz</Typography>
        </Link>
      </div>
    </Toolbar>
  );
};

export default MainToolbar;
