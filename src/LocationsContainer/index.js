import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, List, ListItem, ListItemText, Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
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
  },
  listItemPadding: {
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit
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

    this.handleLocationClose()
  }
  render() {

    const { classes } = this.props
    
    const locationLis = this.props.locs.map(({name, description, _id}, idx) => {
      return (
        <RouterLink to={`/locations/${_id}`} key={idx} className={classes.navLink}>
          <ListItem button  >
            <ListItemText
              primary={name}
              secondary={description}
              />
          </ListItem>
        </RouterLink>
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