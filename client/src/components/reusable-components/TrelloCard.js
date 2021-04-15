import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { CardActionArea, List } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Modal'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import { useStyles } from './cardStyles'
import baseURL from '../../baseURL'
import DeletePopUp from './DeletePopUp'
import MoreInfoPopUp from './MoreInfoPopUp'
import EditCardPopUp from './EditCardPopUp'

export default function TrelloCard(props) {
    const classes = useStyles()

    const name = props.cardInfo.name
    const description = props.cardInfo.desc
    const colName = props.colName
    const cardId = props.cardInfo.id
    const { updateCards } = props

    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState()
    const [cardDetailsOpen, setCardDetailsOpen] = React.useState(false)
    const [editCardOpen, setEditCardOpen] = React.useState(false)

    var due = String(props.cardInfo.due)
    if (due.length > 6) {
        due =
            due.substring(5, 7) +
            '/' +
            due.substring(8, 10) +
            '/' +
            due.substring(2, 4)
    } else {
        due = 'No Due Date'
    }

    var label = 'Labels:'
    var labelShort = ''
    if (props.cardInfo.labels.length > 0) {
        for (var i = 0; i < props.cardInfo.labels.length; i++) {
            if (i != 0) {
                label = label + ','
            }
            label = label + ' ' + props.cardInfo.labels[i].name
        }
        labelShort = label.slice(8, label.length)
    } else {
        label = 'No Labels'
        labelShort = 'No Labels'
    }

    const [state, setState] = React.useState({
        column: colName,
        labels: String(props.cardInfo.labels),
        description: String(description),
        dueDate: due,
        name: name,
    })

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

    const handleEditCardOpen = () => {
        setEditCardOpen(true)
    }

    const handleEditCardClose = () => {
        setEditCardOpen(false)
        setCardDetailsOpen(true)
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

    const handleEditCard = () => {
        handleCardDetailsClose()
        handleEditCardOpen()
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
                <CardActionArea onClick={handleCardDetailsOpen}>
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
            <MoreInfoPopUp
                handleEditCard={handleEditCard}
                handleCardDetailsClose={handleCardDetailsClose}
                cardDetailsOpen={cardDetailsOpen}
                labelShort={labelShort}
                due={due}
                description={description}
                column={state.column}
                name={name}
            ></MoreInfoPopUp>
            <DeletePopUp
                confirmDeleteOpen={confirmDeleteOpen}
                handleConfirmDeleteClose={handleConfirmDeleteClose}
                handleDelete={handleDelete}
            ></DeletePopUp>
            <EditCardPopUp
                editCardOpen={editCardOpen}
                handleEditCardClose={handleEditCardClose}
                name={name}
                handleConfirmDeleteOpen={handleConfirmDeleteOpen}
                column={state.column}
                dueDate={state.dueDate}
                description={state.description}
                handleChange={handleChange}
                labels={state.labels}
            ></EditCardPopUp>
        </div>
    )
}
