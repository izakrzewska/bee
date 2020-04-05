import React from 'react';
import { IconButton } from '@material-ui/core';
import PaletteIcon from '@material-ui/icons/Palette';
import BlockIcon from '@material-ui/icons/Block';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import { string, func, bool } from 'prop-types';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import useCommonStyles from '../../style/common';

const Icon = ({ type, onClick, disabled }) => {
  const commonClasses = useCommonStyles();
  const getIcon = () => {
    let icon;
    switch (type) {
      case 'palette': {
        icon = <PaletteIcon className={commonClasses.icon} />;
        break;
      }
      case 'block': {
        icon = <BlockIcon className={commonClasses.icon} />;
        break;
      }
      case 'settings': {
        icon = <SettingsIcon className={commonClasses.icon} />;
        break;
      }
      case 'delete': {
        icon = <DeleteIcon className={commonClasses.icon} />;
        break;
      }
      case 'move': {
        icon = <ArrowUpwardIcon className={commonClasses.icon} />;
        break;
      }
      default: {
        icon = <FiberManualRecordIcon className={commonClasses.icon} />;
      }
    }
    return icon;
  };
  const icon = getIcon();

  return (
    <IconButton onClick={() => onClick()} color="secondary" disabled={disabled}>
      {icon}
    </IconButton>
  );
};

Icon.defaultProps = {
  disabled: false,
};

Icon.propTypes = {
  type: string.isRequired,
  onClick: func.isRequired,
  disabled: bool,
};

export default Icon;
