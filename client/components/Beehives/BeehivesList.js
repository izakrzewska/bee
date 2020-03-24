import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import useBeehivesListStyles from "./BeehivesList.style";
import BeehiveColors from "./BeehiveColors";
import classnames from "classnames";

const BeehivesList = ({ beehives }) => {
  const classes = useBeehivesListStyles();

  const renderBeehives = beehives => {
    return beehives.map(({ colors, active, position, id }) => {
      return (
        <Card
          key={id}
          className={classnames(
            classes.beehiveCard,
            !active && classes.cardInactive
          )}
        >
          <CardHeader
            title={`rząd ${position.row}, miejsce ${position.number}`}
            subheader={!active && "NIEAKTYWNY"}
          />
          <CardContent>
            <BeehiveColors selectedColors={colors} selectable={false} />
          </CardContent>
        </Card>
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
