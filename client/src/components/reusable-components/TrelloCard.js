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
})

export default function TrelloCard(props) {
  const classes = useStyles()
  const name = props.name;
  const assignees = props.assignees;
  const complexity = props.complexity;
  const description = props.complexity;

  /*function handleDelete() {
    axios.post(baseURL + `/api/usersManagement/deleteUser`, userContainer)
    window.location.reload(true)
  }*/
    return (
    <Card className={classes.root} raised={true}>
        <CardContent className={classes.content}>
        	<Typography
          	className={classes.title}
          	color='textSecondary'
          	gutterBottom
        	>
          	{assignees}
        	</Typography>
        	<Typography variant='h5' component='h2'>
    	  	{name}
        	</Typography>
        	<Typography className={classes.pos} color='textSecondary'>
          	{complexity}
        	</Typography>
    	</CardContent>
	</Card>
    )
}
