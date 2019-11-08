import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import enums from "../../enums";
import beehiveMutations from "../../mutations/beehive_mutations";

const BeehiveCreate = ({
  mutate,
  numberOfBeehives,
  numberOfBeehivesInRow,
  apiaryId
}) => {
  const [content, setContent] = useState("");
  const [colors, setColors] = useState([]);
  const [isActive, isActiveHandler] = useState(false);
  const [statuses, setStatuses] = useState([]);

  const setBeehiveColor = (colors, chosenColor) => {
    if (colors.includes(chosenColor)) {
      setColors(() => {
        colors.filter(color => color !== chosenColor);
      });
    } else {
      setColors(() => {
        return [...colors, chosenColor];
      });
    }
  };

  const getPosition = (numberOfBeehivesInRow, numberOfBeehives) => {
    const rowValue = numberOfBeehives / numberOfBeehivesInRow + 1;
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
    mutate({
      variables: {
        apiaryId: apiaryId,
        content: content,
        colors: colors,
        active: isActive,
        statuses: statuses,
        position: getPosition(numberOfBeehivesInRow, numberOfBeehives)
      }
    }).then(() => {
      setContent("");
      setColors([]);
      isActiveHandler(false);
    });
  };

  const { availableColors } = enums;

  return (
    <form>
      <label htmlFor='content'>Add a content</label>
      <input
        id='content'
        value={content}
        onChange={({ target: { value } }) => setContent(value)}
      />
      <div>
        <h6>Wybierz kolory ula:</h6>
        {availableColors.map(({ id, displayValue }) => {
          return (
            <div key={id}>
              <label htmlFor={id}>{displayValue}</label>
              <input
                type='checkbox'
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
        <label htmlFor='active'>Aktywny:</label>
        <input
          type='checkbox'
          id='active'
          value={isActive}
          onChange={() => isActiveHandler(!isActive)}
        />
      </div>
      <button
        className='btn-floating btn-large red right'
        onClick={e => onBeehiveCreate(e)}>
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

const { ADD_BEEHIVE } = beehiveMutations;
export default graphql(ADD_BEEHIVE)(BeehiveCreate);
