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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
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
  button: {
    //  style: 'float: right',
    color: 'blue',
    marginLeft: '30px',
  },
  buttonContainer: {
    // style: 'float: right',
  },
  content: {
    justifyContent: 'space-between',
  },
})

export default function ProfileCard(props) {
  const classes = useStyles()
  const firstName = props.user.firstname
  const lastName = props.user.lastname
  const email = props.user.email
  const access = props.user.accessLevel
  const delUser = {
    email: email,
  }

  function handleDelete() {
    axios.post(baseURL + `/api/usersManagement/deleteUser`, delUser)
  }
  if (access != 'administrator') {
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
            className={classes.button}
            size='small'
            onClick={handleDelete}
          >
            delete
          </Button>
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
      </Card>
    )
  }
}
