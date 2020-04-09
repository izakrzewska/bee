import React, { useState } from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {
  arrayOf, string, shape, func,
} from 'prop-types';
import PaletteIcon from '@material-ui/icons/Palette';
import BlockIcon from '@material-ui/icons/Block';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const CustomSpeedDial = ({ actions, ariaLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const getIcon = (type) => {
    let icon;
    switch (type) {
      case 'palette': {
        icon = <PaletteIcon color="secondary" />;
        break;
      }
      case 'block': {
        icon = <BlockIcon color="secondary" />;
        break;
      }
      case 'settings': {
        icon = <SettingsIcon color="secondary" />;
        break;
      }
      case 'delete': {
        icon = <DeleteIcon color="secondary" />;
        break;
      }
      case 'move': {
        icon = <ArrowUpwardIcon color="secondary" />;
        break;
      }
      case 'problem': {
        icon = <ReportProblemIcon color="secondary" />;
        break;
      }
      default: {
        icon = <FiberManualRecordIcon color="secondary" />;
      }
    }
    return icon;
  };


  return (
    <SpeedDial
      ariaLabel={ariaLabel}
      icon={<SettingsIcon color="secondary" />}
      onClose={handleIsOpen}
      onOpen={handleIsOpen}
      open={isOpen}
      direction="left"
    >
      {actions.map((action) => (
        <SpeedDialAction
          tooltipPlacement="bottom"
          key={action.name}
          icon={getIcon(action.name)}
          tooltipTitle={action.tooltip}
          onClick={action.onClick}
          delay={100}
        />
      ))}
    </SpeedDial>
  );
};

CustomSpeedDial.propTypes = {
  ariaLabel: string.isRequired,
  actions: arrayOf(shape({
    name: string.isRequired,
    onClick: func.isRequired,
    tooltip: string.isRequired,
  })).isRequired,
};

export default CustomSpeedDial;
