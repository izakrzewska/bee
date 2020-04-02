import React from 'react';
import classnames from 'classnames';
import {
  string, bool, func, arrayOf,
} from 'prop-types';
import useBeehiveColorsStyles from './BeehiveColors.style';
import availableColors from '../../colors';
import useCommonStyles from '../../style/common';

const BeehiveColors = ({
  onChangeHandler,
  selectedColors,
  selectable,
  className,
}) => {
  const classes = useBeehiveColorsStyles();
  const commonClasses = useCommonStyles();

  const getBackgroundColor = (id) => {
    let backgroundColor;
    availableColors.map((color) => {
      if (color.id === id) {
        backgroundColor = color.hex;
      }
      return backgroundColor;
    });
    return backgroundColor;
  };

  return (
    <div className={classnames(classes.colorBoxContainer, classes[className])}>
      {selectable
        ? availableColors.map((color) => {
          const { id } = color;
          return (
            <div key={id}>
              <label
                htmlFor={id}
                style={{
                  backgroundColor: color.hex,
                }}
                className={classnames(
                  classes.colorBox,
                  selectedColors.includes(id)
                    ? classes.borderActive
                    : classes.borderInactive,
                )}
              >
                <input
                  type="checkbox"
                  id={id}
                  value={id}
                  onChange={() => onChangeHandler(id)}
                  className={commonClasses.hidden}
                />
              </label>
            </div>
          );
        })
        : selectedColors.map((color) => (
          <div
            key={color}
            className={classes.colorBoxCard}
            style={{
              backgroundColor: getBackgroundColor(color),
            }}
          />
        ))}
    </div>
  );
};

BeehiveColors.defaultProps = {
  className: '',
  selectable: false,
  onChangeHandler: () => {},
};

BeehiveColors.propTypes = {
  className: string,
  selectable: bool,
  onChangeHandler: func,
  selectedColors: arrayOf(string).isRequired,
};


export default BeehiveColors;
