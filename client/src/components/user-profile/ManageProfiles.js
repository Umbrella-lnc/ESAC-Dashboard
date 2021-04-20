import React from 'react'
import axios from 'axios'
import ProfileCard from '../reusable-components/ProfileCard'
import { ListItem, GridList } from '@material-ui/core'
import baseURL from '../../baseURL'

const ManageProfiles = (props) => {
    const [state, setState] = React.useState({
        profiles: [],
        modalOpen: false,
    })
    React.useEffect(() => {
        getProfiles()
    }, [])

    const getProfiles = () => {
        axios.get(baseURL + `/api/usersManagement/listUsers`).then((res) => {
            const profiles = res.data
            setState((prevState) => ({ ...prevState, profiles: profiles }))
        })
    }

    return (
        <div>
            <GridList cols={3} spacing={15} style={{ padding: 80 }}>
                {state.profiles.map((value, index) => {
                    return (
                        <ListItem key={index} className='input-field col s12'>
                            <ProfileCard
                                user={value}
                                window={window}
                                deleteProfileFunction={getProfiles}
                            />
                        </ListItem>
                    )
                })}
            </GridList>
        </div>
    )
}

export default ManageProfiles
