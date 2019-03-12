import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, NavLink as RouterLink } from 'react-router-dom';
import { Typography, CssBaseline, AppBar, Drawer, withStyles, Toolbar, List, ListItem, ListItemIcon, ListItemText, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Event as EventIcon, People as PeopleIcon, Room as RoomIcon, Person as PersonIcon, Settings as SettingsIcon, VerifiedUser } from '@material-ui/icons';
import moment from 'moment';
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
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit
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
      locs: [],
      bookings: []
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
  getOrgBookings = async () => {
    try {
      const token = localStorage.getItem('jwtToken')
      const orgBookingsResponse = await fetch(`http://localhost:9000/api/v1/bookings?org=${this.props.loggedInfo.orgId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!orgBookingsResponse.ok) {
        throw Error(orgBookingsResponse.statusText)
      }

      const parsedResponse = await orgBookingsResponse.json()
      console.log(parsedResponse)

      await this.setState({
        bookings: parsedResponse
      })
    } catch (error) {
      console.log(error)
    }
  }
  getOrgValues = async () => {
    this.getOrgInfo()
    this.getOrgUsers()
    this.getOrgLocs()
    this.getOrgBookings()
  }
  dateSort = (a, b) => {
    if (a.date < b.date) return -1
    if (a.date > b.date) return 1
    return 0
  }
  addBooking = (newBooking) => {
    const newBookingsState = [...this.state.bookings, newBooking]
    this.setState({
      bookings: newBookingsState.sort(this.dateSort)
    })
  }
  deleteBooking = async (bookingId, locationId, e) => {
    try {
      e.preventDefault()
      const token = localStorage.getItem('jwtToken')
      const deleteResponse = await fetch(`http://localhost:9000/api/v1/bookings/${bookingId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!deleteResponse.ok) {
        throw Error(deleteResponse.statusText)
      }

      this.setState({
        bookings: this.state.bookings.filter(b => b._id !== bookingId)
      })

    } catch (error) {
      console.log(error)
    }
  }
  addLocation = async (locationData) => {
    console.log(locationData)

    
    // post location to api
    try {
      const requestBody = {
        ...locationData,
        organization: this.state.orgId
      }
      const token = localStorage.getItem('jwtToken')
      const locResponse = await fetch(`http://localhost:9000/api/v1/locs`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!locResponse.ok) {
        throw Error(locResponse.statusText)
      }

      const parsedResponse = await locResponse.json()

      await this.setState({
        locs: [...this.state.locs, parsedResponse ]
      })


    } catch (error) {
      console.log(error)
    }
  }
  callLocBookingsByDate = async (locId, start, end) => {
    try {
      const token = localStorage.getItem('jwtToken')
      const startDate = start || moment().day(1).startOf('day').toString()
      const endDate = end || moment().day(7).endOf('day').toString()
      const urlString = `http://localhost:9000/api/v1/bookings?org=${this.props.loggedInfo.orgId}&loc=${locId}&groupBy=date&from=${startDate}&to=${endDate}`
      const bookingResponse = await fetch(urlString,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      
      if (!bookingResponse.ok) {
        throw Error(bookingResponse.statusText)
      }

      const parsedResponse = await bookingResponse.json()

      console.log(parsedResponse)

      return parsedResponse

    } catch (error) {
      console.log(error)
    }
  }
  getLocBookingsByDate = async (locId, start, end) => {
    return this.callLocBookingsByDate(locId, start, end)
  }
  groupBookingsByLocation = () => {
    this.state.locs.sort((a, b) => {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
    })

    const responseBody = {}
    for (let i = 0; i < this.state.locs.length; i++) {
      const location = this.state.locs[i];
      const locBookings = this.state.bookings.filter((booking) => {
        return booking.location === location._id
      })
      responseBody[location._id] = locBookings.sort(this.dateSort)
    }
    // keys are loc ids, values are arrays of bookings with same location
    return responseBody
  }
  getLocName = (locId) => {
    const location = this.state.locs.find((loc) => loc._id === locId)
    return location.name
  }
  getUserName = (userId) => {
    const user = this.state.users.find((user) => user._id === userId)
    return user.name
  }
  componentDidMount = () => {
    if (!this.state.orgId) {
      console.log('component did mount home container')
      this.getOrgValues()
    }
  }
  render() {
    const { classes } = this.props
    const open = Boolean(this.state.anchorEl)
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
            <RouterLink to="/" className={classes.routerLink}>
              <Typography variant="h5" color="inherit" noWrap>
                Schedulest | {this.state.orgName || 'Org Name Not Found'}
              </Typography>
            </RouterLink>
            <div className={classes.grow}></div>
            <div>
              {this.props.loggedInfo.isAdmin ? 
                <IconButton color="inherit">
                  <VerifiedUser /> <Typography color="inherit">Admin</Typography>
                </IconButton>
                : null}
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
              props => <ResContainer {...props} 
                locs={this.state.locs}
                users={this.state.users}
                bookings={this.state.bookings}
                groupBookingsByLocation={this.groupBookingsByLocation}
                getLocName={this.getLocName}
                getUserName={this.getUserName}
                addBooking={this.addBooking}
                deleteBooking={this.deleteBooking}
                loggedInfo={this.props.loggedInfo} />
              } />
            <Route exact path="/bookings/:id" render={
              props => <BookingDetail {...props}
                locs={this.state.locs}
                users={this.state.users}
                bookings={this.state.bookings}
                loggedInfo={this.props.loggedInfo} />
              } />
            <Route exact path="/locations" render={
              props => <LocationsContainer {...props} 
                locs={this.state.locs}
                addLocation={this.addLocation} />
              } />
            <Route exact path="/locations/:id" render={
              props => <LocationDetail {...props}
                locs={this.state.locs}
                users={this.state.users}
                loggedInfo={this.props.loggedInfo}
                getUserName={this.getUserName}
                getLocBookingsByDate={this.getLocBookingsByDate} />
              } />
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