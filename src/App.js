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
      logged: true
    }
  }
  render() {
    return (
      <div className="App">
        <Typography variant="h2">Schedulest</Typography>
        <Route exact path="/auth" component={LoginContainer} />
        <Route path="/" render={ props =>
          this.state.logged ?
          <HomeContainer {...props} /> :
          <Redirect to={{
            pathname: "/auth"
          }} />
          } />
      </div>
    );
  }
}

export default App;
