import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import './App.css';
import HomeContainer from './HomeContainer';
import LoginContainer from './LoginContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Typography variant="h2">Hello World</Typography>
        <HomeContainer />
        <LoginContainer />
      </div>
    );
  }
}

export default App;
