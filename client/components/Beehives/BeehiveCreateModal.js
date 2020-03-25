import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import beehiveMutations from "../../mutations/beehive_mutations";
import BeehiveColors from "./BeehiveColors";
import {
  Modal,
  Typography,
  Button,
  FormLabel,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import useCommonStyle from "../../style/common";
import classnames from "classnames";

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
  const [statuses, setStatuses] = useState([]);
  const { ADD_BEEHIVE } = beehiveMutations;
  const [addBeehive] = useMutation(ADD_BEEHIVE, {
    onCompleted() {
      setSelectedColors([]);
      isActiveHandler(false);
    }
  });

  const commonClasses = useCommonStyle();

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
        statuses: statuses,
        position: getPosition(numberOfBeehivesInRow, numberOfBeehives)
      }
    });
  };

  return (
    <Modal
      aria-labelledby="beehive-create-modal"
      aria-describedby="beehive-create-modal"
      open={isAddBeehiveOpen}
      onClose={onModalClose}
    >
      <div className={commonClasses.modal}>
        <Typography
          component="h2"
          className={classnames(
            commonClasses.subheading,
            commonClasses.modalHeading
          )}
        >{`Nowy ul w pasiece: ${apiaryName}`}</Typography>
        <div className={commonClasses.modalContent}>
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
        </div>
        <div className={commonClasses.modalButtonSection}>
          <Button
            className={commonClasses.secondaryButton}
            onClick={onModalClose}
          >
            Anuluj
          </Button>
          <Button
            className={commonClasses.primaryButton}
            onClick={e => {
              handleIsAddBeehiveOpen();
              onBeehiveCreate(e);
            }}
          >
            Zapisz
          </Button>
        </div>
      </div>
    </Modal>
  );
};

BeehiveCreateModal.propTypes = {
  numberOfBeehives: PropTypes.number.isRequired,
  numberOfBeehivesInRow: PropTypes.number.isRequired,
  apiaryId: PropTypes.string.isRequired,
  apiaryName: PropTypes.string.isRequired
};

export default BeehiveCreateModal;
