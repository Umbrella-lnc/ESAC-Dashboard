import React from 'react'
import jwt_decode from "jwt-decode"
import "./Profile.css"
import { Link } from "react-router-dom";
import axios from 'axios'
import baseURL from '../../baseURL'
import setAuthToken from "../../utils/setAuthToken";

const Profile = (props) => {
  
    const [state, setState] = React.useState({
        base64Image: "",
        imageType: "",
        user: {},
    });
  
    React.useEffect(()=> {
        const token = localStorage.getItem("jwtToken");
        const newUser = jwt_decode(token);

        if(JSON.stringify(state.user) !== JSON.stringify(newUser)) {
            setState({...state, user: newUser});
        }
    })

    const _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        const prefix = "data:";
        const postfix = ";base64,"

        setState({...state, base64Image: prefix + state.imageType + postfix + btoa(binaryString) });
    }

    const onChange = (e) => {
        let file = e.target.files[0]
        console.log(file);
        setState({...state, imageType: file.type });
        if(file) {
            const reader = new FileReader();
            reader.onload = _handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    const onFileSubmit = (e) => {
        e.preventDefault();

        let imageObj = {
            image_data: state.base64Image
        };

        axios
            .post(baseURL + "/api/usersManagement/updateUser", imageObj)
            .then((res) =>{
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                setState({...state, user: jwt_decode(token) });
            })
            .catch((err) => console.log(err)
        );
    }

    return (
        <div style={{ height: '75vh' }} className='container valign-wrapper'>
        <div class="row">
            <div className="col s2">
                <img src={state.user.image_data} id="profile-pic" alt="profile-pic" />
                <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
                <input
                    type="file"
                    name="image"
                    id="file"
                    accept=".jpeg, .png, .jpg"
                />
                <input type="submit" />
                </form>
                
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
    );
}


export default Profile;
