import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, FormControl, InputLabel, TextField, InputAdornment, Input, Button, DialogActions } from '@material-ui/core';

class OrganizationDialog extends Component {
  handleChange = name => e => {
    this.props.handleChange(name, e.target.value)
  }
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>
          Organization 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hourly Rate: The base rate at which bookings will cost hourly
            Day Rate: The max amount that a booking will cost
          </DialogContentText>
          <form action="">
            <TextField fullWidth
              label="Organization Name"
              onChange={this.handleChange('orgName')}
              value={this.props.org.orgName}
              margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="hourly-rate">Hourly Rate</InputLabel>
              <Input
                id="hourly-rate"
                value={this.props.org.hourlyRate}
                inputProps={{
                  type: 'number',
                  step: '0.01',
                  min: '0'
                }}
                onChange={this.handleChange('hourlyRate')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="day-rate">Day Rate</InputLabel>
              <Input
                id="day-rate"
                value={this.props.org.dayRate}
                onChange={this.handleChange('dayRate')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button margin="normal" color="primary" variant="contained" onClick={this.props.onClose}>Cancel</Button>
          <Button margin="normal" color="primary" variant="contained" onClick={this.props.handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default OrganizationDialog