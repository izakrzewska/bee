import React from "react";
import PropTypes from "prop-types";
import useBeehivesListStyles from "./BeehivesList.style";
import BeehiveCard from "./BeehiveCard";

const BeehivesList = ({ beehives, apiaryId, isActiveApiary }) => {
  const classes = useBeehivesListStyles();

  const renderBeehives = beehives => {
    return beehives.map(beehive => {
      return (
        <BeehiveCard
          apiaryId={apiaryId}
          isActiveApiary={isActiveApiary}
          key={beehive.id}
          beehive={beehive}
        />
      );
    });
  };

  return (
    <div className={classes.beehivesListContainer}>
      {renderBeehives(beehives)}
    </div>
  );
};

BeehivesList.propTypes = {
  beehives: PropTypes.array.isRequired
};

export default BeehivesList;
