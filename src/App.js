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
  handleLogin = async (formData, e) => {
    e.preventDefault()
    console.log(formData)

    try {
      const loginResponse = await fetch('http://localhost:9000/api/v1/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (!loginResponse.ok) {
        throw Error(loginResponse.statusText)
      }

      const parsedResponse = await loginResponse.json()

      console.log(parsedResponse)
    } catch (error) {
      console.log(error)
      // return error
    }
    
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
