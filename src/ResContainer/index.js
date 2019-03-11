import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, List, ListItem, Button, ListItemText, Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import BookingDialog from '../CreateBooking';

const localizer = BigCalendar.momentLocalizer(moment);

const styles = theme => ({
  root: {
    maxWidth: '900px',
    margin: 'auto'
  },
  paperArea: {
    padding: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    top: 0,
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
  headerButton: {
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: 10
  },
  calendar: {
    height: '70vh',
    width: '100%'
  },
  listItem: {
    textDecoration: 'none',
    color: 'inherit'
  }
});

const events = [
  {
    id: 0,
    title: 'Trombone lesson',
    start: new Date(2019, 2, 7, 9, 0, 0),
    end: new Date(2019, 2, 7, 11, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'Band practice',
    allDay: true,
    start: new Date(2019, 2, 8, 14, 0, 0),
    end: new Date(2019, 2, 8, 15, 0, 0),
    resourceId: 2,
  }
]

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

// Create different calendars
// Day views with resource mapping
// Week view for single resource
// Need to be able to view 

class ResContainer extends Component {
  constructor() {
    super();

    this.state = {
      showCalendar: false,
      showBookingDialog: false
    }
  }
  toggleCalendar = () => {
    this.setState({ showCalendar: !this.state.showCalendar})
  }
  openBookingDialog = () => {
    this.setState({showBookingDialog: true})
  }
  closeBookingDialog = () => {
    this.setState({showBookingDialog: false})
  }
  getBookingListItem = (location, listItemClass) => {
    return (
      location.map(({_id, title, owner, date, startTime, endTime, price}) => {
        const ownerName = (this.props.users.find((user) => user._id === owner)).name
        const primaryText = `${ownerName} (${title}) - ${moment(date).format('LL')}`
        const secondaryText = `${moment(startTime).format('LT')} - ${moment(endTime).format('LT')}`
        return (
          <RouterLink key={_id} to={`/bookings/${_id}`} className={listItemClass}>
            <ListItem button >
              <ListItemText 
                primary={primaryText}
                secondary={secondaryText}>
              </ListItemText>
            </ListItem>
          </RouterLink>
        )
      })
    )
  }
  generateEventList = (listItemClass) => {
    return this.props.bookings.map((location, idx) => {
      return (
        <div key={idx}>
          <Typography variant="h6">
            {(this.props.locs.find((loc) => loc._id === location[0].location)).name}
          </Typography>
          { this.getBookingListItem(location, listItemClass) }
        </div>
      ) 
    })
  }
  componentDidMount() {
    if (this.props.location.state) {
      const { showBookingDialog } = this.props.location.state
      if (showBookingDialog) {
        this.setState({showBookingDialog})
      }
    }
  }
  render() {
    const { classes } = this.props
    
    return (
      <main className={classes.root}>
        <div className={classes.headerDiv}>
          {this.state.showCalendar ? 
            <Button variant="contained" color="default" className={classes.headerButton} onClick={this.toggleCalendar} >Hide Calendar</Button> : 
            <Button variant="contained" color="default" className={classes.headerButton} onClick={this.toggleCalendar} >Show Calendar</Button> 
          }
          <Typography variant="h4" gutterBottom component="h2" className={classes.headerDiv}>
            Bookings
          </Typography>
          <Fab color="secondary" size="medium" variant="extended" aria-label="Create Booking" className={classes.fab} onClick={this.openBookingDialog}>
            <AddIcon />
            <Typography variant="button">Create Booking</Typography>
          </Fab>
        </div>
        <Paper className={classes.paperArea}>
          {this.state.showCalendar ?
            <div>
              <BigCalendar
              events={events}
              views={allViews}
              step={60}
              showMultiDayTimes
              defaultDate={new Date()}
              localizer={localizer}
              className={classes.calendar} /> 
            </div> : 
            <div>
              <List component="nav">
                {this.props.bookings ? this.generateEventList(classes.listItem) : null}
              </List>
            </div>
          }
        </Paper>
        <BookingDialog 
          open={this.state.showBookingDialog} 
          onClose={this.closeBookingDialog}
          locs={this.props.locs}
          users={this.props.users}
          loggedInfo={this.props.loggedInfo}
          />
      </main>
    )
  }
}

export default withStyles(styles)(ResContainer)