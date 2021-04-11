import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import { List } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Modal'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import { trelloURL } from '../../trelloURL'
import { trelloKey, trelloToken } from '../../trelloProfileInfo'

const useStyles = makeStyles({
    root: {
        width: '300px',
        height: '140px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    buttonContainer: {
        justifyContent: 'space-between',
        width: 100,
    },
    content: {
        justifyContent: 'space-between',
        maxWidth: 150,
    },
    activateButton: {
        width: '100%',
        color: 'blue',
    },
    deleteButton: {
        position: '-webkit-sticky',
        position: 'sticky',
        top: 0,
        width: '100%',
        color: 'blue',
        marginTop: '10px',
        marginBottom: '10px',
    },
    paper: {
        borderRadius: '5px',
        position: 'absolute',
        left: '50%',
        right: '50%',
        top: '20%',
        transform: 'translate(-50%, 50%)',
        textAlign: 'center',

        width: 600,
        backgroundColor: 'white',
        outline: 'none',
    },
})

export default function TrelloCard(props) {
    const classes = useStyles()
    const name = props.cardInfo.name
    const description = props.cardInfo.desc
    const colName = props.colName
    const cardId = props.cardInfo.id

    const [open, setOpen] = React.useState(false)

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

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    function handleDelete() {
        axios
            .delete(
                trelloURL +
                    'cards/' +
                    cardId +
                    '?key=' +
                    trelloKey +
                    '&' +
                    'token=' +
                    trelloToken
            )
            .then(function (res) {
                handleClose()
                window.location.reload()
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
                .put(
                    trelloURL +
                        'cards/' +
                        cardId +
                        '?key=' +
                        trelloKey +
                        '&' +
                        'token=' +
                        trelloToken +
                        '&' +
                        'idList=' +
                        idList
                )
                .then(function (res) {
                    handleClose()
                    window.location.reload()
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

    const dialogSubheading = label + '        Due Date: ' + due

    return (
        <div>
            <Card className={classes.root} raised={true}>
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
                    <Typography className={classes.pos} color='textSecondary'>
                        {label}
                    </Typography>
                </CardContent>
                <CardActions className={classes.buttonContainer}>
                    <List>
                        <Button
                            variant='contained'
                            className={classes.deleteButton}
                            size='small'
                            onClick={handleOpen}
                        >
                            More Info
                        </Button>
                    </List>
                </CardActions>
            </Card>
            <Dialog open={open} onClose={handleClose}>
                <div className={classes.paper}>
                    <h3 style={{ color: 'black' }}>{name}</h3>
                    <h6 style={{ color: 'black' }}>{dialogSubheading}</h6>
                    <h6 style={{ color: 'black' }}>{description}</h6>

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
                        className={classes.deleteButton}
                        size='small'
                    >
                        HandleSelect
                    </Button>

                    <Button
                        onClick={handleClose}
                        className={classes.deleteButton}
                        size='small'
                    >
                        Close
                    </Button>
                    <Button
                        onClick={handleDelete}
                        className={classes.deleteButton}
                        size='small'
                    >
                        Delete
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}
