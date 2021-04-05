import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import jwt_decode from "jwt-decode"
import "./Profile.css"
import ProfileIcon from '../../image/profile-icon.jpg'


class EditProfile extends Component {
  onLogoutClick = (e) => {
    e.preventDefault()
    this.props.logoutUser()
  }
  render() {
    const token = localStorage.getItem("jwtToken");
    const user = jwt_decode(token)
    return (
      <div style={{ height: '75vh' }} className='container valign-wrapper'>
        <div class="row">
            <div className="col s2">
              <img class="img" src={ProfileIcon} width="400" length="500"></img>
            </div>
            <div className="col s8 push-s1">
            <div class="section">
              <h4 className='col s6 offset-s4 left-align'>
                <b>Profile</b> 
              </h4>
              <div className='col s12 offset-s4 left-align'>
                <h6>
                  <p className='flow-text grey-text text-darken-1'>
                    Name: {user.firstname} {user.lastname}
                  </p>
                  <p className='flow-text grey-text text-darken-1'>
                    Email: {user.email}
                  </p>
                  <p className='flow-text grey-text text-darken-1'>
                    Department: {user.department}
                  </p>
                  <p className='flow-text grey-text text-darken-1'>
                    Access Level: {user.accessLevel}
                  </p>
                </h6>
                <button
                    style={{
                      width: '170px',
                      borderRadius: '3px',
                      letterSpacing: '1.5px',
                      marginTop: '1rem',
                    }}
                    //onClick={}
                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                    Done
                  </button>
              </div>
            </div>
          </div> 
        </div>
      </div>
      
    )
  }
}
EditProfile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { logoutUser })(EditProfile)
