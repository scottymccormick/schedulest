import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper, Button, List, ListItem, ListItemText } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'
import moment from 'moment'

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

class LocationDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locBookings: [],
      locInfo: null
    }
    
  }
  getBookingItems = () => { 
    const locId = this.props.match.params.id
    
    console.log('locs', this.props.locs)
    this.props.getLocBookingsByDate(locId).then((result) => 
      this.setState({
        locBookings: result
      })
    )
  }
  getLocInfo = () => {
    const locId = this.props.match.params.id
    const locInfo = this.props.locs.find((loc) => loc._id === locId)
    this.setState({locInfo})
  }
  generateListItems = () => {
    if (this.state.locBookings && this.props.users) {
      const listItems = []
      for (const date in this.state.locBookings) {

        const {title, startTime, endTime, owner} = this.state.locBookings[date][0]
        const ownerName = this.props.getUserName(owner)

        const primaryText = `${ownerName} ${title ? `(${title})` : ''} - ${moment(date).format('LL')}`
        const secondaryText = `${moment(startTime).format('LT')} - ${moment(endTime).format('LT')}`
        const listItem = (
          <ListItem key={date}>
            <ListItemText primary={primaryText} secondary={secondaryText} />
          </ListItem>
        )

        listItems.push(listItem)
      }
      return listItems
    } else {
      return (
        <Typography variant="h5">
          No Bookings Found
        </Typography>
      )
    }
  }
  componentDidMount = () => {
    console.log('getting bookings items')
    console.log(this.props)
    this.getBookingItems()
    this.getLocInfo()
  }
  render() {
    const { classes } = this.props

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
            {/* need a better way to access this name */}
            {this.props.locs.length > 0 ? (this.props.locs.find((loc) => loc._id === this.props.match.params.id)).name : null}
          </Typography>
        </div>
        <Paper className={classes.paperArea}>
          <Typography>
            Description: {this.state.locInfo ? this.state.locInfo.description : null}
          </Typography>
          <List>
            {this.generateListItems()}
          </List>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(LocationDetail)