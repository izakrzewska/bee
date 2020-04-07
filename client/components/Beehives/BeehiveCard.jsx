import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardActions,
} from '@material-ui/core';
import classnames from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import { string, bool } from 'prop-types';
import useBeehiveCardStyle from './BeehiveCard.style';
import useCommonStyles from '../../style/common';
import BeehiveChangeColorsModal from './BeehiveChangeColorsModal';
import beehivesMutations from '../../mutations/beehive_mutations';
import fetchApiary from '../../queries/fetchApiary';
import Icon from '../common/Icon';
import { beehiveType } from '../../types/types';
import BeehiveMoveModal from './BeehiveMoveModal';
import BeehiveStatusModal from './BeehiveStatusModal';
import availableColors from '../../colors';

const BeehiveCard = ({
  beehive, isActiveApiary, apiaryId,
}) => {
  const [isInEditView, setIsInEditView] = useState(false);
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

  const handleIsInEditView = () => {
    setIsInEditView(!isInEditView);
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

    handleIsInEditView();
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

  const onIconWithModalClick = (useStateFuncion, useStateArgument) => {
    handleIsInEditView();
    handleIsModalOpen(useStateFuncion, useStateArgument);
  };

  const getBackgroundColor = (id) => availableColors
    .filter((availableColor) => availableColor.id === id)
    .map((availableColor) => availableColor.hex);

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
        <div>
          {beehive.statuses.map((status) => <p key={status}>{status}</p>)}
        </div>
        <div className={classes.beehiveColorsCard}>
          {beehive.colors.map((color) => (
            <div
              key={color}
              className={classes.colorBoxCard}
              style={{
                backgroundColor: getBackgroundColor(color),
              }}
            />
          ))}
        </div>
        <BeehiveChangeColorsModal
          apiaryId={apiaryId}
          beehive={beehive}
          isChangeColorModalOpen={isChangeColorModalOpen}
          handleIsChangeColorModalOpen={
            () => handleIsModalOpen(setIsChangeColorModalOpen, isChangeColorModalOpen)
          }
        />
        <BeehiveMoveModal
          apiaryId={apiaryId}
          beehive={beehive}
          isMoveModalOpen={isMoveModalOpen}
          handleIsMoveModalOpen={() => handleIsModalOpen(setIsMoveModalOpen, isMoveModalOpen)}
        />
        <BeehiveStatusModal
          apiaryId={apiaryId}
          beehive={beehive}
          isStatusModalOpen={isStatusModalOpen}
          handleIsStatusModalOpen={() => handleIsModalOpen(setIsStatusModalOpen, isStatusModalOpen)}
        />
      </CardContent>
      <CardActions className={classes.beehiveCardActions}>
        {isInEditView && (
          [
            <Icon
              key="palette"
              type="palette"
              onClick={
                () => onIconWithModalClick(setIsChangeColorModalOpen, isChangeColorModalOpen)
              }
              disabled={!beehive.active}
            />,
            <Icon key="block" type="block" onClick={onBeehiveDesactivate} />,
            <Icon key="move" type="move" onClick={() => onIconWithModalClick(setIsMoveModalOpen, isMoveModalOpen)} disabled={!beehive.active} />,
            <Icon key="problem" type="problem" onClick={() => onIconWithModalClick(setIsStatusModalOpen, isStatusModalOpen)} disabled={!beehive.active} />,
          ]
        )}
        <Icon
          type="settings"
          onClick={handleIsInEditView}
          disabled={!isActiveApiary}
        />
      </CardActions>
    </Card>
  );
};

BeehiveCard.propTypes = {
  beehive: beehiveType.isRequired,
  isActiveApiary: bool.isRequired,
  apiaryId: string.isRequired,
};

export default BeehiveCard;
