import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@material-ui/core";
import useBeehivesListStyles from "./BeehivesList.style";
import BeehiveColors from "./BeehiveColors";

const BeehivesList = ({ beehives }) => {
  const classes = useBeehivesListStyles();

  const renderBeehives = beehives => {
    return beehives.map(({ colors, active, position, id }) => {
      return (
        <Card key={id} className={classes.beehiveCard}>
          <CardContent>
            <BeehiveColors
              className="beehiveCardColors"
              selectedColors={colors}
              selectable={false}
            />
            {active ? "Aktywny" : "Nieaktywny"}
            <div>
              {`Rząd: ${position.row} Miejsce w rzędzie: ${position.number}`}
            </div>
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
