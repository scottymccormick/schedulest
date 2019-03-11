import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, FormControl, Select, MenuItem, InputLabel, DialogActions, Button, InputAdornment, Input } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import {DatePicker, MuiPickersUtilsProvider, TimePicker} from 'material-ui-pickers'

const styles = theme => ({
  inputMargin: {
    margin: `${theme.spacing.unit} 0`
  }
})

class BookingDialog extends Component {
  constructor() {
    super()

    this.state = {
      owner: '',
      title: '',
      location: '',
      created_by: '',
      date: moment().toDate(),
      startTime: moment().minutes(0).seconds(0).toDate(),
      endTime: moment().add(1, 'h').minutes(0).seconds(0).toDate(),
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
  handleSubmit = async () => {
    try {
      const token = localStorage.getItem('jwtToken')
      const bookingResponse = await fetch('http://localhost:9000/api/v1/bookings', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(this.state)
      })

      if (!bookingResponse.ok) {
        throw Error(bookingResponse.statusText)
      }

      const parsedResponse = await bookingResponse.json()

      console.log(parsedResponse)

    } catch (error) {
      console.log(error)
    }
    // console.log(this.state)
    // console.log('form submitted')
  }
  loadUser = async () => {
    await this.setState({
      owner: this.props.loggedInfo.user._id,
      createdBy: this.props.loggedInfo.user._id
    })
  }
  render() {
    console.log(this.state)
    // const { classes } = this.props

    if (!this.state.createdBy) {
      this.loadUser()
      console.log('load user here')
    }

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
                {this.props.locs.map((loc) => {
                  return (
                    <MenuItem key={loc._id} value={loc._id}>{loc.name}</MenuItem>
                  )
                })}
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
              <InputLabel>Amount</InputLabel>
              <Input
                disabled
                value={this.state.price}
                name="price"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
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