import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import useBeehiveColorsStyles from "./BeehiveColors.style";
import availableColors from "../../colors";
import useCommonStyles from "../../style/common";

const BeehiveColors = ({
  onChangeHandler,
  selectedColors,
  selectable,
  className
}) => {
  const classes = useBeehiveColorsStyles();
  const commonClasses = useCommonStyles();

  const getBackgroundColor = id => {
    let backgroundColor;
    availableColors.map(color => {
      if (color.id === id) {
        backgroundColor = color.hex;
      }
    });
    return backgroundColor;
  };

  return (
    <div className={classnames(classes.colorBoxContainer, classes[className])}>
      {selectable
        ? availableColors.map(color => {
            return (
              <div key={color.id}>
                <label
                  htmlFor={color.id}
                  style={{
                    backgroundColor: color.hex
                  }}
                  className={classnames(
                    classes.colorBox,
                    selectedColors.includes(color.id)
                      ? classes.borderActive
                      : classes.borderInactive
                  )}
                ></label>
                <input
                  type="checkbox"
                  id={color.id}
                  value={color.id}
                  onChange={() => onChangeHandler(color.id)}
                  className={commonClasses.hidden}
                />
              </div>
            );
          })
        : selectedColors.map(color => {
            return (
              <div
                key={color}
                className={classes.colorBoxCard}
                style={{
                  backgroundColor: getBackgroundColor(color)
                }}
              ></div>
            );
          })}
    </div>
  );
};

BeehiveColors.propTypes = {
  className: PropTypes.string,
  selectable: PropTypes.bool,
  onChangeHandler: PropTypes.func,
  selectedColors: PropTypes.array
};

export default BeehiveColors;
