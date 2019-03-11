import React, { Component } from 'react';
import { Avatar, Button, CssBaseline, FormControl, FormControlLabel, Checkbox, Input, InputLabel, Paper, Typography, Link } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons'
import withStyles from '@material-ui/core/styles/withStyles';
import googleLogin from '../images/google_login.png'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  orStatement: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  }
});

class LoginContainer extends Component {
  state = {
    email: 'bobby@gmail.com',
    password: 'my hashed password'
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const { classes } = this.props;
    console.log(this.state)
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" value={this.state.email} onChange={this.handleChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} autoComplete="current-password" />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.props.handleLogin.bind(null, this.state)}
              >
              Sign in
            </Button>
          </form>
          <Typography variant="h6" className={classes.orStatement}>
            or
          </Typography>
          <Link href="/googleauth">
            <img src={googleLogin} alt="Sign In with Google" style={{width: '200px'}}/>
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(LoginContainer);