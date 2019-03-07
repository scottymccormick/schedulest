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
});

// const timelineGroups = [
//   { id: 1, title: 'Room 1'}, 
//   { id: 2, title: 'Room 2'}, 
//   { id: 3, title: 'Room 3'}
// ]

// const timelineItems = [
//   {
//     id: 1,
//     group: 1, 
//     title: 'Booking 1',
//     start_time: moment(),
//     end_time: moment().add(1, 'hour')
//   },
//   {
//     id: 2,
//     group: 2, 
//     title: 'Booking 2',
//     start_time: moment().add(-0.5, 'hour'),
//     end_time: moment().add(0.5, 'hour')
//   },
//   {
//     id: 3,
//     group: 1, 
//     title: 'Booking 3',
//     start_time: moment().add(2, 'hour'),
//     end_time: moment().add(3, 'hour')
//   }
// ]

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
        <Paper className={classes.paperArea}>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(ResContainer)