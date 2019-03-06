import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, CssBaseline, AppBar, Drawer, withStyles, Toolbar, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import { Event as EventIcon, People as PeopleIcon, Room as RoomIcon, Person as PersonIcon, Settings as SettingsIcon } from '@material-ui/icons';

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
  toolbar: theme.mixins.toolbar
    // toolbar: {
    //   minHeight: '64px',
    //   alignItems: 'center',
    //   justifyContent: 'space-between'
    // }
})

class HomeContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h5" color="inherit" noWrap>
              Schedulest | Company X
            </Typography>
            <div className={classes.grow}></div>
            <div>
              <IconButton>
                <SettingsIcon color="inherit"/>
              </IconButton>
              <IconButton>
                <PersonIcon color="inherit"/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer className={classes.drawer} variant="permanent" 
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {['Reservations', 'Locations', 'Users'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index === 0 ? <EventIcon /> : index === 1 ? <RoomIcon /> : <PeopleIcon/>}</ListItemIcon>
                <ListItemText primary={text}/>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph>
            Test Content
          </Typography>
        </main>
      </div>
    )
  }
}

HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomeContainer);