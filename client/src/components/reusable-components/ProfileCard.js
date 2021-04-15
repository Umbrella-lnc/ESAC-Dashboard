import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import Dialog from '@material-ui/core/Modal'
import baseURL from '../../baseURL'
import axios from 'axios'
import { useStyles } from './cardStyles'
import { List } from '@material-ui/core'

export default function ProfileCard(props) {
    const classes = useStyles()

    const firstName = props.user.firstname
    const lastName = props.user.lastname
    const active = props.user.active
    const email = props.user.email
    const access = props.user.accessLevel
    const department = props.user.department
    const window = props.window

    const departAbrev = department.slice(
        department.length - 4,
        department.length - 1
    )
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
                        <Typography
                            className={classes.pos}
                            style={{ color: 'black' }}
                        >
                            {departAbrev}
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
                        style={{ marginTop: '15px', color: 'black' }}
                    >
                        {access}
                    </Typography>
                    <Typography
                        variant='h5'
                        component='h2'
                        style={{ color: 'black' }}
                    >
                        {firstName} {lastName}
                    </Typography>
                    <Typography
                        className={classes.pos}
                        style={{ color: 'black' }}
                    >
                        {email}
                    </Typography>
                    <Typography
                        className={classes.pos}
                        style={{ color: 'black' }}
                    >
                        {department}
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
