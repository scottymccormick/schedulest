import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, List, ListItem, Button, ListItemSecondaryAction, ListItemText, Fab } from '@material-ui/core';
import { DateRange as DateRangeIcon, Add as AddIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import LocationForm from '../CreateLocation';

const styles = theme => ({
  root: {
    maxWidth: '900px',
    margin: 'auto'
  },
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
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit'
  }
})

class LocationsContainer extends Component {
  state = {
    showCreateLocation: false
  }
  handleLocationOpen = () => {
    this.setState({showCreateLocation: true})
  }
  handleLocationClose = () => {
    this.setState({showCreateLocation: false})
  }
  handleSubmit = (location) => {
    this.props.addLocation(location)
    // this.setState({
    //   locations: [location, ...this.state.locations]
    // })
    // send to upper component

    this.handleLocationClose()
  }
  render() {

    const { classes } = this.props
    
    const locationLis = this.props.locs.map(({name, description}, idx) => {
      return (
        <ListItem key={idx}>
          <ListItemText
            primary={name}
            secondary={description}
            />
          <ListItemSecondaryAction>
            <RouterLink to={`/locations/${idx}`} className={classes.navLink}>
              <Button className={classes.button} size="small" variant="contained" aria-label="Location Schedule">
              <DateRangeIcon />
                Schedule
              </Button>
            </RouterLink>
          </ListItemSecondaryAction>
        </ListItem>
      )
    })
    
    return (
      <main className={classes.root}>
        <div className={classes.headerDiv}>
          <Typography variant="h4" gutterBottom component="h2">
            Locations
          </Typography>
          <Fab color="primary" size="medium" aria-label="Add Location" className={classes.fab} onClick={this.handleLocationOpen}>
            <AddIcon />
          </Fab>
        </div>
        <Paper className={classes.paperArea}>
            <List>
              {locationLis}
            </List>
        </Paper>
        {this.state.showCreateLocation ? 
          <LocationForm open={this.state.showCreateLocation} onClose={this.handleLocationClose} handleSubmit={this.handleSubmit} />
          : null}
      </main>
    )
  }
}

export default withStyles(styles)(LocationsContainer)