import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, FormControl, Select, MenuItem, InputLabel, DialogActions, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MomentUtils from '@date-io/moment'
// import moment from 'moment'
import {DatePicker, MuiPickersUtilsProvider} from 'material-ui-pickers'

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
      date: new Date()
    }

  }
  handleChange = e => {
    console.log(e)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleDateChange = (date) => {
    this.setState({date: date.format("YYYY-MM-DD")})
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