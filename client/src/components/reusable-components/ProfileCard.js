import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { InfoOutlined } from '@material-ui/icons'
import baseURL from '../../baseURL'
import axios from 'axios'
import { List } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

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

  function handleDelete() {
    axios.post(baseURL + `/api/usersManagement/deleteUser`, userContainer)
    window.location.reload(true)
  }

  function handleVerify() {
    axios.post(
      baseURL + '/api/usersManagement/toggleVerifiedStatus',
      userContainer
    )
    window.location.reload(true)
  }

  if (access != 'administrator') {
    if (active === false) {
      return (
        <Card className={classes.root} raised={true}>
          <CardContent className={classes.content}>
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
            <Typography className={classes.pos} color='textSecondary'>
              {email}
            </Typography>
          </CardContent>
          <CardActions className={classes.buttonContainer}>
            <List>
              <Button
                className={classes.deleteButton}
                size='small'
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                className={classes.activateButton}
                size='small'
                onClick={handleVerify}
              >
                Activate
              </Button>
            </List>
          </CardActions>
        </Card>
      )
    } else {
      return (
        <Card className={classes.root} raised={true}>
          <CardContent className={classes.content}>
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
            <Typography className={classes.pos} color='textSecondary'>
              {email}
            </Typography>
          </CardContent>
          <CardActions className={classes.buttonContainer}>
            <Button
              className={classes.deleteButton}
              size='small'
              onClick={handleDelete}
            >
              delete
            </Button>
          </CardActions>
        </Card>
      )
    }
  } else {
    return (
      <Card className={classes.root} raised={true}>
        <CardContent className={classes.content}>
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
          <Typography className={classes.pos} color='textSecondary'>
            {email}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}
