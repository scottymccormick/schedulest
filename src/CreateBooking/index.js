import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, FormHelperText, Select, MenuItem, InputLabel, DialogActions, Button, InputAdornment, Input } from '@material-ui/core'
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
      price: 20.00,
      error: {
        startTime: '',
        endTime: '',
        date: false
      }
    }

  }
  handleChange = e => {
    console.log(e)
    this.setState({
      [e.target.name]: e.target.value
    })

    // validate
    // this.handleValidate()
  }
  handleDateChange = async (date) => {
    const start = moment(this.state.startTime)
    const end = moment(this.state.endTime)
    await this.setState({
      date,
      startTime: moment(date).hours(start.hours()).minutes(start.minutes()).toDate(),
      endTime: moment(date).hours(end.hours()).minutes(end.minutes()).toDate(),
    })
  }
  handleTimeChange = async (label, time) => {
    await this.setState({[label]: time.toDate()})
    // should validate to make it to time cannot be set to yesterday or tomorrow
    this.handleTimeValidate(label, time)
  }
  handleTimeValidate = (label, time) => {
    console.log('time validate handled')
    console.log(this.state)
    // validate date/time

    // validate startTime
    this.validateStartTime()
    
    // validate endTime
    this.validateEndTime()

    // validate times against one another
    this.validateTimesAgainstOther(label)
  }
  validateStartTime = async () => {
    const earliestTime = moment(this.state.date).hour(5).minutes(59).seconds(59)
    const latestTime = moment(this.state.date).hour(23).minutes(1).seconds(0)
    if (!moment(this.state.startTime).isBetween(earliestTime, latestTime)) {
      const error = {
        ...this.state.error,
        startTime: 'Choose a start time between 6:00 AM and 11:00 PM'
      }
      let newStartTime, newEndTime

      if (moment(this.state.startTime) > latestTime.toDate()) {
        newStartTime = moment(this.state.date).hour(23).minutes(0).toDate()
        newEndTime = moment(this.state.date).hour(23).minutes(30).toDate()
      } else {
        newStartTime = moment(this.state.date).hour(6).minutes(0).toDate()
        // newEndTime = moment(this.state.date).hour(6).minutes(30).toDate()
      }
      await this.setState({
        error,
        startTime: newStartTime,
        endTime: newEndTime || this.state.endTime
      })
    } else {
      const error = {
        ...this.state.error,
        startTime: ''
      }
      await this.setState({ error })
    }
  }
  validateEndTime = async () => {
    const earliestTime = moment(this.state.date).hour(6).minutes(29).seconds(59)
    const latestTime = moment(this.state.date).hour(23).minutes(31).seconds(0)
    if (!moment(this.state.endTime).isBetween(earliestTime, latestTime)) {
      const error = {
        ...this.state.error,
        endTime: 'Choose an end time between 6:30 AM and 11:30 PM'
      }
      let newStartTime, newEndTime

      if (moment(this.state.endTime) > latestTime.toDate()) {
        // newStartTime = moment(this.state.date).hour(23).minutes(0).toDate()
        newEndTime = moment(this.state.date).hour(23).minutes(30).toDate()
      } else {
        newStartTime = moment(this.state.date).hour(6).minutes(0).toDate()
        newEndTime = moment(this.state.date).hour(6).minutes(30).toDate()
      }
      await this.setState({
        error,
        startTime: newStartTime || this.state.startTime,
        endTime: newEndTime
      })
    } else {
      const error = {
        ...this.state.error,
        endTime: ''
      }
      await this.setState({ error })
    }
  }
  validateTimesAgainstOther = async (label) => {
    if (!this.state.error.startTime && !this.state.error.endTime && 
      moment(this.state.endTime).isSameOrBefore(moment(this.state.startTime))) {
        
      let newLabel, newTime = moment()
      if (label === 'startTime') {
        newTime = moment(this.state.startTime).add(30, 'm')
        newLabel = 'endTime'
      } else {
        newTime = moment(this.state.endTime).subtract(30, 'm')
        newLabel = 'startTime'
      }      
      await this.setState({
        [newLabel]: newTime
      })
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

      this.props.onClose(parsedResponse)

    } catch (error) {
      console.log(error)
    }
  }
  loadUser = async () => {
    await this.setState({
      owner: this.props.loggedInfo.user._id,
      createdBy: this.props.loggedInfo.user._id
    })
  }
  getUserList = () => {
    return this.props.users.map((user) => {
      return (
        <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
      )
    })
  }
  getLocsList = () => {
    return this.props.locs.map((loc) => {
      return (
        <MenuItem key={loc._id} value={loc._id}>{loc.name}</MenuItem>
      )
    })
  }
  componentDidMount = () => {
    if (!this.state.createdBy) {
      this.loadUser()
      console.log('load user here')
    }
  }
  render() {
    // const { classes } = this.props
    console.log(this.props)
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>Create Booking</DialogTitle>
        <DialogContent>
          <form action="">
            <FormControl fullWidth>
              <InputLabel required>Owner</InputLabel>
              <Select
                margin="dense"
                value={this.state.owner}
                onChange={this.handleChange}
                inputProps={{
                  name: 'owner',
                  required: true
                }}
                >
                {this.props.users ? this.getUserList() : null }
              </Select>
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
                {this.props.locs ? this.getLocsList() : null}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker margin="dense" required label="Date" name="date" 
                error={this.state.error.date}
                value={this.state.date} onChange={this.handleDateChange} minDate={new Date()} 
                />
              </MuiPickersUtilsProvider>
            </FormControl>
            {/* Start Time */}
            <FormControl fullWidth >
              <MuiPickersUtilsProvider utils={MomentUtils}>
              <TimePicker margin="dense"
                error={Boolean(this.state.error.startTime)}
                label="Start Time"
                value={this.state.startTime}
                minutesStep={5}
                onChange={this.handleTimeChange.bind(this, 'startTime')}
              />
              </MuiPickersUtilsProvider>
              {this.state.error.startTime ? 
                <FormHelperText error>
                  {this.state.error.startTime}
                </FormHelperText> : null
              }
            </FormControl>
            {/* End Time */}
            <FormControl fullWidth>
              <MuiPickersUtilsProvider utils={MomentUtils}>
              <TimePicker margin="dense"
                error={Boolean(this.state.error.endTime)}
                label="End Time"
                value={this.state.endTime}
                minutesStep={5}
                onChange={this.handleTimeChange.bind(null, 'endTime')}
              />
              </MuiPickersUtilsProvider>
              {this.state.error.endTime ? 
                <FormHelperText error>
                  {this.state.error.endTime}
                </FormHelperText> : null
              }
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