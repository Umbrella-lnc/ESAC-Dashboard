import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import Dialog from '@material-ui/core/Modal'
import baseURL from '../../baseURL'
import axios from 'axios'
import { List } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        width: '300px',
        height: '140px',
        margin: '20px 20px 20px 20px',
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

        width: 400,
        backgroundColor: 'white',
        outline: 'none',
    },
})

export default function ProfileCard(props) {
    const classes = useStyles()
    const firstName = props.user.firstname
    const lastName = props.user.lastname
    const active = props.user.active
    const email = props.user.email
    const access = props.user.accessLevel
    const window = props.window
    const userContainer = {
        email: email,
    }
    const [confirmOpen, setConfirmOpen] = React.useState(false)
    const [moreDetailsOpen, setMoreDetailsOpen] = React.useState(false)

    const handleConfirmOpen = () => {
        setConfirmOpen(true)
    }

    const handleConfirmClose = () => {
        setConfirmOpen(false)
    }

    const handleMoreDetailsOpen = () => {
        setMoreDetailsOpen(true)
    }

    const handleMoreDetailsClose = () => {
        setMoreDetailsOpen(false)
    }

    function handleDelete() {
        axios.post(baseURL + `/api/usersManagement/deleteUser`, userContainer)
        window.location.reload(true)
        handleConfirmClose()
    }

    function handleVerify() {
        axios.post(
            baseURL + '/api/usersManagement/toggleVerifiedStatus',
            userContainer
        )
        window.location.reload(true)
    }

    return (
        <div>
            <Card className={classes.root} raised={true}>
                <CardContent className={classes.content}>
                    <CardActionArea onClick={handleMoreDetailsOpen}>
                        <Typography
                            className={classes.title}
                            color='textSecondary'
                            gutterBottom
                        >
                            {access}
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            {firstName}
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            {lastName}
                        </Typography>
                    </CardActionArea>
                </CardContent>
                <CardActions className={classes.buttonContainer}>
                    <List>
                        <Button
                            className={classes.deleteButton}
                            size='small'
                            onClick={handleConfirmOpen}
                        >
                            Delete
                        </Button>
                        {active == false && (
                            <Button
                                className={classes.activateButton}
                                size='small'
                                onClick={handleVerify}
                            >
                                Activate
                            </Button>
                        )}
                    </List>
                </CardActions>
            </Card>
            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <div className={classes.paper}>
                    <h5 style={{ color: 'black' }}>
                        Are you sure you would like to delete this user?
                    </h5>
                    <Button
                        onClick={handleDelete}
                        className={classes.deleteButton}
                        size='small'
                    >
                        yes
                    </Button>
                    <Button
                        onClick={handleConfirmClose}
                        className={classes.deleteButton}
                        size='small'
                    >
                        No
                    </Button>
                </div>
            </Dialog>
            <Dialog open={moreDetailsOpen} onClose={handleMoreDetailsClose}>
                <div className={classes.paper}>
                    <Typography
                        className={classes.title}
                        color='textSecondary'
                        gutterBottom
                        style={{ marginTop: '10px' }}
                    >
                        {access}
                    </Typography>
                    <Typography variant='h5' component='h2'>
                        {firstName} {lastName}
                    </Typography>
                    <Typography className={classes.pos} color='textSecondary'>
                        {email}
                    </Typography>
                    <Button
                        className={classes.deleteButton}
                        size='small'
                        onClick={handleConfirmOpen}
                    >
                        Delete
                    </Button>
                    {active == false && (
                        <Button
                            className={classes.activateButton}
                            size='small'
                            onClick={handleVerify}
                        >
                            Activate
                        </Button>
                    )}
                    <Button
                        onClick={handleMoreDetailsClose}
                        className={classes.deleteButton}
                        size='small'
                    >
                        Close
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}
