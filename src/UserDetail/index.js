import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
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

const UserDetail = ({match, classes}) => {
  console.log(match.params.id)
  return (
    <main>
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
      </div>
    </main>
  )
}

export default withStyles(styles)(UserDetail)