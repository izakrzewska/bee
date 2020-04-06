import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { bool, string, func } from 'prop-types';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import beehiveMutations from '../../mutations/beehive_mutations';
import fetchApiary from '../../queries/fetchApiary';
import CustomModal from '../common/CustomModal';
import { beehiveType } from '../../types/types';

const BeehiveStatusModal = ({
  beehive,
  isStatusModalOpen,
  handleIsStatusModalOpen,
  apiaryId,
}) => {
  const { UPDATE_BEEHIVE } = beehiveMutations;
  const [updateBeehive] = useMutation(UPDATE_BEEHIVE);
  const [beehiveStatuses, setBeehiveStatuses] = useState(() => []);


  const onModalClose = () => {
    handleIsStatusModalOpen();
    setBeehiveStatuses([]);
  };

  const onModalSave = () => {
    const beehiveUpdated = {
      id: beehive.id,
      colors: beehive.colors,
      active: beehive.active,
      statuses: beehiveStatuses,
      position: {
        row: beehive.position.row,
        number: beehive.position.number,
      },
    };

    handleIsStatusModalOpen();
    updateBeehive({
      variables: { id: beehive.id, beehiveUpdated },
      refetchQueries: [
        {
          query: fetchApiary,
          variables: { id: apiaryId },
        },
      ],
    });
  };

  const handleStatusChange = (_, newStatuses) => {
    setBeehiveStatuses(newStatuses);
  };

  return (
    <CustomModal
      onModalClose={onModalClose}
      onModalSave={onModalSave}
      open={isStatusModalOpen}
      modalHeading="Dodaj status ula"
    >
      <ToggleButtonGroup value={beehiveStatuses} onChange={handleStatusChange}>
        <ToggleButton value="hungry">Głodny</ToggleButton>
        <ToggleButton value="layingWorker">Trutówka</ToggleButton>
        <ToggleButton disabled={beehiveStatuses.includes('weakQueen')} value="noQueen">Brak matki</ToggleButton>
        <ToggleButton disabled={beehiveStatuses.includes('noQueen')} value="weakQueen">Słaba matka</ToggleButton>
      </ToggleButtonGroup>
    </CustomModal>
  );
};

BeehiveStatusModal.propTypes = {
  beehive: beehiveType.isRequired,
  isStatusModalOpen: bool.isRequired,
  handleIsStatusModalOpen: func.isRequired,
  apiaryId: string.isRequired,
};

export default BeehiveStatusModal;
