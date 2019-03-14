import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import './App.css';
import HomeContainer from './HomeContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';

class App extends Component {
  constructor() {
    super()

    this.state = {
      logged: false,
      user: null,
      orgId: '',
      isAdmin: '',
      hourlyRate: '',
      dayRate: '',
      cancelTime: ''
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

      this.checkIfAdmin(parsedResponse.user)

      this.props.history.push('/')

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
  handleRegister = async (formData, e) => {
    e.preventDefault()

    try {
      let requestBody = {
        email: formData.email,
        name: formData.name,
        password: formData.password
      }
      if (formData.orgId) {
        requestBody.orgId = formData.orgId
      } else {
        requestBody.orgName = formData.orgName
      }
      const registerResponse = await fetch('http://localhost:9000/api/v1/auth/register', {
        method: 'POST',
        // credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      })

      if (!registerResponse.ok) {
        throw Error(registerResponse.statusText)
      }

      const parsedResponse = await registerResponse.json()

      localStorage.setItem('jwtToken', parsedResponse.token)
      this.setState({
        logged: true,
        user: parsedResponse.user,
        orgId: parsedResponse.user.organizations[0]
      })

      this.checkIfAdmin(parsedResponse.user)

      this.props.history.push('/')

    } catch (error) {
      console.log(error)
    }
    
  }
  checkIfAdmin = async ({_id, name, organizations}) => {
    try {
      const token = localStorage.getItem('jwtToken')
      const orgId = organizations[0]
      const orgResponse = await fetch(`http://localhost:9000/api/v1/orgs/${orgId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!orgResponse.ok) {
        throw Error(orgResponse.statusText)
        // your token expired, please log in
      }
      
      const parsedResponse = await orgResponse.json()

      await this.setState({
        isAdmin: parsedResponse.admins.indexOf(_id) > -1,
        hourlyRate: parsedResponse.hourlyRate,
        dayRate: parsedResponse.dayRate,
        cancelTime: parsedResponse.cancelTime
      })

    } catch (error) {
      console.log(error)
    }
  }
  setOrgValues = (hourlyRate, dayRate) => {
    this.setState({
      hourlyRate,
      dayRate
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
          
          await this.setState({
            logged: true,
            user: parsedResponse.user,
            orgId: parsedResponse.user.organizations[0]
          })

          this.checkIfAdmin(parsedResponse.user)
        }
      } else {
        console.log('component did mount is logged in')
      }

    } catch (error) {
      console.log(error)
    }
  }
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <Typography variant="h3">Schedulest</Typography>
        <Switch>
          <Route exact path="/login" render={
            props => this.state.logged ? <Redirect to="/" /> :
            <LoginContainer {...props} handleLogin={this.handleLogin} />
          } />
          <Route exact path="/register" render={
            props => <RegisterContainer {...props} handleRegister={this.handleRegister}/>
          }/>
          <Route path="/" render={ props =>
          this.state.logged ?
            <HomeContainer {...props} 
              checkIfAdmin={this.checkIfAdmin} 
              loggedInfo={this.state} 
              setOrgValues={this.setOrgValues} 
              handleLogout={this.handleLogout}/> :

              <Redirect to="/login" />
          } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
