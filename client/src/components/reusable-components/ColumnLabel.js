import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
        width: '300px',
        height: '50px',
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
    const name = props.cardInfo

    /*function handleDelete() {
    axios.post(baseURL + `/api/usersManagement/deleteUser`, userContainer)
    window.location.reload(true)
  }*/
    return (
        <Card className={classes.root} raised={true}>
            <Typography
                variant='h5'
                component='h2'
                style={{ margin: '10px 10px 10px 10px' }}
            >
                {name}
            </Typography>
        </Card>
    )
}
