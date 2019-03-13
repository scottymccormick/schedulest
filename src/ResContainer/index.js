import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, List, ListItem, Button, ListItemText, Fab, ListItemSecondaryAction, IconButton, Dialog } from '@material-ui/core';
import { Add as AddIcon, Delete, Edit } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import BookingDialog from '../CreateBooking';
import DeleteBooking from '../DeleteBooking';
import MultiLocCalendar from '../MultiLocCalendar';

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
      showBookingDialog: false,
      showDeleteDialog: false,
      bookingsByDate: null,
      bookingToDelete: {
        _id: '',
        location: ''
      }
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
  handleDeleteClick = (_id, location, e) => {
    e.preventDefault()
    const bookingToDelete = {
      _id,
      location
    }
    this.setState({
      showDeleteDialog: true,
      bookingToDelete
    })
  }
  closeDeleteDialog = e => {
    if (e) e.preventDefault()
    const bookingToDelete = {
      _id: '',
      location: ''
    }
    this.setState({
      showDeleteDialog: false,
      bookingToDelete
    })
  }
  handleDeleteBooking = e => {
    e.preventDefault()
    const {_id, location} = this.state.bookingToDelete
    this.props.deleteBooking(_id, location)
    this.closeDeleteDialog()
  }
  getBookingListItem = (bookings, listItemClass) => {
    return (
      bookings.map(({_id, title, owner, date, startTime, endTime, location, createdBy}) => {
        const ownerName = this.props.getUserName(owner)
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
                { ( this.props.loggedInfo.isAdmin || 
                this.props.loggedInfo.user._id === createdBy ) ? 
                  <IconButton>
                    <Edit />
                  </IconButton>
                  : null }
                { ( this.props.loggedInfo.isAdmin || 
                this.props.loggedInfo.user._id === createdBy ) ? 
                  <span>
                    <IconButton aria-label="Delete" onClick={this.handleDeleteClick.bind(this, _id, location)}>
                      <Delete />
                    </IconButton>
                  </span>
                  : null}
              </ListItemSecondaryAction>
            </ListItem>
          </RouterLink>
        )
      })
    )
  }
  generateEventList = (listItemClass) => {
    const locBookingMap = this.props.groupBookingsByLocation()
    const listSections = []

    for (const location in locBookingMap) {
      if (locBookingMap[location].length > 0) {
        const locationName = this.props.getLocName(location)
        const listSection = (
          <div key={location}>
            <Typography variant="h6">
              {locationName}
            </Typography>
            {this.getBookingListItem(locBookingMap[location], listItemClass)}
          </div>
        )
        listSections.push(listSection)
      }
    }
    return listSections
  }
  componentDidMount() {
    if (this.props.location.state) {
      const { showBookingDialog, showCalendar } = this.props.location.state
      if (showBookingDialog) {
        this.setState({showBookingDialog})
      }
      if (showCalendar) {
        this.setState({showCalendar})
      }
    }
  }
  render() {
    const { classes } = this.props
    console.log('res container rendered')
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
              {/* <BigCalendar
              events={this.props.bookings ? this.props.convertBookingsToEvents(this.props.bookings) : []}
              views={allViews}
              step={60}
              showMultiDayTimes
              defaultDate={new Date()}
              localizer={localizer}
              className={classes.calendar} />  */}
              <MultiLocCalendar 
                events={this.props.bookings ? this.props.convertBookingsToEvents(this.props.bookings) : []}
                resourceMap={this.props.locs ? this.props.getResourceMap(this.props.locs) : []}
                />
            </div> : 
            <div>
              <List component="nav" dense>
                {(this.props.bookings && this.props.users) ? this.generateEventList(classes.listItem) : null}
              </List>
            </div>
          }
        </Paper>
        <BookingDialog 
          open={this.state.showBookingDialog} 
          onClose={this.closeBookingDialog}
          locs={this.props.locs}
          loggedInfo={this.props.loggedInfo}
          users={this.props.users}
          bookingsByDate={this.props.bookingsByDate}
          />
        <DeleteBooking
          open={this.state.showDeleteDialog}
          bookingToDelete={this.state.bookingToDelete}
          handleClose={this.closeDeleteDialog} 
          confirmDelete={this.handleDeleteBooking}/>
      </main>
    )
  }
}

export default withStyles(styles)(ResContainer)