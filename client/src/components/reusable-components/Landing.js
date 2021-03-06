import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

class Landing extends Component {
  render() {
    const subheadingStyle = {
      fontFamily: 'monospace',
      fontSize: 15,
    }
    return (
      <div style={{ height: '75vh' }} className='container valign-wrapper'>
        <div className='row'>
          <div className='col s12 center-align'>
            <h4>
              <b>Empowering Engineers!</b>
              <p></p>
              <span style={{ subheadingStyle }}>
                Undergraduate Engineering Student Advisory Council
              </span>
            </h4>
            <p className='flow-text grey-text text-darken-1'>
              A bridge between the Engineering Department and student body.
            </p>
            <br />
            <div className='col s6'>
              <BrowserRouter>
                <Link
                  to='/register'
                  style={{
                    width: '140px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                >
                  Register
                </Link>
              </BrowserRouter>
            </div>
            <div className='col s6'>
              <BrowserRouter>
                <Link
                  to='/login'
                  style={{
                    width: '140px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  className='btn btn-large btn-flat waves-effect white black-text'
                >
                  Log In
                </Link>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Landing
