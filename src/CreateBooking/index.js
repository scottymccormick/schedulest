import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'

class BookingDialog extends Component {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>Create Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reserve a room, please fill out the fields below
          </DialogContentText>
          <form action="">
            <FormControl fullWidth>
              <TextField margin="dense" label="Name"name="owner" type="text"
                value="John User" required  />
            </FormControl>
            <FormControl fullWidth>
              <TextField margin="dense" label="Title (optional)" name="title"
                type="text"  />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                // value={this.state.age}
                // onChange={this.handleChange}
                // inputProps={{
                //   name: 'location'
                // }}
                >
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            
          </form>
        </DialogContent>
      </Dialog>
    )
  }
}

export default BookingDialog;