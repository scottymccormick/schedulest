import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, List, ListItem, Button, ListItemText, Fab, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Add as AddIcon, Delete, Edit } from '@material-ui/icons';
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
  closeBookingDialog = (newBooking) => {
    this.setState({showBookingDialog: false})

    if (newBooking) {
      this.props.addBooking(newBooking)
    }
  }
  getBookingListItem = (bookings, listItemClass) => {
    return (
      bookings.map(({_id, title, owner, date, startTime, endTime, location}) => {
        const ownerName = (this.props.users.find((user) => user._id === owner)).name
        const primaryText = `${ownerName} ${title ? `(${title})` : ''} - ${moment(date).format('LL')}`
        const secondaryText = `${moment(startTime).format('LT')} - ${moment(endTime).format('LT')}`
        return (
          <RouterLink key={_id} to={`/bookings/${_id}`} className={listItemClass}>
            <ListItem button >
              <ListItemText 
                primary={primaryText}
                secondary={secondaryText}>
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton>
                  <Edit />
                </IconButton>
                <IconButton aria-label="Delete" onClick={this.props.deleteBooking.bind(null, _id, location)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </RouterLink>
        )
      })
    )
  }
  generateEventList = (listItemClass) => {
    return this.props.bookings.map((location, idx) => {
      if (location.length === 0 ) return null

      return (
        <div key={idx}>
          <Typography variant="h6">
            {location.info.name}
          </Typography>
          { this.getBookingListItem(location.bookings, listItemClass) }
        </div>
      ) 
    })
  }
  convertBookingsToEvents = () => {
    const events = []
    console.log(this.props.bookings)
    this.props.bookings.map(({info, bookings}, idx) => {
      return bookings.map((booking) => {
        return events.push({
          id: booking._id,
          title: this.props.users.find((user) => user._id === booking.owner).name,
          allDay: false,
          start: moment(booking.startTime).toDate(),
          end: moment(booking.endTime).toDate(),
          resourceId: info._id,
        })
      })
    })
    return events
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
              events={this.props.bookings ? this.convertBookingsToEvents() : []}
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