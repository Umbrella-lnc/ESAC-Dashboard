import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProfileCard from '../reusable-components/ProfileCard'
import jwt_decode from 'jwt-decode'
import { ListItem, List, GridList } from '@material-ui/core'

class ManageProfiles extends Component {
  render() {
    const token = localStorage.getItem('jwtToken')
    const user = jwt_decode(token)
    const elements = [user, user, user, user, user]
    console.log(user)
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
