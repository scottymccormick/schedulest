import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

class OrganizationDialog extends Component {
  render() {
    console.log(this.state)
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>
          Organization 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change the rules for this organization
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }
}

export default OrganizationDialog