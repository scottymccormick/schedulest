import React, { Component } from 'react'
import { Typography, Paper, List, ListItem, Button, ListItemSecondaryAction, ListItemText, Fab } from '@material-ui/core';
import { DateRange as DateRangeIcon, Add as AddIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paperArea: {
    padding: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    top: -1 * theme.spacing.unit,
    right: 0,
    position: 'absolute'
  },
  addIcon: {
    marginRight: theme.spacing.unit
  },
  headerDiv:  {
    position: 'relative',
    marginBottom: theme.spacing.unit * 3
  }
})

class ResContainer extends Component {
  render() {
    const { classes } = this.props

    return (
      <main>
        <div className={classes.headerDiv}>
          <Typography variant="h4" gutterBottom component="h2" className={classes.headerDiv}>
            Bookings
          </Typography>
          <Fab color="primary" size="medium" variant="extended" aria-label="Create Booking" className={classes.fab}>
            <AddIcon />
            <Typography variant="button">  Create Booking</Typography>
          </Fab>
        </div>
      </main>
    )
  }
}

export default withStyles(styles)(ResContainer)