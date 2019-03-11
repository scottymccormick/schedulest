import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Route } from 'react-router-dom';
import './App.css';
import HomeContainer from './HomeContainer';
import LoginContainer from './LoginContainer';

class App extends Component {
  constructor() {
    super()

    this.state = {
      logged: false,
      user: null,
      orgId: ''
    }
  }
  handleLogin = async (formData, e) => {
    e.preventDefault()

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

      localStorage.setItem('jwtToken', parsedResponse.token)
      this.setState({
        logged: true,
        user: parsedResponse.user,
        orgId: parsedResponse.user.organizations[0]
      })
    } catch (error) {
      console.log(error)
    }
    
  }
  handleLogout = e => {
    localStorage.removeItem('jwtToken')
    this.setState({
      logged: false,
      user: null,
      orgId: ''
    })
  }
  
  componentDidMount = async () => {
    try {
      if (!this.state.logged) {
        const token = localStorage.getItem('jwtToken')
        if (token) {
          const loginResponse = await fetch('http://localhost:9000/api/v1/users/test', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          
          if (!loginResponse.ok) {
            throw Error(loginResponse.statusText)
            // your token expired, please log in
          }
          
          const parsedResponse = await loginResponse.json()
          
          this.setState({
            logged: true,
            user: parsedResponse.user,
            orgId: parsedResponse.user.organizations[0]
          })
        }
      } else {
        console.log('component did mount is logged in')
      }

    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div className="App">
        <Typography variant="h3">Schedulest</Typography>
        <Route path="/" render={ props =>
          this.state.logged ?
          <HomeContainer {...props} loggedInfo={this.state} handleLogout={this.handleLogout}/> :
          <LoginContainer {...props} handleLogin={this.handleLogin} />
          } />
      </div>
    );
  }
}

export default App;
