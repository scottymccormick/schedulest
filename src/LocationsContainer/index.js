import React, { Component } from 'react'
import { Typography, Paper, List, ListItem, Button, ListItemSecondaryAction, ListItemText, Fab } from '@material-ui/core';
import { DateRange as DateRangeIcon, Add as AddIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
  }
})

const locations = [
  {
    name: 'Location 1',
    description: 'Additional text'
  },
  {
    name: 'Location 2',
    description: 'Additional text'
  },
  {
    name: 'Location 3',
    description: 'Additional text'
  }
]

class LocationsContainer extends Component {
  render() {

    const { classes } = this.props
    
    const locationLis = locations.map(({name, description}, idx) => {
      return (
        <ListItem key={idx}>
        <ListItemText
          primary={name}
          secondary={description}
          />
        <ListItemSecondaryAction>
          <Button className={classes.button} size="small" variant="contained" aria-label="Location Schedule">
          <DateRangeIcon />
            Schedule
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      )
    })
    
    return (
      <main>
        <div className={classes.headerDiv}>
          <Typography variant="h4" gutterBottom component="h2">
            Locations
          </Typography>
          <Fab color="primary" size="medium" aria-label="Add Location" className={classes.fab}>
            <AddIcon />
          </Fab>
        </div>
        <Paper className={classes.paperArea}>
            <List>
              {locationLis}
            </List>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(LocationsContainer)