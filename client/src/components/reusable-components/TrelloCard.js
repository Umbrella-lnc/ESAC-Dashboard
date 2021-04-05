import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import { List } from '@material-ui/core'
import Button from '@material-ui/core/Button'


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
  function handleMoreInfo() {
    console.log("more info button clicked");
  }

export default function TrelloCard(props) {
  const classes = useStyles()
  console.log(props);
  const name = props.cardInfo.name;

  var due = String(props.cardInfo.due);
  if (due.length > 6) {
  due = due.substring(5,7) + "/" + due.substring(8, 10) + "/" + due.substring(2, 4)
  }
  else{
    due = "No due date"
  }
  
  var label = "Labels:";
  if (props.cardInfo.labels.length > 0){
    for (var i = 0; i < props.cardInfo.labels.length; i ++){
      if (i!= 0){
        label = label + ","
      }
      label = label + " " + props.cardInfo.labels[i].name;
    }
  }
  else{
    label = "No Labels"
  }
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
                variant="contained"
                className={classes.deleteButton}
                size='small'
                onClick={handleMoreInfo}
              >
                More Info
              </Button>
            </List>
          </CardActions>
	</Card>
    )
}
