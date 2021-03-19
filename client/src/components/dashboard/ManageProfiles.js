import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import ProfileCard from '../reusable-components/ProfileCard'
import jwt_decode from 'jwt-decode'
import { ListItem, List, GridList } from '@material-ui/core'

class ManageProfiles extends Component {
  state = {
    profiles: [],
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3000/api/usersManagement/listUsers`)
      .then((res) => {
        const profiles = res.data
        this.setState({ profiles })
      })
  }
  render() {
    const token = localStorage.getItem('jwtToken')
    const user = jwt_decode(token)
    const elements = [user, user, user, user, user]
    console.log(this.state.profiles)
    return (
      <GridList>
        {elements.map((value, index) => {
          return (
            <ListItem className='input-field col s12'>
              <ProfileCard user={user} />
            </ListItem>
          )
        })}
      </GridList>
    )
  }
}
ManageProfiles.propTypes = {}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default ManageProfiles
