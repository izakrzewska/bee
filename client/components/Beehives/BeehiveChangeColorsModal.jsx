import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { bool, string, func } from 'prop-types';
import beehiveMutations from '../../mutations/beehive_mutations';
import fetchApiary from '../../queries/fetchApiary';
import CustomModal from '../common/CustomModal';
import { beehiveType } from '../../types/types';
import BeehiveColors from './BeehiveColors';

const BeehiveChangeColorsModal = ({
  beehive,
  isChangeColorModalOpen,
  handleIsChangeColorModalOpen,
  apiaryId,
}) => {
  const { UPDATE_BEEHIVE } = beehiveMutations;
  const [updateBeehive] = useMutation(UPDATE_BEEHIVE);
  const [beehiveColors, setBeehiveColors] = useState();

  const onModalClose = () => {
    handleIsChangeColorModalOpen();
  };

  const beehiveUpdated = {
    id: beehive.id,
    colors: beehiveColors,
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
    setBeehiveColors(() => []);
    handleIsChangeColorModalOpen();
  };

  return (
    <CustomModal
      onModalClose={onModalClose}
      onModalSave={onModalSave}
      open={isChangeColorModalOpen}
      modalHeading="Wybierz nowy kolor ula"
    >
      <BeehiveColors beehiveColors={beehiveColors} setBeehiveColors={setBeehiveColors} />
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
