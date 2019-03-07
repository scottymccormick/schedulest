import React, { Component } from 'react';
import { Typography, Paper, List, ListItem, Button, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { Person as PersonIcon, Receipt as ReceiptIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paperArea: {
    padding: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
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
          Users
        </Typography>
        <Paper className={classes.paperArea}>
            <List>
              {generateUsers(
                <ListItem>
                  <ListItemText
                    primary="User Name"
                    secondary={'Secondary text'}
                  />
                  <ListItemSecondaryAction>
                    <Button className={classes.button} size="small" variant="contained" aria-label="User Profile">
                    <PersonIcon />
                      Profile
                    </Button>
                    <Button className={classes.button} size="small" color="secondary" dark="true" variant="contained" aria-label="Report">
                      <ReceiptIcon />
                      Report
                    </Button>
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