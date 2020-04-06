import React from 'react';
import {
  string, bool, arrayOf,
} from 'prop-types';
import useBeehivesListStyles from './BeehivesList.style';
import BeehiveCard from './BeehiveCard';
import { beehiveType } from '../../types/types';

const BeehivesList = ({
  beehives, apiaryId, isActiveApiary,
}) => {
  const classes = useBeehivesListStyles();

  const renderBeehives = () => beehives.map((beehive) => (
    <BeehiveCard
      apiaryId={apiaryId}
      isActiveApiary={isActiveApiary}
      key={beehive.id}
      beehive={beehive}
    />
  ));

  return (
    <div className={classes.beehivesListContainer}>
      {renderBeehives()}
    </div>
  );
};

BeehivesList.propTypes = {
  beehives: arrayOf(beehiveType).isRequired,
  apiaryId: string.isRequired,
  isActiveApiary: bool.isRequired,
};

export default BeehivesList;
