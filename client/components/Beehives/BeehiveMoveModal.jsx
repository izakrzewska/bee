import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { bool, string, func } from 'prop-types';
import { Button } from '@material-ui/core';
import { hashHistory } from 'react-router';
import classnames from 'classnames';
import beehiveMutations from '../../mutations/beehive_mutations';
import fetchApiary from '../../queries/fetchApiary';
import fetchApiaries from '../../queries/fetchApiaries';
import CustomModal from '../common/CustomModal';
import { beehiveType } from '../../types/types';
import Loading from '../common/Loading';
import useCommonStyles from '../../style/common';
import getPosition from './utils';
import useBeehiveMoveModalStyles from './BeehiveMoveModal.style';

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
  const commonClasses = useCommonStyles();
  const classes = useBeehiveMoveModalStyles();
  const [selectedApiary, setSelectedApiary] = useState();
  const [selectedPlace, setSelectedPlace] = useState();
  const [isAddingNewBeehive, setIsAddingNewBeehive] = useState(false);

  const onModalClose = () => {
    handleIsMoveModalOpen();
    setSelectedApiary();
    setSelectedPlace();
    setIsAddingNewBeehive(false);
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

    if (isAddingNewBeehive) {
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
    setIsAddingNewBeehive(false);
    handleIsMoveModalOpen();
  };

  const getAvaiableApiaries = () => {
    const { apiaries } = data;
    return apiaries
      .filter((apiary) => apiary.active && apiary.id !== apiaryId)
      .map((apiary) => {
        const isSelectedApiary = selectedApiary === apiary;
        return (
          <Button
            key={apiary.id}
            className={
              isSelectedApiary ? commonClasses.selectedButton : commonClasses.tertiaryButton
            }
            onClick={() => {
              setSelectedApiary(apiary);
              setSelectedPlace();
              setIsAddingNewBeehive(false);
            }}
          >
            {apiary.name}
          </Button>
        );
      });
  };

  const getAvailablePlaces = () => {
    const { beehives } = selectedApiary;
    return beehives.filter((beehivePlace) => !beehivePlace.active).map((beehivePlace) => {
      const isSelectedPlace = beehivePlace === selectedPlace;
      return (
        <Button
          key={beehivePlace.id}
          className={isSelectedPlace ? commonClasses.selectedButton : commonClasses.tertiaryButton}
          onClick={() => {
            setSelectedPlace(beehivePlace);
            setIsAddingNewBeehive(false);
          }}
        >
          {`Rząd ${beehivePlace.position.row} m.${beehivePlace.position.number}`}
        </Button>
      );
    });
  };

  const onAddingNewBeehive = () => {
    setSelectedPlace();
    setIsAddingNewBeehive(true);
  };

  const selectedApiaryString = selectedApiary ? `${selectedApiary.name},` : '';
  const getSelectedPlaceString = () => {
    if (isAddingNewBeehive) {
      return 'dostaw na koniec';
    } if (selectedPlace) {
      return `rząd ${selectedPlace.position.row} m.${selectedPlace.position.number}`;
    }
    return '';
  };
  const selectedPlaceString = getSelectedPlaceString();
  const modalHeading = `Nowa lokalizacja ula: ${selectedApiaryString} ${selectedPlaceString}`;

  return (
    <CustomModal
      onModalClose={onModalClose}
      onModalSave={onModalSave}
      open={isMoveModalOpen}
      modalHeading={modalHeading}
    >
      { loading ? <Loading /> : (
        <div className={classes.buttonContainer}>
          <div>
            {getAvaiableApiaries()}
          </div>
          <div>
            {!!selectedApiary && getAvailablePlaces() }
            {!!selectedApiary
            && (
            <Button
              className={classnames(commonClasses.tertiaryButton,
                isAddingNewBeehive && commonClasses.selectedButton)}
              onClick={onAddingNewBeehive}
            >
              Dostaw na koniec
            </Button>
            ) }
          </div>
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
