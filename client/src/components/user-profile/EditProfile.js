import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import jwt_decode from "jwt-decode";
import "./Profile.css";
import {} from "react-router-dom";
import axios from "axios";
import baseURL from "../../baseURL";
import setAuthToken from "../../utils/setAuthToken";
import classnames from "classnames";
import LetterAvatars from "./LetterAvatar";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            errors: {},
        };
    }

    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }

    updateProfile = () => {
        const newProfileInfo = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };

        axios
            .post(baseURL + "/api/usersManagement/updateUser", newProfileInfo)
            .then((res) => {
                // Save to localStorage
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);

                // Set token to Auth header
                setAuthToken(token);

                // Decode token to get user data
                const decoded = jwt_decode(token);

                //redirect profile
                this.props.history.push("/profile");
            })
            .catch((err) => console.log(err));
    };

    render() {
        const { errors } = this.state;
        const token = localStorage.getItem("jwtToken");
        const user = jwt_decode(token);
        return (
            <div
                style={{
                    marginTop: "70px",
                    paddingBottom: "70px",
                    paddingTop: "10px",
                }}
            >
                <div
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "50vw",
                    }}
                >
                    <div className="col s8 push-s1">
                        <div class="section">
                            <h4 className="col s6 offset-s4 left-align">
                                <b>Profile</b>
                            </h4>
                            <form noValidate onSubmit={this.updateProfile}>
                                <div className="col s12 offset-s4 left-align">
                                    <h6>
                                        <p className="flow-text grey-text text-darken-1">
                                            <label htmlFor="firstname">
                                                First Name:{" "}
                                            </label>
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.firstname}
                                                error={errors.firstname}
                                                id="firstname"
                                                type="text"
                                                className={classnames("", {
                                                    invalid: errors.firstname,
                                                })}
                                            />
                                            <span className="red-text">
                                                {errors.firstname}
                                            </span>
                                        </p>
                                        <p className="flow-text grey-text text-darken-1">
                                            <label htmlFor="lastname">
                                                Last Name:{" "}
                                            </label>
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.lastname}
                                                error={errors.lastname}
                                                id="lastname"
                                                type="text"
                                                className={classnames("", {
                                                    invalid: errors.lastname,
                                                })}
                                            />
                                            <span className="red-text">
                                                {errors.lastname}
                                            </span>
                                        </p>
                                        <p className="flow-text grey-text text-darken-1">
                                            <label htmlFor="password">
                                                Password:{" "}
                                            </label>
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                error={errors.password}
                                                id="password"
                                                type="text"
                                                className={classnames("", {
                                                    invalid: errors.password,
                                                })}
                                            />
                                            <span className="red-text">
                                                {errors.password}
                                            </span>
                                        </p>
                                        <p className="flow-text grey-text text-darken-1">
                                            <label htmlFor="confirmPassword">
                                                Confirm Password:{" "}
                                            </label>
                                            <input
                                                onChange={this.onChange}
                                                value={
                                                    this.state.confirmPassword
                                                }
                                                error={errors.confirmPassword}
                                                id="confirmPassword"
                                                type="text"
                                                className={classnames("", {
                                                    invalid:
                                                        errors.confirmPassword,
                                                })}
                                            />
                                            <span className="red-text">
                                                {errors.confirmPassword}
                                            </span>
                                        </p>
                                    </h6>
                                </div>
                                <div
                                    className="col s12 offset-s4 left-align"
                                    onClick={this.updateProfile}
                                >
                                    <div
                                        style={{ letterSpacing: "1.5px" }}
                                        type="submit"
                                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Submit Edits
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
EditProfile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});
export default connect(mapStateToProps, { logoutUser })(EditProfile);
