import React, { useState, Fragment } from "react";
import { Card, CardContent, CardHeader, CardActions } from "@material-ui/core";
import BeehiveColors from "./BeehiveColors";
import classnames from "classnames";
import useBeehiveCardStyle from "./BeehiveCard.style";
import useCommonStyles from "../../style/common";
import BlockIcon from "@material-ui/icons/Block";
import SettingsIcon from "@material-ui/icons/Settings";

const BeehiveCard = ({ beehive, beehiveDesactivateHandler }) => {
  const [isInEditView, setIsInEditView] = useState(false);
  const commonClasses = useCommonStyles();
  const classes = useBeehiveCardStyle();

  const handleIsInEditView = () => {
    setIsInEditView(!isInEditView);
  };

  const onBeehiveDesactivate = () => {
    handleIsInEditView();
    beehiveDesactivateHandler(beehive.id);
  };

  return (
    <Card
      className={classnames(
        classes.beehiveCard,
        !beehive.active && classes.cardInactive
      )}
    >
      <CardHeader
        title={`rząd ${beehive.position.row}, miejsce ${beehive.position.number}`}
        subheader={!beehive.active && "NIEAKTYWNY"}
      />
      <CardContent>
        <BeehiveColors
          className="beehiveColorsCard"
          selectedColors={beehive.colors}
          selectable={false}
        />
      </CardContent>
      <CardActions className={classes.beehiveCardActions}>
        {isInEditView ? (
          <Fragment>
            <BlockIcon
              className={commonClasses.icon}
              onClick={onBeehiveDesactivate}
            />
            <SettingsIcon
              className={commonClasses.icon}
              onClick={handleIsInEditView}
            />
          </Fragment>
        ) : (
          <SettingsIcon onClick={handleIsInEditView} />
        )}
      </CardActions>
    </Card>
  );
};

export default BeehiveCard;
