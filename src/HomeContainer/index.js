import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link as RouterLink } from 'react-router-dom';
import { Typography, CssBaseline, AppBar, Drawer, withStyles, Toolbar, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import { Event as EventIcon, People as PeopleIcon, Room as RoomIcon, Person as PersonIcon, Settings as SettingsIcon } from '@material-ui/icons';
import UsersContainer from '../UsersContainer';
import ResContainer from '../ResContainer';
import LandingContainer from '../LandingContainer';
import LocationsContainer from '../LocationsContainer';
import BookingDetail from '../BookingDetail';

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbarIcon: {
    color: 'white'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  routerLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  toolbarSpacer: theme.mixins.toolbar
})

const sidebarNavs = [
  {
    text: "Bookings",
    path: "/bookings"
  },
  {
    text: "Locations",
    path: "/locations"
  },
  {
    text: "Users",
    path: "/users"
  }
]

class HomeContainer extends Component {  
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <Toolbar>
            <RouterLink to="/" className={classes.routerLink}>
              <Typography variant="h5" color="inherit" noWrap>
                Schedulest | Company X
              </Typography>
            </RouterLink>
            <div className={classes.grow}></div>
            <div>
              <IconButton>
                <SettingsIcon className={classes.toolbarIcon} />
              </IconButton>
              <IconButton>
                <PersonIcon className={classes.toolbarIcon} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer className={classes.drawer} variant="permanent" 
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbarSpacer} />
          <List>
            {sidebarNavs.map(({text, path}, index) => (
              <RouterLink className={classes.routerLink} to={path} key={text}>
                <ListItem button >
                  <ListItemIcon>{index === 0 ? <EventIcon /> : index === 1 ? <RoomIcon /> : <PeopleIcon/>}</ListItemIcon>
                  <ListItemText primary={text}/>
                </ListItem>
              </RouterLink>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          {/* <div className={classes.toolbarSpacer} /> */}
          <Route exact path="/users" component={UsersContainer} />
          <Route exact path="/bookings" component={ResContainer} />
          <Route exact path="/bookings/:id" component={BookingDetail} />
          <Route exact path="/locations" component={LocationsContainer} />
          <Route exact path="/" component={LandingContainer} />
        </main>
      </div>
    )
  }
}

HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomeContainer);