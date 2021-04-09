import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import "./Profile.css"
import ProfileIcon from '../../image/profile-icon.jpg'
import { Link, withRouter } from "react-router-dom";

import classnames from "classnames";

import { registerUser } from '../../actions/authActions';

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            department: "",
            email: "",
            password: "",
            confirmPassword: "",
            errors: {},
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };



    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            department: this.state.department,
            accessLevel: this.state.access,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
                  <div className="container">
                    <div className="col s2">
                      <img class="img" src={ProfileIcon} width="400" length="500"></img>
                    </div>
                    <h4 className='col s6 offset-s4 left-align'>
                      <b>Profile</b> 
                    </h4>
                    <div>
                    <div className="col s8 offset-s2">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
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
                                <label htmlFor="firstname">First Name</label>
                                <span className="red-text">
                                    {errors.firstname}
                                </span>
                            </div>
                            <div className="input-field col s12">
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
                                <label htmlFor="lastname">Last Name</label>
                                <span className="red-text">
                                    {errors.lastname}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email,
                                    })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password,
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">
                                    {errors.password}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.confirmPassword}
                                    error={errors.confirmPassword}
                                    id="confirmPassword"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.confirmPassword,
                                    })}
                                />
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <span className="red-text">
                                    {errors.confirmPassword}
                                </span>
                            </div>
                            <div>
                                
                              <Link to="/profile"                   
                              style={{letterSpacing: '1.5px'}}
                              className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                              >
                                Done
                              </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

EditProfile.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(EditProfile));


