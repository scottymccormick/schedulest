import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, Button } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'

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

const BookingDetail = (props) => {
  const { classes } = props
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
      <Paper className={classes.paperArea}>
        <Typography>
          Owner
        </Typography>
        <Typography>
          Time
        </Typography>
        <Typography>
          Location
        </Typography>
      </Paper>
    </main>
  )
}

export default withStyles(styles)(BookingDetail)