import React, { Component } from 'react';
import { Dialog } from '@material-ui/core'

class BookingDialog extends Component {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>Booking Form</Dialog>
    )
  }
}

export default BookingDialog;