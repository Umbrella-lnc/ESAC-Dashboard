import React, { Component } from 'react'
import axios from 'axios'
import { List, ListItem } from '@material-ui/core'
import TrelloCard from '../reusable-components/TrelloCard'
import ColumnLabel from '../reusable-components/ColumnLabel'
import baseURL from '../../baseURL'

const Dashboard = (props) => {
    const [state, setState] = React.useState({
        toDo: [],
        doing: [],
        done: [],
        loading: true,
    })

    const getToDos = () => {
        axios
            .post(baseURL + '/api/trello/getCards', {
                listId: '60638369236486515ccc1ec8',
            })
            .then((res) => {
                console.log(res)
                const toDo = res.data

                setState((prevState) => ({ ...prevState, toDo: toDo }))
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

    const getDoing = () => {
        axios
            .post(baseURL + '/api/trello/getCards', {
                listId: '6063836bf49a2c5dc7e08dc6',
            })
            .then((res) => {
                console.log(res)
                const doing = res.data

                setState((prevState) => ({ ...prevState, doing: doing }))
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

    const getDone = () => {
        axios
            .post(baseURL + '/api/trello/getCards', {
                listId: '6063836cce7e3326413eb0f2',
            })
            .then((res) => {
                console.log(res)
                const done = res.data
                setState((prevState) => ({ ...prevState, done: done }))
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

    const getCards = () => {
        getToDos()
        getDoing()
        getDone()
    }

    React.useEffect(() => {
        getCards()
    }, [])

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

                        {state.toDo.map((value, index) => {
                            return (
                                <ListItem
                                    key={value.id}
                                    className='input-field col s12'
                                >
                                    <TrelloCard
                                        cardInfo={value}
                                        colName={'To Do'}
                                        updateCards={getCards}
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
                        {state.doing.map((value, index) => {
                            return (
                                <ListItem
                                    key={value.id}
                                    className='input-field col s12'
                                >
                                    <TrelloCard
                                        cardInfo={value}
                                        colName={'Doing'}
                                        updateCards={getCards}
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
                        {state.done.map((value, index) => {
                            return (
                                <ListItem
                                    key={value.id}
                                    className='input-field col s12'
                                >
                                    <TrelloCard
                                        cardInfo={value}
                                        colName={'Done'}
                                        updateCards={getCards}
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

export default Dashboard
