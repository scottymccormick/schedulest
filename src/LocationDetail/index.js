import React from 'react'
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

const LocationDetail = (props) => {
  const { classes } = props
  const locBookings = props.bookings.find((bookings) => bookings.info._id === props.match.params.id)
  const getBookingItems = () => { 
    if (locBookings) {
      return (
        locBookings.bookings.map((booking) => {
          const ownerName = (props.users.find((user) => user._id === booking.owner)).name
          const primaryText = `${ownerName} ${booking.title ? `(${booking.title})` : ''} - ${moment(booking.date).format('LL')}`
          const secondaryText = `${moment(booking.startTime).format('LT')} - ${moment(booking.endTime).format('LT')}`
          console.log('props.users', props.users)
          return (
            <ListItem>
              <ListItemText primary={primaryText} secondary={secondaryText} />
            </ListItem>
          )
        })
      )
    } else {
      return (
        <Typography variant="h5">
          No Bookings Found
        </Typography>
      )
    }
  }
  
  console.log('Chosen locs', locBookings)
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
          {locBookings ? locBookings.info.name : null}
        </Typography>
      </div>
      <Paper className={classes.paperArea}>
        <Typography>
          Description: {locBookings ? locBookings.info.description : null}
        </Typography>
        <List>
          {getBookingItems()}
        </List>
      </Paper>
    </main>
  )
}

export default withStyles(styles)(LocationDetail)