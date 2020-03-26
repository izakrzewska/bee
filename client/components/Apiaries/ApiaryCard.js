import React, { useState, Fragment } from "react";
import { Card, CardActions, CardHeader, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import BlockIcon from "@material-ui/icons/Block";
import useApiaryCardStyle from "./ApiaryCard.style";
import useCommonStyle from "../../style/common";
import { Link } from "react-router";
import classnames from "classnames";

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
    : "NIEAKTYWNA";

  return (
    <Card
      id={apiary.id}
      className={classnames(
        classes.apiaryCard,
        !apiary.active && commonClasses.cardInactive
      )}
    >
      <Link className={commonClasses.link} to={`/apiaries/${apiary.id}`}>
        <CardHeader title={apiary.name} subheader={apiaryCardSubheader} />
      </Link>
      <CardActions className={classes.apiaryCardActions}>
        {isInEditView ? (
          <Fragment>
            <IconButton onClick={onApiaryDesactivate} color="primary">
              <BlockIcon className={commonClasses.icon} />
            </IconButton>
            <IconButton
              onClick={() => onApiaryDelete(apiary.id)}
              color="primary"
            >
              <DeleteIcon className={commonClasses.icon} />
            </IconButton>
            <IconButton onClick={handleIsInEditView} color="primary">
              <SettingsIcon className={commonClasses.icon} />
            </IconButton>
          </Fragment>
        ) : (
          <IconButton onClick={handleIsInEditView} color="primary">
            <SettingsIcon className={commonClasses.icon} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default ApiaryCard;
