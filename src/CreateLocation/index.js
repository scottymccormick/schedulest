import React, { Component } from 'react'
import { Dialog, Typography } from '@material-ui/core'

class LocationForm extends Component {
  state = {
    name: '',
    description: ''
  }
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <Typography>
          Create Location Dialog
        </Typography>
      </Dialog>
    )
  }
}

export default LocationForm