import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import Access from "../components/Access-level-radio-button";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname:"",
      department: "",
      access: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  departmentList =[
    {
      id: 1,
      value: 'Mechanical and Aerospace Engineering (MAE)',
    },
    {
      id: 2,
      value: 'Civil, Coastal, and Environmental Engineering (ESSIE)',
    },
    {
      id: 3,
      value: 'Agricultural and Biological Engineering (ABE)',
    },
    {
      id: 4,
      value: 'Biomedical Engineering (BME)',
    },
    {
      id: 5,
      value: 'Chemical Engineering (CHEME)',
    },
    {
      id: 6,
      value: 'Computer and Information Science and Engineering (CISE)',
    },
    {
      id: 7,
      value: 'Electrical and Computer Engineering (ECE)',
    },
    {
      id: 8,
      value: 'Industrial and Systems Engineering (ISE)',
    },
    {
      id: 9,
      value: 'Materials Science and Engineering (MSE)',
    },
    {
      id: 10,
      value: 'Nuclear Engineering (NE)',
    },
  ]
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      department: this.state.department,
      access: this.state.access,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
console.log(newUser);
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
                </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.firstname}
                  error={errors.firstname}
                  id="firstname"
                  type="text"
                />
                <label htmlFor="firstname">First Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lastname}
                  error={errors.lastname}
                  id="lastname"
                  type="text"
                />
                <label htmlFor="lastname">Last Name</label>
              </div>
              <div className="input-field col s12">
                <select
                  onChange={this.onChange}
                  value={this.state.department}
                  error={errors.department}
                  id="department"
                />
                <Dropdown title="Select your department" items={this.departmentList} />
              </div>
              <div className="input-field col s12">
                <select
                  onChange={this.onChange}
                  value={this.state.access}
                  error={errors.access}
                  id="access"
                />
                <Access title="Select your Access Level" />
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;