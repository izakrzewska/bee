import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardActions,
} from '@material-ui/core';
import classnames from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import { string, bool } from 'prop-types';
import BeehiveColors from './BeehiveColors';
import useBeehiveCardStyle from './BeehiveCard.style';
import useCommonStyles from '../../style/common';
import BeehiveChangeColorsModal from './BeehiveChangeColorsModal';
import beehivesMutations from '../../mutations/beehive_mutations';
import fetchApiary from '../../queries/fetchApiary';
import Icon from '../common/Icon';
import { beehiveType } from '../../types/types';
import BeehiveMoveModal from './BeehiveMoveModal';

const BeehiveCard = ({ beehive, isActiveApiary, apiaryId }) => {
  const [isInEditView, setIsInEditView] = useState(false);
  const [isChangeColorModalOpen, setIsChangeColorModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const commonClasses = useCommonStyles();
  const classes = useBeehiveCardStyle();

  const { UPDATE_BEEHIVE } = beehivesMutations;
  const [updateBeehive] = useMutation(UPDATE_BEEHIVE);

  const handleIsChangeColorModalOpen = () => {
    setIsChangeColorModalOpen(!isChangeColorModalOpen);
  };

  const handleIsMoveModalOpen = () => {
    setIsMoveModalOpen(!isMoveModalOpen);
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

  const onBeehiveColorChange = () => {
    handleIsInEditView();
    handleIsChangeColorModalOpen();
  };

  const onBeehiveMove = () => {
    handleIsInEditView();
    handleIsMoveModalOpen();
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
        <BeehiveColors
          className="beehiveColorsCard"
          selectedColors={beehive.colors}
          selectable={false}
        />
        <BeehiveChangeColorsModal
          apiaryId={apiaryId}
          beehive={beehive}
          isChangeColorModalOpen={isChangeColorModalOpen}
          handleIsChangeColorModalOpen={handleIsChangeColorModalOpen}
        />
        <BeehiveMoveModal
          apiaryId={apiaryId}
          beehive={beehive}
          isMoveModalOpen={isMoveModalOpen}
          handleIsMoveModalOpen={handleIsMoveModalOpen}
        />
      </CardContent>
      <CardActions className={classes.beehiveCardActions}>
        {isInEditView && (
          [
            <Icon
              key="palette"
              type="palette"
              onClick={onBeehiveColorChange}
              disabled={!beehive.active}
            />,
            <Icon key="block" type="block" onClick={onBeehiveDesactivate} />,
            <Icon key="move" type="move" onClick={onBeehiveMove} />,
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
