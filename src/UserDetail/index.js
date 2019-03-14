import React from 'react'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import { Typography, Button, Paper, Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { Edit as EditIcon, Receipt as ReceiptIcon, Add as AddIcon, ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles'

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

const UserDetail = ({match, classes, loggedInfo, handleEdit, handlePrint, users, history}) => {
  console.log(match.params.id)
  return (
    <Dialog open={true} onClose={() => history.push('/users')} className={classes.root}>
      <DialogTitle>
        {(users.find(user => user._id === match.params.id)).name}
      </DialogTitle>
      <DialogContent>

      
      <div className={classes.headerDiv}>
        <RouterLink to="/users">
          <Button variant="contained" color="default" className={classes.headerButton}>
            <ArrowBackIos size="small" />
            Users
          </Button>
        </RouterLink>
        <Typography variant="h4" gutterBottom component="h2" className={classes.headerDiv}>
          User X
        </Typography>
        <Paper className={classes.paperArea}>

        { loggedInfo.isAdmin ? 
              <Button className={classes.button} size="small" variant="contained" aria-label="Edit User" onClick={handleEdit}>
                <EditIcon />
                Edit User
              </Button> : null }
            { ( loggedInfo.isAdmin || 
                loggedInfo.user._id === match.params.id ) ? 
              <Button className={classes.button} size="small" variant="contained" aria-label="Print Report" onClick={handlePrint} color="secondary">
                <ReceiptIcon />
                Print Report
              </Button> : null }
        </Paper>
      </div>
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(styles)(withRouter(UserDetail))