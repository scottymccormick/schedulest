import React, { Component } from 'react';
import { Typography, Paper, List, ListItem, ListItemAvatar, IconButton, ListItemSecondaryAction, ListItemText, Avatar } from '@material-ui/core';
import { Person as PersonIcon, Info as InfoIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paperArea: {
    padding: theme.spacing.unit * 2
  }
})

function generateUsers(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class UsersContainer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          Reservations
        </Typography>
        <Paper className={classes.paperArea}>
            <List>
              {generateUsers(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="User Name"
                    secondary={'Secondary text'}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Information">
                      <InfoIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(UsersContainer)