import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { Edit as EditIcon, Receipt as ReceiptIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles'
import UserCalendar from '../UserCalendar';
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

const UserDetail = ({match, classes, loggedInfo, handleEdit, handlePrint, users, history, bookings, locs, convertBookingsToEvents}) => {
  console.log(match.params.id)
  const userBookings = !bookings ? [] : 
    bookings.filter(booking => {
      return booking.owner === match.params.id
    })
  const handleSelect = e => {
    console.log(e)
  }
  const getUserName = () => {
    return (users.find(user => user._id === match.params.id)).name
  }
  const getLocName = (location) => {
    return (locs.find(loc => loc._id === location)).name
  }
  const userEvents = !userBookings ? [] : 
    ( bookings.map((booking, idx) => {
      return {
        selectable: true,
        id: booking._id,
        title: `${getUserName(booking.owner)} | ${getLocName(booking.location)}`,
        allDay: false,
        start: moment(booking.startTime).toDate(),
        end: moment(booking.endTime).toDate(),
        resourceId: booking.location,
        onSelectEvent: {handleSelect}
      }
    }))
  
  return (
    <Dialog fullWidth maxWidth="xl" open={true} onClose={() => history.push('/users')} className={classes.root}>
      <DialogTitle>
        {getUserName()}
      </DialogTitle>
      <DialogContent>
        <Paper className={classes.paperArea}>
          <UserCalendar 
            events={userEvents}/>
            
        </Paper>
      </DialogContent>
      <DialogActions>
        { loggedInfo.isAdmin ? 
          <Button className={classes.button} size="medium" variant="contained" aria-label="Edit User" onClick={handleEdit}>
            <EditIcon />
            Edit User
          </Button> : null }
        { ( loggedInfo.isAdmin || 
            loggedInfo.user._id === match.params.id ) ? 
          <Button className={classes.button} size="medium" variant="contained" aria-label="Print Report" onClick={handlePrint} color="secondary">
            <ReceiptIcon />
            Print Report
          </Button> : null }
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(withRouter(UserDetail))