import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { trelloURL, toDoList, doneList, doingList } from '../../trelloURL'
import { trelloKey, trelloToken } from '../../trelloProfileInfo'
import { logoutUser } from '../../actions/authActions'
import { List, ListItem } from '@material-ui/core'
import TrelloCard from '../reusable-components/TrelloCard'
import ColumnLabel from '../reusable-components/ColumnLabel'
import baseURL from '../../baseURL'

class Dashboard extends Component {
    state = {
        toDo: [],
        doing: [],
        done: [],
    }

    componentDidMount() {
        axios
            .post(baseURL + '/api/trello/getCards', {
                listId: '60638369236486515ccc1ec8',
            })
            .then((res) => {
                console.log(res)
                const toDo = res.data
                this.setState({ toDo })
            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message)
                }
            })
        axios
            .post(baseURL + '/api/trello/getCards', {
                listId: '6063836bf49a2c5dc7e08dc6',
            })
            .then((res) => {
                console.log(res)
                const doing = res.data
                this.setState({ doing })
            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message)
                }
            })
        axios
            .post(baseURL + '/api/trello/getCards', {
                listId: '6063836cce7e3326413eb0f2',
            })
            .then((res) => {
                console.log(res)
                const done = res.data
                this.setState({ done })
            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message)
                }
            })
    }

    render() {
        const toDoHeader = { name: 'To Do' }
        const doingHeader = { name: 'Doing' }
        const doneHeader = { name: 'Done' }

        const horiList = {
            display: 'flex',
            flexDirection: 'row',
            padding: 0,
            alignContent: 'flex-start',
            alignItems: 'flex-start',
        }
        const vertiList = {
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
        }
        const mainContainer = {
            padding: 100,
        }
        const header = {
            paddingLeft: '28px',
        }
        const subheader = {
            paddingLeft: '32px',
        }

        return (
            <div style={mainContainer}>
                <h1 style={header}>Tasks</h1>
                <h5 style={subheader}>Imported From trello</h5>
                <List style={horiList}>
                    <ListItem>
                        <List style={vertiList}>
                            <ListItem className='input-field col s12'>
                                <ColumnLabel cardInfo={toDoHeader} />
                            </ListItem>

                            {this.state.toDo.map((value, index) => {
                                return (
                                    <ListItem className='input-field col s12'>
                                        <TrelloCard
                                            cardInfo={value}
                                            colName={'toDo'}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </ListItem>
                    <ListItem>
                        <List style={vertiList}>
                            <ListItem className='input-field col s12'>
                                <ColumnLabel cardInfo={doingHeader} />
                            </ListItem>
                            {this.state.doing.map((value, index) => {
                                return (
                                    <ListItem className='input-field col s12'>
                                        <TrelloCard
                                            cardInfo={value}
                                            colName={'doing'}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </ListItem>
                    <ListItem>
                        <List style={vertiList}>
                            <ListItem className='input-field col s12'>
                                <ColumnLabel cardInfo={doneHeader} />
                            </ListItem>
                            {this.state.done.map((value, index) => {
                                return (
                                    <ListItem className='input-field col s12'>
                                        <TrelloCard
                                            cardInfo={value}
                                            colName={'done'}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </ListItem>
                </List>
            </div>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Dashboard)
