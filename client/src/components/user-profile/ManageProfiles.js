import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import ProfileCard from '../reusable-components/ProfileCard'
import jwt_decode from 'jwt-decode'
import { ListItem, List, GridList } from '@material-ui/core'
import baseURL from '../../baseURL'

class ManageProfiles extends Component {
    state = {
        profiles: [],
        modalOpen: false,
    }
    componentDidMount() {
        const token = localStorage.getItem('jwtToken')
        const user = jwt_decode(token)
        axios.get(baseURL + `/api/usersManagement/listUsers`).then((res) => {
            const profiles = res.data
            console.log(res)
            this.setState({ profiles })
        })
    }
    render() {
        const token = localStorage.getItem('jwtToken')
        const user = jwt_decode(token)
        return (
            <div>
                <GridList cols={3} spacing={15} style={{ padding: 80 }}>
                    {this.state.profiles.map((value, index) => {
                        return (
                            <ListItem className='input-field col s12'>
                                <ProfileCard user={value} window={window} />
                            </ListItem>
                        )
                    })}
                </GridList>
            </div>
        )
    }
}
ManageProfiles.propTypes = {}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default ManageProfiles
