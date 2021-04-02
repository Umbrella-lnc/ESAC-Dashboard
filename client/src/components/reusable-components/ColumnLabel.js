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
    height: '50px',
    margin: '0px 20px 0px 20px',
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

export default function ColumnLabel(props) {
  const classes = useStyles()
  console.log(props);
  const name = props.cardInfo.name;

  /*function handleDelete() {
    axios.post(baseURL + `/api/usersManagement/deleteUser`, userContainer)
    window.location.reload(true)
  }*/
    return (
    <Card className={classes.root} raised={true}>
        	<Typography variant='h5' component='h2' style={{margin: "10px 10px 10px 10px"}}>
    	  	{name}
        	</Typography>
	</Card>
    )
}
