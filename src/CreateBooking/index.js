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
      createdBy: '',
      date: moment().toDate(),
      startTime: moment().hour(15).minutes(0).seconds(0).toDate(),
      endTime: moment().hour(16).minutes(0).seconds(0).toDate(),
      price: '',
      error: {
        startTime: '',
        endTime: '',
        overlap: ''
      }
    }

  }
  handleChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    })

    if (!this.state.price) this.setPrice()
    this.checkOverlap()
  }
  handleDateChange = async (date) => {
    const start = moment(this.state.startTime)
    const end = moment(this.state.endTime)
    const newStart = moment(date).hour(start.hour()).minute(start.minute())
    const newEnd = moment(date).hour(end.hour()).minute(end.minute())
    await this.setState({
      date,
      startTime: newStart,
      endTime: newEnd
    })
    console.log('new start', newStart)
    console.log('new end', newEnd)
    this.checkOverlap()
  }
  handleTimeChange = async (label, time) => {
    await this.setState({[label]: time.toDate()})
    // should validate to make it to time cannot be set to yesterday or tomorrow
    this.handleTimeValidate(label, time)

    this.setPrice()
  }
  handleTimeValidate = (label, time) => {
    console.log('time validate handled')
    console.log(this.state)
    // validate date/time

    this.validateStartTime()
    this.validateEndTime()
    if (label) {
      this.validateTimesAgainstOther(label)
    }

    this.checkOverlap()
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
  checkOverlap = async () => {
    if (!this.state.location) return

    const currentDate = moment(this.state.date).toDate().toDateString()
    const dateBookings = this.props.bookingsByDate[currentDate]

    if (!dateBookings) {
      this.clearOverlapError()
      return
    }
    const locBookings = dateBookings.filter(booking => 
      booking.location === this.state.location
    )
    const currentStartTime = moment(this.state.startTime)
    const currentEndTime = moment(this.state.endTime)
    for (let i = 0; i < locBookings.length; i++) {
      const {startTime, endTime, location} = locBookings[i]

      if (
        moment(startTime).isBetween(currentStartTime, currentEndTime, 'minutes')|| 
        moment(endTime).isBetween(currentStartTime, currentEndTime, 'minutes')
        ||
        currentStartTime.isBetween(moment(startTime), moment(endTime), 'minutes')
        ||
        currentEndTime.isBetween(moment(startTime), moment(endTime), 'minutes')
        ||
        currentStartTime.isSame(moment(startTime), 'minutes') 
        ||
        currentEndTime.isSame(moment(endTime), 'minutes')
        ) {
          const formattedStart = moment(startTime).format('LT')
          const formattedEnd = moment(endTime).format('LT')
          const locData = this.props.locs.find(loc => loc._id === location)
          const locName = locData.name

          const error = {
            ...this.state.error,
            overlap: `This booking overlaps with a ${formattedStart} - ${formattedEnd} in ${locName}`
          }
          await this.setState({error})
          return
      }
    }
    this.clearOverlapError()
  }
  clearOverlapError = async () => {
    const error = {
      ...this.state.error,
      overlap: ''
    }
    await this.setState({error})
  }
  setPrice = async (specifiedPrice) => {
    const startTime = moment(this.state.startTime)
    const endTime = moment(this.state.endTime)
    const difference = endTime.diff(startTime, 'hours', true)
    const hourlyPrice = difference * this.props.loggedInfo.hourlyRate
    const price = specifiedPrice || (
      hourlyPrice < this.props.loggedInfo.dayRate ? hourlyPrice : this.props.loggedInfo.dayRate )
    this.setState({
      price: Number(price).toFixed(2)
    })
  }
  handleSubmit = async () => {
    try {
      if (this.state.error.overlap) throw Error({message: 'Cannot submit with any overlap'})
      const token = localStorage.getItem('jwtToken')
      const bookingResponse = await fetch(`${process.env.REACT_APP_API}/api/v1/bookings`, {
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
      this.clearState()

    } catch (error) {
      console.log(error)
    }
  }
  onClose = async () => {
    this.clearState()
    this.props.onClose()
  }
  clearState = async () => {
    await this.setState({
      title: '',
      location: '',
      date: moment().toDate(),
      startTime: moment().hour(15).minutes(0).seconds(0).toDate(),
      endTime: moment().hour(16).minutes(0).seconds(0).toDate(),
      price: Number(this.props.loggedInfo.hourlyRate).toFixed(2),
      error: {
        startTime: '',
        endTime: '',
        overlap: ''
      }
    })
    this.loadUser()
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
    }
  }
  render() {
    // const { classes } = this.props
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
              {Boolean(this.state.error.overlap) ? 
                <FormHelperText error>
                  {this.state.error.overlap}
                </FormHelperText>
                : null }
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
              <TimePicker margin="dense" required
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
              <TimePicker margin="dense" required
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
          <Button variant="contained" onClick={this.onClose} color="default">
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