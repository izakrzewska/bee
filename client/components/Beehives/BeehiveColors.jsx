import React from 'react';
import { func, arrayOf, string } from 'prop-types';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import availableColors from '../../colors';

const BeehiveColors = ({
  beehiveColors,
  setBeehiveColors,
}) => {
  const onColorChange = (_, newColor) => {
    setBeehiveColors(newColor);
  };

  return (
    <ToggleButtonGroup
      value={beehiveColors}
      onChange={onColorChange}
    >
      {availableColors.map((color) => (
        <ToggleButton key={color.id} value={color.id}>{color.name}</ToggleButton>))}
    </ToggleButtonGroup>
  );
};

BeehiveColors.defaultProps = {
  beehiveColors: [],
};

BeehiveColors.propTypes = {
  setBeehiveColors: func.isRequired,
  beehiveColors: arrayOf(string),
};


export default BeehiveColors;
