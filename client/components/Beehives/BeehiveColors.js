import React from "react";
import PropTypes from "prop-types";
import useBeehiveColorsStyles from "./BeehiveColors.style";

const BeehiveColors = ({ colors }) => {
  const classes = useBeehiveColorsStyles();

  return (
    <div className={classes.colorBoxContainer}>
      {colors.map(color => {
        return (
          <div
            key={color.hex}
            style={{ backgroundColor: color.hex }}
            className={classes.colorBox}
          ></div>
        );
      })}
    </div>
  );
};

BeehiveColors.propTypes = {
  colors: PropTypes.array.isRequired
};

export default BeehiveColors;
