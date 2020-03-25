import React, { useState, Fragment } from "react";
import { Card, CardActions, CardHeader } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import useApiaryCardStyle from "./ApiaryCard.style";
import useCommonStyle from "../../style/common";
import { Link } from "react-router";

const ApiaryCard = ({ apiary, onApiaryDelete }) => {
  const classes = useApiaryCardStyle();
  const commonClasses = useCommonStyle();

  const [isInEditView, setIsInEditView] = useState(false);

  const handleIsInEditView = () => {
    setIsInEditView(!isInEditView);
  };

  return (
    <Card id={apiary.id} className={classes.apiaryCard}>
      <Link className={commonClasses.link} to={`/apiaries/${apiary.id}`}>
        <CardHeader
          title={apiary.name}
          subheader={`Liczba uli: ${apiary.beehives.length}`}
        />
      </Link>
      <CardActions className={classes.apiaryCardActions}>
        {isInEditView ? (
          <Fragment>
            <DeleteIcon
              className={commonClasses.icon}
              onClick={() => onApiaryDelete(apiary.id)}
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

export default ApiaryCard;
