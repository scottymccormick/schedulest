import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import './App.css';
import HomeContainer from './HomeContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Typography variant="h2">Hello World</Typography>
        <HomeContainer />
      </div>
    );
  }
}

export default App;
