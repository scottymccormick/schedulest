import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper, Button } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'

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
  console.log('Chosen ID', props.match.params.id)
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