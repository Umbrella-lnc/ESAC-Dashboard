import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { InfoOutlined } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
    margin: '20px 20px 20px 20px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function ProfileCard(props) {
  const classes = useStyles()
  const firstName = props.user.firstname
  const lastName = props.user.lastname
  const email = props.user.email
  const access = props.user.accessLevel

  return (
    <Card className={classes.root} raised={true}>
      <CardContent>
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
        <Typography variant='body2' component='p'>
          user
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>delete</Button>
      </CardActions>
    </Card>
  )
}
