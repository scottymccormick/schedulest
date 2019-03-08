import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Fab, Paper, Button } from '@material-ui/core'

const styles = theme => ({
  paperArea: {
    padding: theme.spacing.unit * 2
  },
  headerDiv:  {
    position: 'relative',
    marginBottom: theme.spacing.unit * 3
  }
});

const BookingDetail = (props) => {
  const { classes } = props
  return (
    <main>
      <div className={classes.headerDiv}>
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