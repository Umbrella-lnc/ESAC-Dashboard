import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../actions/authActions'
import classnames from 'classnames'
import Dropdown from '../components/Dropdown'
import Access from '../components/Access-level-radio-button'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      firstname: '',
      lastname: '',
      department: '',
      access: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    }
  }
  departmentList = [
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
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }
  changeAccess = (access_val) => {
    this.setState({ ...state, access: access_val })
  }
  onSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      department: this.state.department,
      access: this.state.access,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }
    this.props.registerUser(newUser, this.props.history)
  }
  render() {
    const { errors } = this.state
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s8 offset-s2'>
            <Link to='/' className='btn-flat waves-effect'>
              <i className='material-icons left'>keyboard_backspace</i> Back to
              home
            </Link>
            <div className='col s12' style={{ paddingLeft: '11.250px' }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className='grey-text text-darken-1'>
                Already have an account? <Link to='/login'>Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChange}
                  value={this.state.firstname}
                  error={errors.firstname}
                  id='firstname'
                  type='text'
                  className={classnames('', {
                    invalid: errors.firstname,
                  })}
                />
                <label htmlFor='firstname'>First Name</label>
                <span className='red-text'>{errors.firstname}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChange}
                  value={this.state.lastname}
                  error={errors.lastname}
                  id='lastname'
                  type='text'
                  className={classnames('', {
                    invalid: errors.lastname,
                  })}
                />
                <label htmlFor='lastname'>Last Name</label>
                <span className='red-text'>{errors.lastname}</span>
              </div>
              {/* <div className='input-field col s12'>
                <select
                  onChange={this.onChange}
                  value={this.state.department}
                  error={errors.department}
                  id='department'
                  className={classnames('', {
                    invalid: errors.department,
                  })}
                />
                <Dropdown
                  title='Select your department'
                  items={this.departmentList}
                />
                { <span className='red-text'>{errors.department}</span> }
              </div> */}
              <div className='input-field col s12'>
                <select
                  onChange={this.onChange}
                  value={this.state.access}
                  error={errors.access}
                  id='access'
                  //className={classnames('', {
                  //  invalid: errors.access,
                  //})}
                />
                <Access
                  title='Select your Access Level'
                  changeAccess={changeAccess}
                />
                {/* <span className='red-text'>{errors.access}</span> */}
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id='email'
                  type='email'
                  className={classnames('', {
                    invalid: errors.email,
                  })}
                />
                <label htmlFor='email'>Email</label>
                <span className='red-text'>{errors.email}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id='password'
                  type='password'
                  className={classnames('', {
                    invalid: errors.password,
                  })}
                />
                <label htmlFor='password'>Password</label>
                <span className='red-text'>{errors.password}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id='password2'
                  type='password'
                  className={classnames('', {
                    invalid: errors.password2,
                  })}
                />
                <label htmlFor='password2'>Confirm Password</label>
                <span className='red-text'>{errors.password2}</span>
              </div>
              <div className='col s12' style={{ paddingLeft: '11.250px' }}>
                <button
                  style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem',
                  }}
                  type='submit'
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})
export default connect(mapStateToProps, { registerUser })(withRouter(Register))
