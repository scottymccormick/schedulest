import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    maxWidth: '900px',
    margin: 'auto'
  },
  paragraph: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'start'
  },
  header: {
    marginTop: theme.spacing.unit * 3
  },
  buttonDiv: {
    padding: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-around',
    size: 'large'
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit'
  }
})

class LandingContainer extends Component{
  render() {
    const { classes } = this.props

    return (
      <main className={classes.root}>
        <Typography variant="h4" gutterBottom component="h2">
          Welcome
        </Typography>
        <Paper className={classes.paragraph}>
          <Typography variant="h6" align="center">
            Schedulest helps people reserve spaces, manage events, and collaborate flawlessly!
          </Typography>
          <hr />
          <Typography component="p">
            <Typography paragraph style={{display: 'inline-block'}}>
            The booking tool is for use by a small business in scheduling and organizing the booking of multiple spaces.
            </Typography>
            <Typography paragraph style={{display: 'inline-block'}}>
            Employees of the business (admins) should have control over all reservations made by any users. User will have the ability to create reservations and edit their own reservations. 
            </Typography>
            <Typography paragraph style={{display: 'inline-block'}}>
            Both admins and users will have visibility into the cost of their individual reservations, as well as over a given month.
            </Typography>

          </Typography>
        </Paper>
        <Typography variant="h4" gutterBottom className={classes.header}>
          Quick Links
        </Typography>
        <Paper className={classes.buttonDiv}>
          <RouterLink className={classes.navLink} to={{
            pathname: '/bookings',
            state: { showBookingDialog: true }}
          }>
            <Button size="large" variant="contained" color="primary">Create Booking</Button>
          </RouterLink>
          <Button size="large" variant="contained" color="secondary">Print Reports</Button>
          <RouterLink className={classes.navLink} to={{
            pathname: '/bookings',
            state: { showCalendar: true }}
          }>
            <Button size="large" variant="contained" color="inherit">View Schedule</Button>
          </RouterLink>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(LandingContainer)