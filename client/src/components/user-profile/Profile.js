import React from "react";
import jwt_decode from "jwt-decode";
import "./Profile.css";
import { Link } from "react-router-dom";
//import axios from 'axios'
//import baseURL from '../../baseURL'
//import setAuthToken from "../../utils/setAuthToken";\
import LetterAvatars from "./LetterAvatar";
import AnnouncementsCheckbox from "../reusable-components/email-announcements-checkbox";
import axios from "axios";
import baseURL from "../../baseURL";
import setAuthToken from "../../utils/setAuthToken";

const Profile = (props) => {
    const [state, setState] = React.useState({ user: {} });

    /*
    const [base64Image, setBase64Image] = React.useState("");
    const [imageType, setImageType] = React.useState("");
    */

    const handleToggle = () => {
        axios
            .post(baseURL + "/api/usersManagement/setOptOut", {
                email_opt_out: !state.user.email_opt_out,
            })
            .then((res) => {
                // Save to localStorage
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);

                // Set token to Auth header
                setAuthToken(token);

                //Set state
                setState((prevState) => ({
                    ...prevState,
                    user: jwt_decode(token),
                }));
            })
            .catch((err) => console.log(err));
    };

    React.useEffect(() => {
        //Checks for token updates on state change
        const token = localStorage.getItem("jwtToken");
        const newUser = jwt_decode(token);

        if (JSON.stringify(state.user) !== JSON.stringify(newUser)) {
            setState({ ...state, user: newUser });
        }
    });

    /*
    const _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        const prefix = "data:";
        const postfix = ";base64,"

        const base64ImageObj = prefix + imageType + postfix + btoa(binaryString);
        setBase64Image(base64ImageObj);

        setBase64Image((state) => {
            console.log(state);
        })
    }

    const onChange = (e) => {
        let file = e.target.files[0]

        const imageTypeObj = file.type;
        setImageType(imageTypeObj)

        setImageType((state) => {
            if(file) {
                const reader = new FileReader();
                reader.onload = _handleReaderLoaded.bind(this);
                reader.readAsBinaryString(file);
            }
        });
    }

    const onFileSubmit = (e) => {
        e.preventDefault();

        let imageObj = {
            image_data: base64Image
        };

        axios
            .post(baseURL + "/api/usersManagement/updateUser", imageObj)
            .then((res) =>{
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
            })
            .catch((err) => console.log(err)
        );
    }
    */

    return (
        <div
            style={{
                marginTop: "70px",
                width: "100vw",
                paddingRight: "50px",
                paddingTop: "20px",
                paddingBottom: "70px",
            }}
        >
            {/* <img src={state.user.image_data} id="profile-pic" alt="profile-pic" /> */}
            {/* <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}> */}
            {/* <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg"/> */}
            {/* <input type="submit" /> */}
            {/* </form> */}

            <div style={{ position: "relative" }}>
                <div
                    className="profile-container"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "15vw",
                    }}
                >
                    <div
                        className="avatar-container"
                        style={{ marginRight: "10vw" }}
                    >
                        <LetterAvatars name={state.user} />
                    </div>
                    <div class="Profile-Info-Container">
                        <h4>
                            <b>Profile</b>
                        </h4>
                        <div>
                            <h6>
                                <p>
                                    Name: {state.user.firstname}{" "}
                                    {state.user.lastname}
                                </p>
                                <p>Email: {state.user.email}</p>
                                <p>Department: {state.user.department}</p>
                                <p style={{ textTransform: "capitalize" }}>
                                    Access Level: {state.user.accessLevel}
                                </p>
                            </h6>
                            <Link
                                to="/editProfile"
                                style={{ letterSpacing: "1.5px" }}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="announcements-container">
                    <div
                        style={{
                            paddingTop: 50,
                            marginLeft: "calc(25vw + 250px)",
                        }}
                    >
                        <h4>
                            <b>Announcements Email Opt-in</b>
                        </h4>
                        <AnnouncementsCheckbox
                            checked={!state.user.email_opt_out}
                            handleToggle={handleToggle}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
