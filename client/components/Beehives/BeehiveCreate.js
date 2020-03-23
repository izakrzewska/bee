import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import beehiveMutations from "../../mutations/beehive_mutations";
import BeehiveColors from "./BeehiveColors";

const BeehiveCreate = ({
  numberOfBeehives,
  numberOfBeehivesInRow,
  apiaryId,
  handleIsAddFormVisible
}) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [isActive, isActiveHandler] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const { ADD_BEEHIVE } = beehiveMutations;
  const [addBeehive] = useMutation(ADD_BEEHIVE, {
    onCompleted() {
      setSelectedColors([]);
      isActiveHandler(false);
    }
  });

  const setBeehiveColorHandler = chosenColor => {
    if (selectedColors.includes(chosenColor)) {
      setSelectedColors(() => {
        return selectedColors.filter(color => color !== chosenColor);
      });
    } else {
      setSelectedColors(() => {
        return [...selectedColors, chosenColor];
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
        colors: selectedColors,
        active: isActive,
        statuses: statuses,
        position: getPosition(numberOfBeehivesInRow, numberOfBeehives)
      }
    });
  };

  return (
    <form>
      <div>
        <h6>Wybierz kolory ula:</h6>
        <BeehiveColors
          onChangeHandler={setBeehiveColorHandler}
          selectedColors={selectedColors}
          selectable
        />
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
