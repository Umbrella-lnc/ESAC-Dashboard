import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Navbar from './components/reusable-components/Navbar'
import Landing from './components/reusable-components/Landing'
import Register from './auth/Register'
import Login from './auth/Login'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </div>
        </Router>
      </Provider>
    )
  }
}
export default App
