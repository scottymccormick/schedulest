import React, { Component } from 'react';
import { Typography, Paper, List, ListItem, Button, ListItemSecondaryAction, ListItemText, Fab } from '@material-ui/core';
import { Person as PersonIcon, Receipt as ReceiptIcon, Add as AddIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paperArea: {
    padding: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    top: -1 * theme.spacing.unit,
    right: 0,
    position: 'absolute'
  },
  addIcon: {
    marginRight: theme.spacing.unit
  },
  headerDiv:  {
    position: 'relative',
    marginBottom: theme.spacing.unit * 3
  }
})

const users = [
  {
    name: 'User A'
  },
  {
    name: 'User B'
  },
  {
    name: 'User C'
  }
]

class UsersContainer extends Component {
  render() {
    const { classes } = this.props;

    const userLis = users.map(({name}, idx) => {
      return (
        <ListItem key={idx}>
          <ListItemText
            primary={name}
          />
          <ListItemSecondaryAction>
            <Button className={classes.button} size="small" variant="contained" aria-label="User Profile">
            <PersonIcon />
              Profile
            </Button>
            <Button className={classes.button} size="small" color="secondary" light="true" variant="contained" aria-label="Report">
              <ReceiptIcon />
              Report
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      )
    })

    return (
      <main>
        <div className={classes.headerDiv}>
          <Typography variant="h4" gutterBottom component="h2">
            Users
          </Typography>
          <Fab color="primary" aria-label="Add User" className={classes.fab}>
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