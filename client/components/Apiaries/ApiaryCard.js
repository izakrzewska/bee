import React, { useState, Fragment } from "react";
import { Card, CardActions, CardHeader } from "@material-ui/core";
import useApiaryCardStyle from "./ApiaryCard.style";
import useCommonStyle from "../../style/common";
import { Link } from "react-router";
import classnames from "classnames";
import Icon from "../../components/common/Icon";

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
        {isInEditView && (
          <Fragment>
            <Icon type="block" onClick={onApiaryDesactivate} />
            <Icon type="delete" onClick={() => onApiaryDelete(apiary.id)} />
          </Fragment>
        )}
        <Icon type="settings" onClick={handleIsInEditView} />
      </CardActions>
    </Card>
  );
};

export default ApiaryCard;
