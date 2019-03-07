import React, { Component } from 'react';
import { Typography, Paper, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
  }
})

class LandingContainer extends Component{
  render() {
    const { classes } = this.props

    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          Welcome
        </Typography>
        <Paper className={classes.paragraph}>
          <Typography component="p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut dolorem sit adipisci magnam ratione corporis magni dolores optio iste qui sequi, quam eveniet dicta molestias tempore? Obcaecati corrupti aliquid, dicta ducimus inventore suscipit iure assumenda, ratione numquam, hic eveniet! Sequi deleniti quibusdam id non quo optio, officiis aut consectetur, culpa qui, aliquid distinctio. Ipsa, cum ut eius illum nemo aliquid impedit in minus at, autem quasi provident optio asperiores dolorum, unde quod soluta labore corrupti tempora rem aperiam et vitae.
          </Typography>
        </Paper>
        <Typography variant="h4" gutterBottom className={classes.header}>
          Quick Links
        </Typography>
        <Paper className={classes.buttonDiv}>
          <Button size="large" variant="contained" color="primary">Create Booking</Button>
          <Button size="large" variant="contained" color="secondary">Print Reports</Button>
          <Button size="large" variant="contained" color="inherit">View Schedule</Button>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(LandingContainer)