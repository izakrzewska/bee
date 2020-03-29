import React, { useState, Fragment } from "react";
import { Card, CardContent, CardHeader, CardActions } from "@material-ui/core";
import BeehiveColors from "./BeehiveColors";
import classnames from "classnames";
import useBeehiveCardStyle from "./BeehiveCard.style";
import useCommonStyles from "../../style/common";
import BeehiveChangeColorsModal from "./BeehiveChangeColorsModal";
import { useMutation } from "@apollo/react-hooks";
import beehivesMutations from "../../mutations/beehive_mutations";
import fetchApiary from "../../queries/fetchApiary";
import Icon from "../common/Icon";

const BeehiveCard = ({ beehive, isActiveApiary, apiaryId }) => {
  const [isInEditView, setIsInEditView] = useState(false);
  const [isChangeColorModalOpen, setIsChangeColorModalOpen] = useState(false);
  const commonClasses = useCommonStyles();
  const classes = useBeehiveCardStyle();

  const { UPDATE_BEEHIVE } = beehivesMutations;
  const [updateBeehive] = useMutation(UPDATE_BEEHIVE);

  const handleIsChangeColorModalOpen = () => {
    setIsChangeColorModalOpen(!isChangeColorModalOpen);
  };

  const handleIsInEditView = () => {
    setIsInEditView(!isInEditView);
  };

  const onBeehiveDesactivate = () => {
    const beehiveUpdated = {
      id: beehive.id,
      colors: beehive.colors,
      active: !beehive.active,
      statuses: beehive.statuses,
      position: {
        row: beehive.position.row,
        number: beehive.position.number
      }
    };

    handleIsInEditView();
    updateBeehive({
      variables: {
        id: beehive.id,
        beehiveUpdated: beehiveUpdated
      },
      refetchQueries: [
        {
          query: fetchApiary,
          variables: { id: apiaryId }
        }
      ]
    });
  };

  const onBeehiveColorChange = () => {
    handleIsInEditView();
    handleIsChangeColorModalOpen();
  };

  return (
    <Card
      className={classnames(
        classes.beehiveCard,
        !beehive.active && commonClasses.cardInactive
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
        <BeehiveChangeColorsModal
          apiaryId={apiaryId}
          beehive={beehive}
          isChangeColorModalOpen={isChangeColorModalOpen}
          handleIsChangeColorModalOpen={handleIsChangeColorModalOpen}
        />
      </CardContent>
      <CardActions className={classes.beehiveCardActions}>
        {isInEditView && (
          <Fragment>
            <Icon
              type="palette"
              onClick={onBeehiveColorChange}
              disabled={!beehive.active}
            />
            <Icon type="block" onClick={onBeehiveDesactivate} />
          </Fragment>
        )}
        <Icon
          type="settings"
          onClick={handleIsInEditView}
          disabled={!isActiveApiary}
        />
      </CardActions>
    </Card>
  );
};

export default BeehiveCard;
