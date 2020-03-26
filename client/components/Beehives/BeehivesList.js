import React from "react";
import PropTypes from "prop-types";
import useBeehivesListStyles from "./BeehivesList.style";
import BeehiveCard from "./BeehiveCard";
import fetchApiary from "../../queries/fetchApiary";
import beehiveMutations from "../../mutations/beehive_mutations";
import { useMutation } from "@apollo/react-hooks";

const BeehivesList = ({ beehives, apiaryId, isActiveApiary }) => {
  const classes = useBeehivesListStyles();
  const { DESACTIVATE_BEEHIVE } = beehiveMutations;
  const [desactivateBeehive] = useMutation(DESACTIVATE_BEEHIVE);

  const beehiveDesactivateHandler = id => {
    desactivateBeehive({
      variables: { id: id },
      refetchQueries: [
        {
          query: fetchApiary,
          variables: { id: apiaryId }
        }
      ]
    });
  };

  const renderBeehives = beehives => {
    return beehives.map(beehive => {
      return (
        <BeehiveCard
          isActiveApiary={isActiveApiary}
          key={beehive.id}
          beehive={beehive}
          beehiveDesactivateHandler={beehiveDesactivateHandler}
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
