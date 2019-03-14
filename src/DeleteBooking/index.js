import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle} from '@material-ui/core';

const AlertDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this booking?"}</DialogTitle>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.confirmDelete} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>

  );
}

export default AlertDialog;