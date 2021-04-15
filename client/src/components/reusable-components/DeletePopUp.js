import Button from '@material-ui/core/Button'
import { useStyles } from './cardStyles'
import Dialog from '@material-ui/core/Modal'

export default function DeletePopUp(props) {
    const classes = useStyles()
    const confirmDeleteOpen = props.confirmDeleteOpen
    const handleConfirmDeleteClose = props.handleConfirmDeleteClose
    const handleDelete = props.handleDelete

    return (
        <Dialog open={confirmDeleteOpen} onClose={handleConfirmDeleteClose}>
            <div className={classes.paper}>
                <h5 style={{ color: 'black' }}>
                    Are you sure you would like to delete this task?
                </h5>
                <Button
                    onClick={handleDelete}
                    className={classes.deleteButton}
                    size='small'
                >
                    yes
                </Button>
                <Button
                    onClick={handleConfirmDeleteClose}
                    className={classes.deleteButton}
                    size='small'
                >
                    No
                </Button>
            </div>
        </Dialog>
    )
}
