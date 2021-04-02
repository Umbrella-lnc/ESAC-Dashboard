import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

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
})

export default function TrelloCard(props) {
  const classes = useStyles()
  console.log(props);
  const name = props.cardInfo.name;

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
          	{name}
        	</Typography>
        	<Typography variant='h5' component='h2'>
    	  	{name}
        	</Typography>
        	<Typography className={classes.pos} color='textSecondary'>
          	{name}
        	</Typography>
    	</CardContent>
	</Card>
    )
}
