import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, NavLink as RouterLink } from 'react-router-dom';
import { Typography, CssBaseline, AppBar, Drawer, withStyles, Toolbar, List, ListItem, ListItemIcon, ListItemText, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Event as EventIcon, People as PeopleIcon, Room as RoomIcon, Person as PersonIcon, Settings as SettingsIcon } from '@material-ui/icons';
import UsersContainer from '../UsersContainer';
import ResContainer from '../ResContainer';
import LandingContainer from '../LandingContainer';
import LocationsContainer from '../LocationsContainer';
import BookingDetail from '../BookingDetail';
import LocationDetail from '../LocationDetail';
import UserDetail from '../UserDetail';

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

const page404 = () => {
  return (
    <div>
      <Typography variant="h5">
        404: Page Not Found
      </Typography>
    </div>
  )
}

class HomeContainer extends Component {
  constructor() {
    super()

    this.state = {
      anchorEl: null,
      orgName: '',
      orgId: '',
      users: [],
      locs: []
    }
  }
  handleProfileMenu = e => {
    this.setState({
      anchorEl: e.currentTarget
    })
  }
  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }
  getOrgInfo = async () => {
    try {
      // fetch first organization for now
      const token = localStorage.getItem('jwtToken')
      const orgResponse = await fetch(`http://localhost:9000/api/v1/orgs/${this.props.loggedInfo.orgId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!orgResponse.ok) {
        throw Error(orgResponse.statusText)
      }

      const parsedResponse = await orgResponse.json()

      await this.setState({
        orgName: parsedResponse.name,
        orgId: parsedResponse._id
      })

    } catch (error) {
      console.log(error)
    }
  }
  getOrgUsers = async () => {
    try {
      const token = localStorage.getItem('jwtToken')
      const orgUsersResponse = await fetch(`http://localhost:9000/api/v1/users?org=${this.props.loggedInfo.orgId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!orgUsersResponse.ok) {
        throw Error(orgUsersResponse.statusText)
      }

      const parsedResponse = await orgUsersResponse.json()
      
      const formattedResponse = parsedResponse.map((user) => {
        const {name, email, _id} = user
        return {name, email, _id}
      })

      await this.setState({
        users: formattedResponse
      })
    } catch (error) {
      console.log(error)
    }
  }
  getOrgLocs = async () => {
    try {
      const token = localStorage.getItem('jwtToken')
      const orgLocsResponse = await fetch(`http://localhost:9000/api/v1/locs?org=${this.props.loggedInfo.orgId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!orgLocsResponse.ok) {
        throw Error(orgLocsResponse.statusText)
      }

      const parsedResponse = await orgLocsResponse.json()
      
      const formattedResponse = parsedResponse.map((loc) => {
        const {name, description, _id} = loc
        return {name, description, _id}
      })

      await this.setState({
        locs: formattedResponse
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const { classes } = this.props
    const open = Boolean(this.state.anchorEl)
    if (!this.state.orgId) {
      this.getOrgInfo()
      this.getOrgUsers()
      this.getOrgLocs()
    }
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <Toolbar>
            <RouterLink to="/" className={classes.routerLink}>
              <Typography variant="h5" color="inherit" noWrap>
                Schedulest | {this.state.orgName || 'Org Name Not Found'}
              </Typography>
            </RouterLink>
            <div className={classes.grow}></div>
            <div>
              <IconButton>
                <SettingsIcon className={classes.toolbarIcon} />
              </IconButton>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenu}
                color="inherit"
              >
                <PersonIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>{this.props.loggedInfo.user.name}</MenuItem>
                <MenuItem onClick={this.props.handleLogout}>Log Out</MenuItem>
              </Menu>
              
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
          <Switch>
            <Route exact path="/users" render={ 
              props => <UsersContainer {...props} users={this.state.users} />
              } />
            <Route exact path="/users/:id" component={UserDetail} />
            <Route exact path="/bookings" render={
              props => <ResContainer {...props} />
              } />
            <Route exact path="/bookings/:id" component={BookingDetail} />
            <Route exact path="/locations" render={
              props => <LocationsContainer {...props} locs={this.state.locs} />
              } />
            <Route exact path="/locations/:id" component={LocationDetail} />
            <Route exact path="/" component={LandingContainer} />
            <Route component={page404} />
          </Switch>
        </main>
      </div>
    )
  }
}

HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomeContainer);