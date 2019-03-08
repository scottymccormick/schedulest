import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, FormControl, TextField, DialogActions, Button } from '@material-ui/core'

class LocationForm extends Component {
  state = {
    name: '',
    description: ''
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>New Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Admin users only
          </DialogContentText>
          <form onSubmit={this.props.handleSubmit}>
            <FormControl fullWidth required>
              <TextField autoFocus margin="normal" label="Name" name="name" type="text"
                value={this.state.name} onChange={this.handleChange} required  />
            </FormControl>
            <FormControl fullWidth>
              <TextField margin="normal" label="Description" name="description" type="text" value={this.state.description} onChange={this.handleChange} />
            </FormControl>
            <input type="submit" value="" hidden/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.props.onClose} color="default">
            Cancel
          </Button>
          <Button variant="contained" onClick={this.props.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default LocationForm