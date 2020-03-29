import React from "react";
import { IconButton } from "@material-ui/core";
import PaletteIcon from "@material-ui/icons/Palette";
import BlockIcon from "@material-ui/icons/Block";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import useCommonStyles from "../../style/common";

const Icon = ({ type, onClick, disabled = false }) => {
  const commonClasses = useCommonStyles();
  const getIcon = () => {
    switch (type) {
      case "palette": {
        return <PaletteIcon className={commonClasses.icon} />;
      }
      case "block": {
        return <BlockIcon className={commonClasses.icon} />;
      }
      case "settings": {
        return <SettingsIcon className={commonClasses.icon} />;
      }
      case "delete": {
        return <DeleteIcon className={commonClasses.icon} />;
      }
    }
  };
  let icon = getIcon();

  return (
    <IconButton onClick={() => onClick()} color="secondary" disabled={disabled}>
      {icon}
    </IconButton>
  );
};

export default Icon;
