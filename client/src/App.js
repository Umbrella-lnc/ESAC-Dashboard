import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Provider } from 'react-redux'

// Import actions
import { setCurrentUser, logoutUser } from './actions/authActions'

// Import the store
import store from './store'

// Import Components
import Navbar from './components/reusable-components/Navbar'
import Landing from './components/reusable-components/Landing'
import Register from './auth/Register'
import Login from './auth/Login'
import PrivateRoute from './components/private-route/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/user-profile/Profile'
import Announcements from './components/announcements/Announcements'
import Reflections from './components/reflections/Reflections'
import Resources from './components/resources/Resources'
import ManageProfiles from './components/user-profile/ManageProfiles'

// Import utils
import setAuthToken from './utils/setAuthToken'

if (localStorage.jwtToken) {
  // Get the JWT Token from storage and set the auth token
  const token = localStorage.jwtToken
  setAuthToken(token)

  // Decode the JWT to get the user model
  const decoded = jwt_decode(token)

  // Set the user to dispatch
  store.dispatch(setCurrentUser(decoded))

  // Token expiration check
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user to dispatch
    store.dispatch(logoutUser())
    window.location.href = './login'
  }
}

const App = (props) => {
  const { location } = props

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar location={location} />
          <Route
            exact
            path='/'
            component={Landing}
            key={document.location.href}
          />
          <Route
            exact
            path='/register'
            component={Register}
            key={document.location.href}
          />
          <Route
            exact
            path='/login'
            component={Login}
            key={document.location.href}
          />
          <Switch>
            <PrivateRoute
              exact
              path='/dashboard'
              component={Dashboard}
              key={document.location.href}
            />
            <PrivateRoute
              exact
              path='/reflections'
              component={Reflections}
              key={document.location.href}
            />
            <PrivateRoute
              exact
              path='/announcements'
              component={Announcements}
              key={document.location.href}
            />
            <PrivateRoute
              exact
              path='/resources'
              component={Resources}
              key={document.location.href}
            />
            <PrivateRoute
              exact
              path='/profile'
              component={Profile}
              key={document.location.href}
            />
            <PrivateRoute
              exact
              path='/manageProfiles'
              component={ManageProfiles}
              key={document.location.href}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
