import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import baseURL from '../../baseURL'
import { CardActionArea, List } from '@material-ui/core'
import NewCardPopUp from './NewCardPopUp'
import { CollectionsOutlined } from '@material-ui/icons'

const useStyles = makeStyles({
    root: {
        width: '300px',
        height: '50px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        background: '#e6e5d5',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    content: {
        justifyContent: 'space-between',
        maxWidth: 150,
    },
})

export default function NewCard(props) {
    const classes = useStyles()

    const [state, setState] = React.useState({
        colId: props.colId,
        description: '',
        due: '',
        name: '',
        errors: '',
    })

    const { updateCards } = props

    const [newCardOpen, setNewCardOpen] = React.useState(false)
    const handleNewCardOpen = () => {
        setNewCardOpen(true)
    }

    const handleNewCardClose = () => {
        setState({
            ...state,
            name: '',
            description: '',
            due: '',
            errors: '',
        })
        setNewCardOpen(false)
    }

    const handleNameChange = (event) => {
        setState({
            ...state,
            name: event.target.value,
        })
    }

    const handleDueChange = (event) => {
        setState({
            ...state,
            due: event.target.value,
        })
    }

    const handleColumnChange = (event) => {
        setState({
            ...state,
            column: event.target.value,
        })
    }

    const handleDescriptionChange = (event) => {
        setState({
            ...state,
            description: event.target.value,
        })
    }

    function isValidDate(dateString) {
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false

        // Parse the date parts to integers
        var parts = dateString.split('/')
        var day = parseInt(parts[1], 10)
        var month = parseInt(parts[0], 10)
        var year = parseInt(parts[2], 10)

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12) return false

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1]
    }

    function handleAddCard() {
        console.log(state.colId)
        console.log(state.name)
        console.log(state.description)
        if ((!isValidDate(state.due) && state.due != '') || state.name == '') {
            if (!isValidDate(state.due) && state.due != '') {
                setState({
                    ...state,
                    errors: 'invalid date',
                })
            }
            if (state.name == '') {
                setState({
                    ...state,
                    errors: 'you must include a name',
                })
            }
            return
        }

        var formattedDue = ''
        if (state.due != '') {
            formattedDue =
                state.due.slice(6, state.due.length) +
                '-' +
                state.due.slice(0, 2) +
                '-' +
                state.due.slice(3, 5) +
                'T20:56:00.000Z'
        }
        axios
            .post(baseURL + '/api/trello/addCard', {
                idList: state.colId,
                name: state.name,
                due: formattedDue,
                description: state.description,
            })
            .then(function (res) {
                updateCards()
                handleNewCardClose()
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

    return (
        <div>
            <Card className={classes.root} raised={true}>
                <CardActionArea onClick={handleNewCardOpen}>
                    <Typography
                        variant='h5'
                        component='h2'
                        style={{ margin: '10px 10px 10px 10px' }}
                    >
                        Add New Card...
                    </Typography>
                </CardActionArea>
            </Card>
            <NewCardPopUp
                handleNewCardClose={handleNewCardClose}
                handleNameChange={handleNameChange}
                handleDescriptionChange={handleDescriptionChange}
                newCardOpen={newCardOpen}
                colId={state.colId}
                description={state.description}
                errors={state.errors}
                due={state.due}
                name={state.name}
                handleAddCard={handleAddCard}
                handleDueChange={handleDueChange}
                handleColumnChange={handleColumnChange}
            ></NewCardPopUp>
        </div>
    )
}
