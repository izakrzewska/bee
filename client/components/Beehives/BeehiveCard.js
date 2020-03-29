import React, { useState, Fragment } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  IconButton
} from "@material-ui/core";
import BeehiveColors from "./BeehiveColors";
import classnames from "classnames";
import useBeehiveCardStyle from "./BeehiveCard.style";
import useCommonStyles from "../../style/common";
import BlockIcon from "@material-ui/icons/Block";
import SettingsIcon from "@material-ui/icons/Settings";
import PaletteIcon from "@material-ui/icons/Palette";
import BeehiveChangeColorsModal from "./BeehiveChangeColorsModal";

const BeehiveCard = ({
  beehive,
  beehiveDesactivateHandler,
  isActiveApiary,
  apiaryId
}) => {
  const [isInEditView, setIsInEditView] = useState(false);
  const [isChangeColorModalOpen, setIsChangeColorModalOpen] = useState(false);
  const commonClasses = useCommonStyles();
  const classes = useBeehiveCardStyle();

  const handleIsChangeColorModalOpen = () => {
    setIsChangeColorModalOpen(!isChangeColorModalOpen);
  };

  const handleIsInEditView = () => {
    setIsInEditView(!isInEditView);
  };

  const onBeehiveDesactivate = () => {
    handleIsInEditView();
    beehiveDesactivateHandler(beehive.id);
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
        {isInEditView ? (
          <Fragment>
            <IconButton onClick={onBeehiveColorChange} color="primary">
              <PaletteIcon className={commonClasses.icon} />
            </IconButton>
            <IconButton onClick={onBeehiveDesactivate} color="primary">
              <BlockIcon className={commonClasses.icon} />
            </IconButton>
            <IconButton onClick={handleIsInEditView} color="primary">
              <SettingsIcon className={commonClasses.icon} />
            </IconButton>
          </Fragment>
        ) : (
          <IconButton
            onClick={handleIsInEditView}
            color="primary"
            disabled={!isActiveApiary}
          >
            <SettingsIcon className={commonClasses.icon} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default BeehiveCard;
