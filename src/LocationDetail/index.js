import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper } from '@material-ui/core'

const styles = theme => ({
  paperArea: {
    padding: theme.spacing.unit * 2
  },
  headerDiv:  {
    position: 'relative',
    marginBottom: theme.spacing.unit * 3
  }
});

const LocationDetail = (props) => {
  const { classes } = props
  console.log('Chosen ID', props.match.params.id)
  return (
    <main>
      <div className={classes.headerDiv}>
        <Typography variant="h4" gutterBottom component="h2" className={classes.headerDiv}>
          Studio X
        </Typography>
      </div>
      <Paper className={classes.paperArea}>
        <Typography>
          Location Details
        </Typography>
      </Paper>
    </main>
  )
}

export default withStyles(styles)(LocationDetail)