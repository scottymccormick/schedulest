import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'

class BookingDialog extends Component {
  constructor() {
    super()

    this.state = {
      owner: 'John User',
      title: '',
      location: ''
    }
  }
  handleChange = e => {
    console.log(e)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    console.log(this.state)
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>Create Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reserve a room, please fill out the fields below
          </DialogContentText>
          <form action="">
            <FormControl fullWidth>
              <TextField margin="dense" label="Name" name="owner" type="text"
                value={this.state.owner} onChange={this.handleChange} required  />
            </FormControl>
            <FormControl fullWidth>
              <TextField margin="dense" label="Title (optional)" name="title"
                type="text" onChange={this.handleChange} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={this.state.location}
                onChange={this.handleChange}
                inputProps={{
                  name: 'location'
                }}
                >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Studio 1</MenuItem>
                <MenuItem value={2}>Studio 2</MenuItem>
                <MenuItem value={3}>Studio 3</MenuItem>
              </Select>
            </FormControl>
            
          </form>
        </DialogContent>
      </Dialog>
    )
  }
}

export default BookingDialog;