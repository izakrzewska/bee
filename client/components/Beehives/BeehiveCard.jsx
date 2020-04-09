import React, { useState } from 'react';
import {
  Card, Chip, CardContent, CardHeader, CardActions,
} from '@material-ui/core';
import classnames from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import { string } from 'prop-types';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import useBeehiveCardStyle from './BeehiveCard.style';
import useCommonStyles from '../../style/common';
import BeehiveChangeColorsModal from './BeehiveChangeColorsModal';
import beehivesMutations from '../../mutations/beehive_mutations';
import fetchApiary from '../../queries/fetchApiary';
import { beehiveType } from '../../types/types';
import BeehiveMoveModal from './BeehiveMoveModal';
import BeehiveStatusModal from './BeehiveStatusModal';
import availableColors from '../../colors';
import availableStatuses from '../../statuses';
import CustomSpeedDial from '../common/CustomSpeedDial';

const BeehiveCard = ({
  beehive, apiaryId,
}) => {
  const [isChangeColorModalOpen, setIsChangeColorModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const commonClasses = useCommonStyles();
  const classes = useBeehiveCardStyle();

  const { UPDATE_BEEHIVE } = beehivesMutations;
  const [updateBeehive] = useMutation(UPDATE_BEEHIVE);

  const handleIsModalOpen = (useStateFuncion, useStateArgument) => {
    useStateFuncion(!useStateArgument);
  };

  const onBeehiveDesactivate = () => {
    const beehiveUpdated = {
      id: beehive.id,
      colors: [],
      active: !beehive.active,
      statuses: [],
      position: {
        row: beehive.position.row,
        number: beehive.position.number,
      },
    };

    updateBeehive({
      variables: {
        id: beehive.id,
        beehiveUpdated,
      },
      refetchQueries: [
        {
          query: fetchApiary,
          variables: { id: apiaryId },
        },
      ],
    });
  };

  const handleStatusClick = () => {
    setIsStatusModalOpen(!isStatusModalOpen);
  };

  const handleMoveClick = () => {
    setIsMoveModalOpen(!isMoveModalOpen);
  };

  const handleColorClick = () => {
    setIsChangeColorModalOpen(!isChangeColorModalOpen);
  };

  return (
    <Card
      className={classnames(
        classes.beehiveCard,
        !beehive.active && commonClasses.cardInactive,
      )}
    >
      <CardHeader
        title={`rząd ${beehive.position.row}, miejsce ${beehive.position.number}`}
        subheader={!beehive.active && 'WOLNE MIEJSCE'}
      />
      <CardContent>
        <div className={classes.statusChipContainer}>
          {beehive.statuses.map((status) => (
            <Chip
              key={status}
              color="secondary"
              className={classes.statusChip}
              onClick={() => handleIsModalOpen(setIsStatusModalOpen, isStatusModalOpen)}
              label={availableStatuses
                .filter((availableStatus) => availableStatus.id === status)
                .map((availableStatus) => availableStatus.name)}
            />
          ))}
        </div>
        <div className={classes.beehiveColorsContainer}>
          {beehive.colors.map((color) => (
            <FiberManualRecordIcon
              key={color}
              style={{
                color: availableColors
                  .filter((availableColor) => availableColor.id === color)
                  .map((availableColor) => availableColor.hex),
                fontSize: 30,
              }}
            />
          ))}
        </div>
        <BeehiveChangeColorsModal
          apiaryId={apiaryId}
          beehive={beehive}
          isChangeColorModalOpen={isChangeColorModalOpen}
          handleIsChangeColorModalOpen={handleColorClick}
        />
        <BeehiveMoveModal
          apiaryId={apiaryId}
          beehive={beehive}
          isMoveModalOpen={isMoveModalOpen}
          handleIsMoveModalOpen={handleMoveClick}
        />
        <BeehiveStatusModal
          apiaryId={apiaryId}
          beehive={beehive}
          isStatusModalOpen={isStatusModalOpen}
          handleIsStatusModalOpen={handleStatusClick}
        />
      </CardContent>
      <CardActions className={classes.beehiveCardActions}>
        <CustomSpeedDial
          ariaLabel="beehiveActions"
          actions={[
            { name: 'problem', onClick: handleStatusClick, tooltip: 'Edytuj statusy ula' },
            { name: 'move', onClick: handleMoveClick, tooltip: 'Przenieś ul' },
            { name: 'palette', onClick: handleColorClick, tooltip: 'Edytuj kolory ula' },
            { name: 'block', onClick: onBeehiveDesactivate, tooltip: 'Aktywuj/dezaktywuj ul' },
          ]}
        />
      </CardActions>
    </Card>
  );
};

BeehiveCard.propTypes = {
  beehive: beehiveType.isRequired,
  apiaryId: string.isRequired,
};

export default BeehiveCard;
