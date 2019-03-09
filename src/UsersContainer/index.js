import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, List, ListItem, Button, ListItemSecondaryAction, ListItemText, Fab } from '@material-ui/core';
import { Person as PersonIcon, Receipt as ReceiptIcon, Add as AddIcon } from '@material-ui/icons';
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
        <ListItem key={idx}>
          <ListItemText
            primary={name}
          />
          <ListItemSecondaryAction>
            <RouterLink to={`/users/${id}`} className={classes.routerLink}>
              <Button className={classes.button} size="small" variant="contained" aria-label="User Profile">
              <PersonIcon />
                Profile
              </Button>
            </RouterLink>
            <Button className={classes.button} size="small" color="secondary" light="true" variant="contained" aria-label="Report">
              <ReceiptIcon />
              Report
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
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
      </main>
    )
  }
}

export default withStyles(styles)(UsersContainer)