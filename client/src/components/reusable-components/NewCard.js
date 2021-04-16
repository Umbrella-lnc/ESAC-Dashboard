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
        label: '',
        description: '',
        due: '',
        name: '',
    })

    const { updateCards } = props

    const [newCardOpen, setNewCardOpen] = React.useState(false)

    const handleNewCardOpen = () => {
        setNewCardOpen(true)
    }

    const handleNewCardClose = () => {
        setNewCardOpen(false)
    }

    const handleNameChange = (event) => {
        setState({
            ...state,
            name: event.target.value,
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

    function handleAddCard() {
        console.log(state.colId)
        console.log(state.name)
        console.log(state.description)
        axios
            .post(baseURL + '/api/trello/addCard', {
                idList: state.colId,
                name: state.name,
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
                due={state.due}
                name={state.name}
                label={state.label}
                handleAddCard={handleAddCard}
                handleColumnChange={handleColumnChange}
            ></NewCardPopUp>
        </div>
    )
}
