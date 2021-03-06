import React, { Component } from 'react';
import { Avatar, Button, CssBaseline, FormControl, FormControlLabel, Input, InputLabel, Paper, Typography, FormLabel, RadioGroup, Radio } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { LockOutlined } from '@material-ui/icons'
import withStyles from '@material-ui/core/styles/withStyles';

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
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

class LoginContainer extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    orgId: '',
    orgType: 'existing',
    orgName: ''
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  radioChange = e => {
    this.setState({
      orgType: e.target.value
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" value={this.state.email} onChange={this.handleChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" name="name" value={this.state.name} onChange={this.handleChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} />
            </FormControl>
            {this.state.orgType === 'existing' ? 
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="orgId">Organization ID</InputLabel>
                <Input name="orgId" id="orgId" value={this.state.orgId} onChange={this.handleChange} />
              </FormControl>
              : 
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="orgName">Organization Name</InputLabel>
                <Input name="orgName" id="orgName" value={this.state.orgName} onChange={this.handleChange} />
              </FormControl>
              }
            <FormControl margin="normal" component="fieldset">
              <FormLabel>My Organization is</FormLabel>
              <RadioGroup row
                aria-label="Organization"
                name="organizationType"
                value={this.state.orgType}
                onChange={this.radioChange}
              >
                <FormControlLabel value="existing" control={<Radio />} label="Existing" />
                <FormControlLabel value="new" control={<Radio />} label="New" />
              </RadioGroup>
            </FormControl>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.props.handleRegister.bind(null, this.state)}
              >
              Register
            </Button>
          </form>
          <Typography variant="h6" className={classes.orStatement}>
            or
          </Typography>
          <Button fullWidth color="secondary" variant="contained" onClick={() => this.props.history.push('/login')}>
            Sign In
          </Button>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(withRouter(LoginContainer));