import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, List, ListItem, Button, ListItemSecondaryAction, ListItemText, Fab } from '@material-ui/core';
import { Edit as EditIcon, Receipt as ReceiptIcon, Add as AddIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

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
  routerLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  footerActions: {
    margin: theme.spacing.unit * 3
  }
})

class UsersContainer extends Component {
  handleEdit = e => {
    e.preventDefault()
    console.log('edit user')
    // make dialog appear
  }
  handlePrint = e => {
    e.preventDefault()
    console.log('print report')
  }
  render() {
    const { classes } = this.props;
    const userLis = this.props.users.map(({name, _id}, idx) => {
      return (
        <RouterLink key={idx} to={`/users/${_id}`} className={classes.routerLink}>
          <ListItem button>
            <ListItemText
            primary={name}
          />
            <ListItemSecondaryAction>
            {this.props.loggedInfo.isAdmin ? 
              <Button className={classes.button} size="small" variant="contained" aria-label="Edit User" onClick={this.handleEdit}>
                <EditIcon />
                Edit User
              </Button> : null }
              {console.log(_id)}
            { (this.props.loggedInfo.isAdmin || this.props.loggedInfo.user._id === _id) ? 
              <Button className={classes.button} size="small" variant="contained" aria-label="Print Report" onClick={this.handlePrint} color="secondary">
                <ReceiptIcon />
                Print Report
              </Button> : null }
            </ListItemSecondaryAction>
          </ListItem>
        </RouterLink>
      )
    })

    return (
      <main className={classes.root}>
        <div className={classes.headerDiv}>
          <Typography variant="h4" gutterBottom component="h2">
            Users
          </Typography>
          <Fab color="primary" size="medium" aria-label="Add User" className={classes.fab}>
            <AddIcon />
          </Fab>
        </div>
        <Paper className={classes.paperArea}>
          <List>
            {userLis}
          </List>
        </Paper>
        {this.props.loggedInfo.isAdmin ? 
          <div className={classes.footerActions}>
            <Button className={classes.button} size="medium" color="secondary" light="true" variant="contained" aria-label="Report" onClick={() => console.log('print report')}>
              <ReceiptIcon />
              Print All Reports
            </Button>
          </div> : null
        }
      </main>
    )
  }
}

export default withStyles(styles)(UsersContainer)