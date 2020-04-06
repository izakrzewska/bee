import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { bool, string, func } from 'prop-types';
import BeehiveColors from './BeehiveColors';
import beehiveMutations from '../../mutations/beehive_mutations';
import fetchApiary from '../../queries/fetchApiary';
import CustomModal from '../common/CustomModal';
import { beehiveType } from '../../types/types';

const BeehiveChangeColorsModal = ({
  beehive,
  isChangeColorModalOpen,
  handleIsChangeColorModalOpen,
  apiaryId,
}) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const { UPDATE_BEEHIVE } = beehiveMutations;
  const [updateBeehive] = useMutation(UPDATE_BEEHIVE);

  const setBeehiveColorHandler = (chosenColor) => {
    if (selectedColors.includes(chosenColor)) {
      setSelectedColors(() => selectedColors.filter((color) => color !== chosenColor));
    } else {
      setSelectedColors(() => [...selectedColors, chosenColor]);
    }
  };

  const onModalClose = () => {
    handleIsChangeColorModalOpen();
    setSelectedColors(beehive.colors);
  };

  const beehiveUpdated = {
    id: beehive.id,
    colors: selectedColors,
    active: beehive.active,
    statuses: beehive.statuses,
    position: {
      row: beehive.position.row,
      number: beehive.position.number,
    },
  };

  const onModalSave = () => {
    updateBeehive({
      variables: { id: beehive.id, beehiveUpdated },
      refetchQueries: [
        {
          query: fetchApiary,
          variables: { id: apiaryId },
        },
      ],
    });
    setSelectedColors([]);
    handleIsChangeColorModalOpen();
  };

  return (
    <CustomModal
      onModalClose={onModalClose}
      onModalSave={onModalSave}
      open={isChangeColorModalOpen}
      modalHeading="Wybierz nowy kolor ula"
    >
      <BeehiveColors
        id="beehiveColors"
        onChangeHandler={setBeehiveColorHandler}
        selectedColors={selectedColors}
        selectable
        className="beehiveColorsModal"
      />
    </CustomModal>
  );
};

BeehiveChangeColorsModal.propTypes = {
  beehive: beehiveType.isRequired,
  isChangeColorModalOpen: bool.isRequired,
  handleIsChangeColorModalOpen: func.isRequired,
  apiaryId: string.isRequired,
};

export default BeehiveChangeColorsModal;
