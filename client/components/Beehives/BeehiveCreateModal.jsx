import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  number, string, bool, func,
} from 'prop-types';
import { FormLabel, FormControlLabel, Switch } from '@material-ui/core';
import beehiveMutations from '../../mutations/beehive_mutations';
import BeehiveColors from './BeehiveColors';
import CustomModal from '../common/CustomModal';
import getPosition from './utils';

const BeehiveCreateModal = ({
  numberOfBeehives,
  numberOfBeehivesInRow,
  apiaryId,
  handleIsAddBeehiveOpen,
  isAddBeehiveOpen,
  apiaryName,
}) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [isActive, isActiveHandler] = useState(false);
  const { ADD_BEEHIVE } = beehiveMutations;
  const [addBeehive] = useMutation(ADD_BEEHIVE, {
    onCompleted() {
      setSelectedColors([]);
      isActiveHandler(false);
    },
  });

  const setBeehiveColorHandler = (chosenColor) => {
    if (selectedColors.includes(chosenColor)) {
      setSelectedColors(() => selectedColors.filter((color) => color !== chosenColor));
    } else {
      setSelectedColors(() => [...selectedColors, chosenColor]);
    }
  };

  const onModalClose = () => {
    handleIsAddBeehiveOpen();
    setSelectedColors([]);
    isActiveHandler(false);
  };

  const onBeehiveCreate = (e) => {
    e.preventDefault();
    addBeehive({
      variables: {
        apiaryId,
        colors: selectedColors,
        active: isActive,
        statuses: [],
        position: getPosition(numberOfBeehives, numberOfBeehivesInRow),
      },
    });
  };

  const onModalSave = (e) => {
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
        control={(
          <Switch
            checked={isActive}
            onChange={() => isActiveHandler(!isActive)}
            name="mapView"
            color="primary"
          />
        )}
        label="Aktywny"
      />
    </CustomModal>
  );
};

BeehiveCreateModal.propTypes = {
  numberOfBeehives: number.isRequired,
  numberOfBeehivesInRow: number.isRequired,
  apiaryId: string.isRequired,
  apiaryName: string.isRequired,
  isAddBeehiveOpen: bool.isRequired,
  handleIsAddBeehiveOpen: func.isRequired,
};

export default BeehiveCreateModal;
