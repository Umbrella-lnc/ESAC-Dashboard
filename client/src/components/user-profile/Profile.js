import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import jwt_decode from "jwt-decode"
import "./Profile.css"
import ProfileIcon from '../../image/profile-icon.jpg'
import { Link } from "react-router-dom";
import axios from 'axios'

const API_URL = "http://localhost:3000";

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      multerImage: ProfileIcon,
   
    }
  }

  setDefaultImage(uploadType) {
    if (uploadType === "multer") {
      this.setState({
        multerImage: ProfileIcon
      });
    }
  }

  onLogoutClick = (e) => {
    e.preventDefault()
    this.props.logoutUser()
  }

  uploadImage(e, method) {

    if (method === "multer") {

      let imageFormObj = new FormData();

      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer
      this.setState({
        multerImage: URL.createObjectURL(e.target.files[0])
      });

      axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully uploaded using multer");
            this.setDefaultImage("multer");
          }
        })
        .catch((err) => {
          alert("Error while uploading image using multer");
          this.setDefaultImage("multer");
        });
    } 
  }

  uploadImage(e, method){
    if(method === "multer") {
      
      let imageFormObj = new FormData();

      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);

      //image being uploaded using multer, stores readable instance
      this.setState({
        multerImage: URL.createObjectURL(e.target.files[0])
      });

      axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
        .then((data) => {
          if(data.data.success){
            alert("Profile Pic Uploaded.");
            this.setDefaultImage("multer");
          }
        })
        .catch((err) => {
          alert("Error while uploading Profile Pic");
          this.setDefaultImage("multer");
        });
    }
  }

  render() {
    const token = localStorage.getItem("jwtToken");
    const user = jwt_decode(token)
    return (
      <div style={{ height: '75vh' }} className='container valign-wrapper'>
        <div class="row">
            <div className="col s2">
              <img src={this.state.multerImage} alt="upload-image" className="process-profile-pic"/>
              <input type="file" style={{marginTop: 180}} className="upload-profile-pic" onChange={(e) => this.uploadImage(e, "multer")} />
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
}
Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { logoutUser })(Profile)
