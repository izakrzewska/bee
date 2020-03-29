import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import beehiveMutations from "../../mutations/beehive_mutations";
import BeehiveColors from "./BeehiveColors";
import { FormLabel, FormControlLabel, Switch } from "@material-ui/core";
import CustomModal from "../common/CustomModal";

const BeehiveCreateModal = ({
  numberOfBeehives,
  numberOfBeehivesInRow,
  apiaryId,
  handleIsAddBeehiveOpen,
  isAddBeehiveOpen,
  apiaryName
}) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [isActive, isActiveHandler] = useState(false);
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

  const onModalClose = () => {
    handleIsAddBeehiveOpen();
    setSelectedColors([]);
    isActiveHandler(false);
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
        statuses: [],
        position: getPosition(numberOfBeehivesInRow, numberOfBeehives)
      }
    });
  };

  const onModalSave = e => {
    handleIsAddBeehiveOpen();
    onBeehiveCreate(e);
  };

  return (
    <CustomModal
      onModalClose={onModalClose}
      onModalSave={onModalSave}
      open={isAddBeehiveOpen}
      modalHeading={`Nowy ul w pasiece: ${apiaryName}`}
    >
      <FormLabel htmlFor="beehiveColors">Kolory ula:</FormLabel>
      <BeehiveColors
        id="beehiveColors"
        onChangeHandler={setBeehiveColorHandler}
        selectedColors={selectedColors}
        selectable
        className="beehiveColorsModal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={isActive}
            onChange={() => isActiveHandler(!isActive)}
            name="mapView"
            color="primary"
          />
        }
        label="Aktywny"
      />
    </CustomModal>
  );
};

BeehiveCreateModal.propTypes = {
  numberOfBeehives: PropTypes.number.isRequired,
  numberOfBeehivesInRow: PropTypes.number.isRequired,
  apiaryId: PropTypes.string.isRequired,
  apiaryName: PropTypes.string.isRequired
};

export default BeehiveCreateModal;
