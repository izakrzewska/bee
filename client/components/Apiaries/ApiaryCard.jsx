import React from 'react';
import { Card, CardActions, CardHeader } from '@material-ui/core';
import { Link } from 'react-router';
import classnames from 'classnames';
import { func } from 'prop-types';
import useApiaryCardStyle from './ApiaryCard.style';
import useCommonStyle from '../../style/common';
import { apiaryType } from '../../types/types';
import CustomSpeedDial from '../common/CustomSpeedDial';

const ApiaryCard = ({
  apiary, onApiaryDelete, apiaryDesactivateHandler,
}) => {
  const classes = useApiaryCardStyle();
  const commonClasses = useCommonStyle();

  const onApiaryDesactivate = () => {
    apiaryDesactivateHandler(apiary);
  };

  const onApiaryDeleteClick = () => {
    onApiaryDelete(apiary.id);
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
        <CustomSpeedDial
          ariaLabel="apiaryActions"
          actions={[
            { name: 'block', onClick: onApiaryDesactivate, tooltip: 'Aktywuj/dezaktywuj pasiekę' },
            { name: 'delete', onClick: onApiaryDeleteClick, tooltip: 'Usuń pasiekę' },
          ]}
        />
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
