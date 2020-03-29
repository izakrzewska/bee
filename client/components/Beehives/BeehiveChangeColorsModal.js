import React, { useState } from "react";
import BeehiveColors from "./BeehiveColors";
import { Modal, Typography, Button } from "@material-ui/core";
import useCommonStyle from "../../style/common";
import classnames from "classnames";
import { useMutation } from "@apollo/react-hooks";
import beehiveMutations from "../../mutations/beehive_mutations";
import fetchApiary from "../../queries/fetchApiary";

const BeehiveChangeColorsModal = ({
  beehive,
  isChangeColorModalOpen,
  handleIsChangeColorModalOpen,
  apiaryId
}) => {
  const [selectedColors, setSelectedColors] = useState(beehive.colors);
  const commonClasses = useCommonStyle();
  const { UPDATE_BEEHIVE } = beehiveMutations;
  const [updateBeehive] = useMutation(UPDATE_BEEHIVE);

  const setBeehiveColorHandler = chosenColor => {
    if (selectedColors.includes(chosenColor)) {
      setSelectedColors(() => {
        return selectedColors.filter(color => color !== chosenColor);
      });
    } else {
      setSelectedColors(() => {
        return [...selectedColors, chosenColor];
      });
    }
  };

  const onModalClose = () => {
    handleIsChangeColorModalOpen();
    setSelectedColors(beehive.colors);
  };

  const beehiveUpdated = {
    id: beehive.id,
    colors: selectedColors,
    active: beehive.active,
    statuses: beehive.statuses,
    position: {
      row: beehive.position.row,
      number: beehive.position.number
    }
  };

  const onModalSave = () => {
    updateBeehive({
      variables: { id: beehive.id, beehiveUpdated: beehiveUpdated },
      refetchQueries: [
        {
          query: fetchApiary,
          variables: { id: apiaryId }
        }
      ]
    });
    handleIsChangeColorModalOpen();
  };

  return (
    <Modal
      aria-labelledby="beehive-change-colors-modal"
      aria-describedby="beehive-change-colors-modal"
      open={isChangeColorModalOpen}
      onClose={onModalClose}
    >
      <div className={commonClasses.modal}>
        <Typography
          component="h2"
          className={classnames(
            commonClasses.subheading,
            commonClasses.modalHeading
          )}
        >{`Wybierz nowe kolory ula`}</Typography>
        <div className={commonClasses.modalContent}>
          <BeehiveColors
            id="beehiveColors"
            onChangeHandler={setBeehiveColorHandler}
            selectedColors={selectedColors}
            selectable
            className="beehiveColorsModal"
          />
        </div>
        <div className={commonClasses.modalButtonSection}>
          <Button
            className={commonClasses.secondaryButton}
            onClick={onModalClose}
          >
            Anuluj
          </Button>
          <Button className={commonClasses.primaryButton} onClick={onModalSave}>
            Zapisz
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BeehiveChangeColorsModal;
