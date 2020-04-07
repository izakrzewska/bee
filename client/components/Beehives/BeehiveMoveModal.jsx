import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { bool, string, func } from 'prop-types';
import { hashHistory } from 'react-router';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import beehiveMutations from '../../mutations/beehive_mutations';
import fetchApiary from '../../queries/fetchApiary';
import fetchApiaries from '../../queries/fetchApiaries';
import CustomModal from '../common/CustomModal';
import { beehiveType } from '../../types/types';
import Loading from '../common/Loading';
import getPosition from './utils';
import useBeehiveMoveModalStyles from './BeehiveMoveModal.style';
import useCommonStyles from '../../style/common';

const BeehiveMoveModal = ({
  handleIsMoveModalOpen,
  isMoveModalOpen,
  beehive,
  apiaryId,
}) => {
  const { UPDATE_BEEHIVE, ADD_BEEHIVE } = beehiveMutations;
  const [updateBeehive] = useMutation(UPDATE_BEEHIVE);
  const [addBeehive] = useMutation(ADD_BEEHIVE);
  const { data, loading } = useQuery(fetchApiaries);
  const classes = useBeehiveMoveModalStyles();
  const [selectedApiary, setSelectedApiary] = useState();
  const [selectedPlace, setSelectedPlace] = useState();
  const commonClasses = useCommonStyles();

  const onModalClose = () => {
    handleIsMoveModalOpen();
    setSelectedApiary();
    setSelectedPlace();
  };

  const updateBeehiveMoves = (beehiveId, beehiveUpdated, apiaryToUpdateId) => {
    updateBeehive({
      variables: { id: beehiveId, beehiveUpdated },
      refetchQueries: [
        {
          query: fetchApiary,
          variables: { id: apiaryToUpdateId },
        },
      ],
    });
  };

  const onModalSave = () => {
    const beehiveDesactivated = {
      id: beehive.id,
      colors: [],
      active: !beehive.active,
      statuses: [],
      position: {
        row: beehive.position.row,
        number: beehive.position.number,
      },
    };

    updateBeehiveMoves(beehive.id, beehiveDesactivated, apiaryId);

    if (selectedPlace === 'placeAtTheEnd') {
      const beehivesNumber = selectedApiary.beehives.length;
      addBeehive({
        variables: {
          apiaryId: selectedApiary.id,
          colors: beehive.colors,
          active: beehive.active,
          statuses: beehive.statuses,
          position: getPosition(beehivesNumber, selectedApiary.numberOfBeehivesInRow),
        },
        refetchQueries: [
          {
            query: fetchApiary,
            variables: { id: selectedApiary.id },
          },
        ],
      });
    } else {
      const beehiveValuesToMove = {
        id: selectedPlace.id,
        colors: beehive.colors,
        active: beehive.active,
        statuses: beehive.statuses,
        position: {
          row: selectedPlace.position.row,
          number: selectedPlace.position.number,
        },
      };
      updateBeehiveMoves(selectedPlace.id, beehiveValuesToMove, selectedApiary.id);
    }

    hashHistory.push(`/apiaries/${selectedApiary.id}`);
    handleIsMoveModalOpen();
  };

  const getAvaiableApiaries = () => {
    const { apiaries } = data;
    return apiaries
      .filter((apiary) => apiary.active && apiary.id !== apiaryId)
      .map((apiary) => (
        <ToggleButton
          classes={{
            root: commonClasses.toggleButton,
          }}
          key={apiary.id}
          value={apiary}
        >
          {apiary.name}
        </ToggleButton>
      ));
  };

  const getAvailablePlaces = () => {
    const { beehives } = selectedApiary;
    return beehives.filter((beehivePlace) => !beehivePlace.active).map((beehivePlace) => (
      <ToggleButton
        classes={{
          root: commonClasses.toggleButton,
        }}
        key={beehivePlace.id}
        value={beehivePlace}
      >
        {`Rząd ${beehivePlace.position.row} m.${beehivePlace.position.number}`}
      </ToggleButton>
    ));
  };

  const selectedApiaryString = selectedApiary ? `${selectedApiary.name},` : '';
  const getSelectedPlaceString = () => {
    if (selectedPlace === 'placeAtTheEnd') {
      return 'dostaw na koniec';
    } if (selectedPlace) {
      return `rząd ${selectedPlace.position.row} m.${selectedPlace.position.number}`;
    }
    return '';
  };
  const selectedPlaceString = getSelectedPlaceString();
  const modalHeading = `Nowa lokalizacja ula: ${selectedApiaryString} ${selectedPlaceString}`;

  const onApiarySelected = (_, apiary) => {
    setSelectedPlace();
    setSelectedApiary(apiary);
  };

  const onPlaceSelected = (_, place) => {
    setSelectedPlace(place);
  };

  return (
    <CustomModal
      onModalClose={onModalClose}
      onModalSave={onModalSave}
      open={isMoveModalOpen}
      modalHeading={modalHeading}
    >
      { loading ? <Loading /> : (
        <div className={classes.buttonContainer}>
          <ToggleButtonGroup
            value={selectedApiary}
            exclusive
            onChange={onApiarySelected}
          >
            {getAvaiableApiaries()}
          </ToggleButtonGroup>
          <ToggleButtonGroup value={selectedPlace} exclusive onChange={onPlaceSelected}>
            {!!selectedApiary && getAvailablePlaces() }
            {!!selectedApiary
            && (
            <ToggleButton
              classes={{
                root: commonClasses.toggleButton,
              }}
              key="placeAtTheEnd"
              value="placeAtTheEnd"
            >
              Dostaw na koniec
            </ToggleButton>
            ) }
          </ToggleButtonGroup>
        </div>
      )}
    </CustomModal>
  );
};

BeehiveMoveModal.propTypes = {
  isMoveModalOpen: bool.isRequired,
  handleIsMoveModalOpen: func.isRequired,
  beehive: beehiveType.isRequired,
  apiaryId: string.isRequired,
};

export default BeehiveMoveModal;
