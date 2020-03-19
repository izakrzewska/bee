import React from "react";
import PropTypes from "prop-types";
import useBeehiveColorsStyles from "./BeehiveColors.style";

const BeehiveColors = ({
  availableColors,
  onChangeHandler,
  selectedColors,
  selectable
}) => {
  const classes = useBeehiveColorsStyles();

  const getBorderStyle = id => {
    if (selectable) {
      if (selectedColors.includes(id)) {
        return "10px solid transparent";
      } else {
        return "5px solid white";
      }
    }

    return "5px solid white";
  };

  return (
    <div className={classes.colorBoxContainer}>
      {availableColors.map(color => {
        return (
          <div key={color.hex}>
            <label
              htmlFor={color.id}
              style={{
                backgroundColor: color.hex,
                border: getBorderStyle(color.id)
              }}
              className={classes.colorBox}
            ></label>
            {selectable && (
              <input
                type="checkbox"
                id={color.id}
                value={color.id}
                onChange={({ target: { value } }) => onChangeHandler(value)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

BeehiveColors.propTypes = {
  availableColors: PropTypes.array.isRequired,
  selectable: PropTypes.bool,
  onChangeHandler: PropTypes.func,
  selectedColors: PropTypes.array
};

export default BeehiveColors;
