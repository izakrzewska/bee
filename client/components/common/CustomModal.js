import React from "react";
import { Modal, Typography, Button } from "@material-ui/core";
import useCommonStyle from "../../style/common";
import classnames from "classnames";
import useCustomModalStyle from "./CustomModal.style";

const CustomModal = ({
  onModalClose,
  onModalSave,
  open,
  modalHeading,
  children
}) => {
  const commonClasses = useCommonStyle();
  const classes = useCustomModalStyle();

  return (
    <Modal open={open} onClose={onModalClose}>
      <div className={classes.modal}>
        <Typography
          component="h2"
          className={classnames(commonClasses.subheading, classes.modalHeading)}
        >
          {modalHeading}
        </Typography>
        <div className={classes.modalContent}>{children}</div>
        <div className={classes.modalButtonSection}>
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

export default CustomModal;
