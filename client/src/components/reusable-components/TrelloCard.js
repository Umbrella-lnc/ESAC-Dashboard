import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { CardActionArea, List } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Modal'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import { useStyles } from './cardStyles'
import baseURL from '../../baseURL'

export default function TrelloCard(props) {
    const classes = useStyles()

    const name = props.cardInfo.name
    const description = props.cardInfo.desc
    const colName = props.colName
    const cardId = props.cardInfo.id
    const { updateCards } = props

    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false)
    const [cardDetailsOpen, setCardDetailsOpen] = React.useState(false)

    const [state, setState] = React.useState({
        column: colName,
    })

    var due = String(props.cardInfo.due)
    if (due.length > 6) {
        due =
            due.substring(5, 7) +
            '/' +
            due.substring(8, 10) +
            '/' +
            due.substring(2, 4)
    } else {
        due = 'No due date'
    }

    var label = 'Labels:'
    if (props.cardInfo.labels.length > 0) {
        for (var i = 0; i < props.cardInfo.labels.length; i++) {
            if (i != 0) {
                label = label + ','
            }
            label = label + ' ' + props.cardInfo.labels[i].name
        }
    } else {
        label = 'No Labels'
    }

    const handleConfirmDeleteOpen = () => {
        setConfirmDeleteOpen(true)
    }

    const handleConfirmDeleteClose = () => {
        setConfirmDeleteOpen(false)
    }

    const handleCardDetailsOpen = () => {
        setCardDetailsOpen(true)
    }

    const handleCardDetailsClose = () => {
        setCardDetailsOpen(false)
    }

    function handleDelete() {
        axios
            .post(baseURL + '/api/trello/deleteCard', {
                cardId: cardId,
            })
            .then(function (res) {
                //Set cards with setState to avoid window reload
                updateCards()
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

    const handleChange = (event) => {
        setState({
            ...state,
            column: event.target.value,
        })
    }

    function handleChangeColumn() {
        var idList = ''
        console.log('state name')
        console.log(state.column)
        console.log('colName')
        console.log(colName)
        if (state.column != colName) {
            console.log('hello')
            if (state.column == 'toDo') {
                console.log('to do')
                idList = '60638369236486515ccc1ec8'
            } else if (state.column == 'doing') {
                console.log('yep')
                idList = '6063836bf49a2c5dc7e08dc6'
            } else {
                idList = '6063836cce7e3326413eb0f2'
            }
            console.log(idList)
            axios
                .post(baseURL + '/api/trello/editCard', {
                    action: 'changeColumn',
                    cardId: cardId,
                    idList: idList,
                })
                .then(function (res) {
                    updateCards()
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
    }

    return (
        <div>
            <Card className={classes.root} raised={true}>
                <CardActionArea onClick={handleConfirmDeleteOpen}>
                    <CardContent className={classes.content}>
                        <Typography
                            className={classes.title}
                            color='textSecondary'
                            gutterBottom
                        >
                            {due}
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            {name}
                        </Typography>
                        <Typography
                            className={classes.pos}
                            color='textSecondary'
                        >
                            {label}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Dialog open={confirmDeleteOpen} onClose={handleConfirmDeleteClose}>
                <div className={classes.paper}>
                    <h3 style={{ color: 'black' }}>{name}</h3>
                    <ul className={classes.subHeadingList}>
                        <h6
                            className={classes.listItem}
                            style={{ color: 'black' }}
                        >
                            {label}
                        </h6>
                        <h6
                            className={classes.listItem}
                            style={{ color: 'black' }}
                        >
                            {due}
                        </h6>
                    </ul>
                    <h6 style={{ color: 'black' }}>{description}</h6>

                    <div className='selectRow'>
                        <Select
                            native
                            value={state.column}
                            onChange={handleChange}
                            inputProps={{
                                name: state.column,
                                id: 'age-native-simple',
                            }}
                        >
                            <option value={'toDo'}>To Do</option>
                            <option value={'doing'}>Doing</option>
                            <option value={'done'}>Done</option>
                        </Select>
                        <Button
                            onClick={handleChangeColumn}
                            className={classes.skinnyDeleteButton}
                            size='small'
                        >
                            Update Status
                        </Button>
                    </div>
                    <Button
                        onClick={handleCardDetailsOpen}
                        className={classes.deleteButton}
                        size='small'
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={handleConfirmDeleteClose}
                        className={classes.deleteButton}
                        size='small'
                    >
                        Close
                    </Button>
                </div>
            </Dialog>
            <Dialog open={cardDetailsOpen} onClose={handleCardDetailsClose}>
                <div className={classes.paper}>
                    <h5 style={{ color: 'black' }}>
                        Are you sure you would like to delete this task?
                    </h5>
                    <Button
                        onClick={handleDelete}
                        className={classes.deleteButton}
                        size='small'
                    >
                        yes
                    </Button>
                    <Button
                        onClick={handleCardDetailsClose}
                        className={classes.deleteButton}
                        size='small'
                    >
                        No
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}
