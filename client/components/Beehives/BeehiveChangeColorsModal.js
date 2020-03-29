import React, { useState } from "react";
import BeehiveColors from "./BeehiveColors";
import { useMutation } from "@apollo/react-hooks";
import beehiveMutations from "../../mutations/beehive_mutations";
import fetchApiary from "../../queries/fetchApiary";
import CustomModal from "../common/CustomModal";

const BeehiveChangeColorsModal = ({
  beehive,
  isChangeColorModalOpen,
  handleIsChangeColorModalOpen,
  apiaryId
}) => {
  const [selectedColors, setSelectedColors] = useState(beehive.colors);
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
    <CustomModal
      onModalClose={onModalClose}
      onModalSave={onModalSave}
      open={isChangeColorModalOpen}
      modalHeading="Wybierz nowy kolor ula"
    >
      <BeehiveColors
        id="beehiveColors"
        onChangeHandler={setBeehiveColorHandler}
        selectedColors={selectedColors}
        selectable
        className="beehiveColorsModal"
      />
    </CustomModal>
  );
};

export default BeehiveChangeColorsModal;
