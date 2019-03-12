import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper, Button, List, ListItem, ListItemText } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'
import moment from 'moment'

const styles = theme => ({
  root: {
    maxWidth: '900px',
    margin: 'auto'
  },
  paperArea: {
    padding: theme.spacing.unit * 2
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
  }
});

class LocationDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locBookings: null,
      locInfo: null
    }
    
  }
  getBookingItems = () => { 
    const locId = this.props.match.params.id
    const bookingsByLocation = this.props.groupBookingsByLocation()
    const bookingThisLocation = bookingsByLocation[locId]
    const locBookingsByDate = this.props.groupBookingsByDate(bookingThisLocation)
    // this.setState({locBookingsByDate})
    return locBookingsByDate
  }
  getLocInfo = () => {
    const locId = this.props.match.params.id
    const locInfo = this.props.locs.find((loc) => loc._id === locId)
    // this.setState({locInfo})
    return locInfo
  }
  generateListItems = () => {

    const locBookings = this.getBookingItems()
    const locInfo = this.getLocInfo()
    console.log(locBookings)
    const listSection = []
    if (Object.entries(locBookings).length > 0) {
      // const dateSection = []
      for (const date in locBookings) {
        const dateSection = (
          <div key={date}>
            <Typography variant="h6">{date}</Typography>
            {locBookings[date].map(booking => {
              const {title, startTime, endTime, owner} = locBookings[date][0]
              const ownerName = this.props.getUserName(owner)
              
              const primaryText = `${ownerName} ${title ? `(${title})` : ''} - ${moment(date).format('LL')}`
              const secondaryText = `${moment(startTime).format('LT')} - ${moment(endTime).format('LT')}`
              return (
                <ListItem key={booking._id}>
                  <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItem>
              )
            })}
          </div>
        )
        listSection.push(dateSection)
      }
      console.log(listSection)
      return listSection
    } else {
      return (
        <Typography variant="h5">
          No Bookings Found
        </Typography>
      )
    }
  }
  render() {
    const { classes } = this.props

    return (
      <main className={classes.root}>
        <div className={classes.headerDiv}>
          <RouterLink to="/locations">
            <Button variant="contained" color="default" className={classes.headerButton}>
              <ArrowBackIos size="small" />
              Locations
            </Button>
          </RouterLink>
          <Typography variant="h4" gutterBottom component="h2" className={classes.headerDiv}>
            {/* need a better way to access this name */}
            {this.props.locs.length > 0 ? (this.props.locs.find((loc) => loc._id === this.props.match.params.id)).name : null}
          </Typography>
        </div>
        <Paper className={classes.paperArea}>
          <Typography>
            Description: {this.state.locInfo ? this.state.locInfo.description : null}
          </Typography>
          <List>
            {this.props.locs.length > 0 ? this.generateListItems() : null}
          </List>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(LocationDetail)