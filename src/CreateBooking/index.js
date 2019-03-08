import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, FormControl, Select, MenuItem, InputLabel, DialogActions, Button, InputAdornment } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import {DatePicker, MuiPickersUtilsProvider, TimePicker} from 'material-ui-pickers'

const styles = theme => ({
  input: {
    marginTop: theme.spacing.unit
  }
})

class BookingDialog extends Component {
  constructor() {
    super()

    this.state = {
      owner: 'John User',
      title: '',
      location: '',
      date: new Date(),
      startTime: moment().hours(9).minutes(0).seconds(0),
      endTime: moment().hours(10).minutes(0).seconds(0),
      price: 20.00
    }

  }
  handleChange = e => {
    console.log(e)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleDateChange = (date) => {
    this.setState({date})
  }
  handleTimeChange = async (label, time) => {
    await this.setState({[label]: time})

    if (this.state.startTime.isSameOrAfter(this.state.endTime)) {
      console.log('invalid')
    }
  }
  handleSubmit = () => {
    console.log('form submitted')
  }
  render() {
    console.log(this.state)
    const { classes } = this.props
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
              <InputLabel required>Location</InputLabel>
              <Select
                margin="dense"
                value={this.state.location}
                onChange={this.handleChange}
                inputProps={{
                  name: 'location',
                  required: true
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
            <FormControl fullWidth>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker margin="dense" required label="Date" name="date" value={this.state.date} onChange={this.handleDateChange} minDate={new Date()} 
                />
              </MuiPickersUtilsProvider>
            </FormControl>
            {/* Start Time */}
            <FormControl fullWidth>
              <MuiPickersUtilsProvider utils={MomentUtils}>
              <TimePicker margin="dense"
                label="Start Time"
                value={this.state.startTime}
                minutesStep={5}
                onChange={this.handleTimeChange.bind(null, 'startTime')}
              />
              </MuiPickersUtilsProvider>
            </FormControl>
            {/* End Time */}
            <FormControl fullWidth>
              <MuiPickersUtilsProvider utils={MomentUtils}>
              <TimePicker margin="dense"
                label="End Time"
                value={this.state.endTime}
                minutesStep={5}
                onChange={this.handleTimeChange.bind(null, 'endTime')}
              />
              </MuiPickersUtilsProvider>
            </FormControl>
            {/* Price */}
            <FormControl fullWidth>
              <TextField
                disabled
                margin="dense"
                label="Price"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.props.onClose} color="default">
            Cancel
          </Button>
          <Button variant="contained" onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(BookingDialog);