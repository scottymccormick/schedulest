import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, Button } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'
import moment from 'moment'

const styles = theme => ({
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

class BookingDetail extends Component {
  constructor() {
    super()

    this.state = {
      booking: null
    }
  }
  getBookingDetail = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken')
      const bookingResponse = await fetch(`${process.env.REACT_APP_API}/api/v1/bookings/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  
      if (!bookingResponse.ok) {
        throw Error(bookingResponse.statusText)
      }
  
      const parsedResponse = await bookingResponse.json()

      const formattedResponse = {
        ...parsedResponse,
        ownerName: (this.props.users.find((user) => user._id === parsedResponse.owner)).name,
        startTimeFormatted: moment(parsedResponse.startTime).format('LT'),
        endTimeFormatted: moment(parsedResponse.endTime).format('LT'),
        dateFormatted: moment(parsedResponse.date).format('LL'),
        locationName: (this.props.locs.find((loc) => 
          loc._id === parsedResponse.location
        )).name
      }
  
      await this.setState({
        booking: formattedResponse
      })
  
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const { classes } = this.props
    if (!this.state.booking) {
      this.getBookingDetail(this.props.match.params.id)
    }
    // console.log(bookingDetail)
    return (
      <main>
        <div className={classes.headerDiv}>
          <RouterLink to="/bookings">
            <Button variant="contained" color="default" className={classes.headerButton}>
              <ArrowBackIos size="small" />
              Bookings
            </Button>
          </RouterLink>
          <Typography variant="h4" gutterBottom component="h2" className={classes.headerDiv}>
            Booking Detail
          </Typography>
        </div>
        {this.state.booking ? 
          <Paper className={classes.paperArea}>
            <Typography variant="h6">
              <RouterLink to={`/users/${this.state.booking.owner}`}>
                {this.state.booking.ownerName}
              </RouterLink>
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {this.state.booking.locationName}
            </Typography>
            {this.state.booking.title ? 
              <Typography variant="body1" component="p">
                Title: {this.state.booking.title}
              </Typography>
              : null}
            <Typography variant="body1" component="p">
              {this.state.booking.startTimeFormatted} - {this.state.booking.endTimeFormatted}
            </Typography>
            
          </Paper> : null}
      </main>
    )
  }
}

export default withStyles(styles)(BookingDetail)