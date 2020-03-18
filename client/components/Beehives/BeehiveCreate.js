import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import enums from "../../enums";
import beehiveMutations from "../../mutations/beehive_mutations";

const BeehiveCreate = ({
  numberOfBeehives,
  numberOfBeehivesInRow,
  apiaryId,
  handleIsAddFormVisible,
  isAddFormVisible
}) => {
  const [colors, setColors] = useState([]);
  const [isActive, isActiveHandler] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const { ADD_BEEHIVE } = beehiveMutations;
  const [addBeehive] = useMutation(ADD_BEEHIVE, {
    onCompleted() {
      setColors([]);
      isActiveHandler(false);
    }
  });

  const setBeehiveColor = (colors, chosenColor) => {
    if (colors.includes(chosenColor)) {
      setColors(() => {
        return colors.filter(color => color !== chosenColor);
      });
    } else {
      setColors(() => {
        return [...colors, chosenColor];
      });
    }
  };

  const getPosition = (numberOfBeehivesInRow, numberOfBeehives) => {
    const rowValue = Math.floor(numberOfBeehives / numberOfBeehivesInRow + 1);
    let numberValue;
    const modulo = numberOfBeehives % numberOfBeehivesInRow;

    if (
      numberOfBeehives === 0 ||
      numberOfBeehives === numberOfBeehivesInRow ||
      modulo === 0
    ) {
      numberValue = 1;
    } else if (numberOfBeehives < numberOfBeehivesInRow) {
      numberValue = numberOfBeehives + 1;
    } else {
      numberValue = modulo + 1;
    }
    return {
      row: rowValue,
      number: numberValue
    };
  };

  const onBeehiveCreate = e => {
    e.preventDefault();
    addBeehive({
      variables: {
        apiaryId: apiaryId,
        colors: colors,
        active: isActive,
        statuses: statuses,
        position: getPosition(numberOfBeehivesInRow, numberOfBeehives)
      }
    });
  };

  const { availableColors } = enums;

  return (
    <form>
      <div>
        <h6>Wybierz kolory ula:</h6>
        {availableColors.map(({ id, displayValue }) => {
          return (
            <div key={id}>
              <label htmlFor={id}>{displayValue}</label>
              <input
                type="checkbox"
                id={id}
                value={id}
                onChange={({ target: { value } }) =>
                  setBeehiveColor(colors, value)
                }
              />
            </div>
          );
        })}
      </div>
      <div>
        <label htmlFor="active">Aktywny:</label>
        <input
          type="checkbox"
          id="active"
          value={isActive}
          onChange={() => isActiveHandler(!isActive)}
        />
      </div>
      <button
        className="btn-large right"
        onClick={e => {
          handleIsAddFormVisible();
          onBeehiveCreate(e);
        }}
      >
        Dodaj
      </button>
    </form>
  );
};

BeehiveCreate.propTypes = {
  numberOfBeehives: PropTypes.number.isRequired,
  numberOfBeehivesInRow: PropTypes.number.isRequired,
  apiaryId: PropTypes.string.isRequired
};

export default BeehiveCreate;
