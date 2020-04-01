import React, { useState } from 'react';
import { Card, CardActions, CardHeader } from '@material-ui/core';
import { Link } from 'react-router';
import classnames from 'classnames';
import { func } from 'prop-types';
import useApiaryCardStyle from './ApiaryCard.style';
import useCommonStyle from '../../style/common';
import Icon from '../common/Icon';
import { apiaryType } from '../../types/types';


const ApiaryCard = ({ apiary, onApiaryDelete, apiaryDesactivateHandler }) => {
  const classes = useApiaryCardStyle();
  const commonClasses = useCommonStyle();

  const [isInEditView, setIsInEditView] = useState(false);

  const handleIsInEditView = () => {
    setIsInEditView(!isInEditView);
  };

  const onApiaryDesactivate = () => {
    handleIsInEditView();
    apiaryDesactivateHandler(apiary.id);
  };

  const apiaryCardSubheader = apiary.active
    ? `Liczba uli: ${apiary.beehives.length}`
    : 'NIEAKTYWNA';

  return (
    <Card
      id={apiary.id}
      className={classnames(
        classes.apiaryCard,
        !apiary.active && commonClasses.cardInactive,
      )}
    >
      <Link className={commonClasses.link} to={`/apiaries/${apiary.id}`}>
        <CardHeader title={apiary.name} subheader={apiaryCardSubheader} />
      </Link>
      <CardActions className={classes.apiaryCardActions}>
        {isInEditView && (
          [
            <Icon type="block" onClick={onApiaryDesactivate} />,
            <Icon type="delete" onClick={() => onApiaryDelete(apiary.id)} />,
          ]
        )}
        <Icon type="settings" onClick={handleIsInEditView} />
      </CardActions>
    </Card>
  );
};

ApiaryCard.propTypes = {
  apiary: apiaryType.isRequired,
  onApiaryDelete: func.isRequired,
  apiaryDesactivateHandler: func.isRequired,
};

export default ApiaryCard;
