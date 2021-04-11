import React, { Component, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import jwt_decode from "jwt-decode"
import "./Profile.css"
import ProfileIcon from '../../image/profile-icon.jpg'
import { Link } from "react-router-dom";
import axios from 'axios'

const API_URL = "http://localhost:3000";

const Profile = (props) => {

  const [state, setState] = React.useState({
    multerImage: ProfileIcon,
    user: {},
  })

  React.useEffect(()=> {
      const token = localStorage.getItem("jwtToken");
      const newUser = jwt_decode(token);
      console.log(state.user)
      console.log(newUser)
      if(JSON.stringify(state.user) !== JSON.stringify(newUser)) {
        setState({...state, user: newUser})
      }
  })

  const setDefaultImage = (uploadType) => {
    if (uploadType === "multer") {
      setState({
        multerImage: ProfileIcon
      });
    }
  }


  const uploadImage = (e, method) => {

    if (method === "multer") {

      let imageFormObj = new FormData();

      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer
      setState({
        multerImage: URL.createObjectURL(e.target.files[0])
      });

      axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully uploaded using multer");
            setDefaultImage("multer");
          }
        })
        .catch((err) => {
          alert("Error while uploading image using multer");
          setDefaultImage("multer");
        });
    } 
  }

    return (
      <div style={{ height: '75vh' }} className='container valign-wrapper'>
        <div class="row">
            <div className="col s2">
              <img src={state.multerImage} alt="upload-image" className="process-profile-pic"/>
              <input type="file" style={{marginTop: 180}} className="upload-profile-pic" onChange={(e) => uploadImage(e, "multer")} />
            </div>
            <div className="col s8 push-s1">
            <div class="section">
              <h4 className='col s6 offset-s4 left-align'>
                <b>Profile</b> 
              </h4>
              <div className='col s12 offset-s4 left-align'>
                <h6>
                  <p className='flow-text grey-text text-darken-1'>
                    Name: {state.user.firstname} {state.user.lastname}
                  </p>
                  <p className='flow-text grey-text text-darken-1'>
                    Email: {state.user.email}
                  </p>
                  <p className='flow-text grey-text text-darken-1'>
                    Department: {state.user.department}
                  </p>
                  <p className='flow-text grey-text text-darken-1'>
                    Access Level: {state.user.accessLevel}
                  </p>
                </h6>
                  <Link to="/editProfile"                   
                    style={{letterSpacing: '1.5px'}}
                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                    >
                      Edit Profile
                  </Link>
              </div>
            </div>
            <div class="section">
              <h4 className='col s6 offset-s4 left-align'>
                <b>User Management</b> 
              </h4>
              <div className='col s6 push-s4'>
                  <Link to="/manageProfiles"                   
                  style={{letterSpacing: '1.5px'}}
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                  >
                    Manage Profiles
                  </Link>
              </div>
            </div>
          </div> 
        </div>
      </div>
      
    )
  }


export default Profile;
