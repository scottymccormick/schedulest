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

const users = [
  {
    id: 0,
    name: 'User A'
  },
  {
    id: 1,
    name: 'User B'
  },
  {
    id: 2,
    name: 'User C'
  }
]

class UsersContainer extends Component {
  render() {
    const { classes } = this.props;

    const userLis = users.map(({name, id}, idx) => {
      return (
        <RouterLink key={idx} to={`/users/${id}`} className={classes.routerLink}>
          <ListItem button>
            <ListItemText
            primary={name}
          />
            <ListItemSecondaryAction>
                <Button className={classes.button} size="medium" variant="contained" aria-label="Edit User">
                  <EditIcon />
                </Button>
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
        <div className={classes.footerActions}>
          <Button className={classes.button} size="medium" color="secondary" light="true" variant="contained" aria-label="Report" onClick={() => console.log('print report')}>
            <ReceiptIcon />
            Print All Reports
          </Button>
        </div>
      </main>
    )
  }
}

export default withStyles(styles)(UsersContainer)