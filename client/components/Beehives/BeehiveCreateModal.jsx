import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  number, string, bool, func,
} from 'prop-types';
import beehiveMutations from '../../mutations/beehive_mutations';
import CustomModal from '../common/CustomModal';
import getPosition from './utils';
import BeehiveColors from './BeehiveColors';

const BeehiveCreateModal = ({
  numberOfBeehives,
  numberOfBeehivesInRow,
  apiaryId,
  handleIsAddBeehiveOpen,
  isAddBeehiveOpen,
  apiaryName,
}) => {
  const [beehiveColors, setBeehiveColors] = useState(() => []);
  const { ADD_BEEHIVE } = beehiveMutations;
  const [addBeehive] = useMutation(ADD_BEEHIVE, {
    onCompleted() {
      setBeehiveColors(() => []);
    },
  });

  const onModalClose = () => {
    handleIsAddBeehiveOpen();
    setBeehiveColors([]);
  };

  const onBeehiveCreate = (e) => {
    e.preventDefault();
    addBeehive({
      variables: {
        apiaryId,
        colors: beehiveColors,
        active: true,
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
      modalHeading={`Wybierz kolory nowego ula w pasiece: ${apiaryName}`}
    >
      <BeehiveColors beehiveColors={beehiveColors} setBeehiveColors={setBeehiveColors} />
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
