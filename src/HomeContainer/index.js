import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, CssBaseline, AppBar, Drawer, withStyles, Toolbar } from '@material-ui/core';

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
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
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
})

class HomeContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.appBar}>
              Schedulest
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer>

        </Drawer>
      </div>
    )
  }
}

HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomeContainer);