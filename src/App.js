import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import HomeContainer from './HomeContainer';
import LoginContainer from './LoginContainer';

class App extends Component {
  constructor() {
    super()

    this.state = {
      logged: false
    }
  }
  handleLogin = (formData, e) => {
    e.preventDefault()
    console.log(formData)
    // this.setState({logged: true})
  }
  render() {
    return (
      <div className="App">
        <Typography variant="h3">Schedulest</Typography>
        <Route path="/" render={ props =>
          this.state.logged ?
          <HomeContainer {...props} /> :
          <LoginContainer {...props} handleLogin={this.handleLogin} />
          } />
      </div>
    );
  }
}

export default App;
