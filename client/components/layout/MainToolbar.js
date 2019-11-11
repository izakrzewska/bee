import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import useStyles from "./MainToolbar.style";

const MainToolbar = () => {
  const classes = useStyles();
  const { appLogo, appIcon } = classes;
  return (
    <Toolbar>
      <div className={appLogo}>
        <EmojiNatureIcon className={appIcon} />
        <Typography variant='h6'>BEES</Typography>
      </div>
    </Toolbar>
  );
};

export default MainToolbar;
