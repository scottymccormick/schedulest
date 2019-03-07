import React, { Component } from 'react'
import { Typography, Paper, List, ListItem, Button, ListItemSecondaryAction, ListItemText, Fab } from '@material-ui/core';
import { DateRange as DateRangeIcon, Add as AddIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';

const localizer = BigCalendar.momentLocalizer(moment);

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
  },
  calendar: {
    height: '70vh'
  }
});

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
]

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

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
          <BigCalendar
            className={classes.calendar}
            localizer={localizer}
            events={events}
            defaultDate={new Date(2018, 0, 29)}
            startAccessor="start"
            endAccessor="end" />
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(ResContainer)