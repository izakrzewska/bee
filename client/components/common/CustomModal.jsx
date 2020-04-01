import React from 'react';
import { Modal, Typography, Button } from '@material-ui/core';
import classnames from 'classnames';
import {
  func, bool, oneOfType, arrayOf, node, string,
} from 'prop-types';
import useCommonStyle from '../../style/common';
import useCustomModalStyle from './CustomModal.style';


const CustomModal = ({
  onModalClose,
  onModalSave,
  open,
  modalHeading,
  children,
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

CustomModal.defaultProps = {
  modalHeading: '',
};

CustomModal.propTypes = {
  onModalClose: func.isRequired,
  onModalSave: func.isRequired,
  open: bool.isRequired,
  modalHeading: string,
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};

export default CustomModal;
