import Button from '@material-ui/core/Button'
import { useStyles } from './cardStyles'
import Dialog from '@material-ui/core/Modal'

export default function MoreInfoPopUps(props) {
    const classes = useStyles()
    const handleOpenEditCardWindow = props.handleOpenEditCardWindow
    const handleCardDetailsClose = props.handleCardDetailsClose
    const cardDetailsOpen = props.cardDetailsOpen
    const labels = props.labels
    const due = props.due
    const description = props.description
    const column = props.column
    const name = props.name

    return (
        <Dialog
            open={cardDetailsOpen}
            onClose={handleCardDetailsClose}
            style={{ overflow: 'scroll' }}
        >
            <div className={classes.trelloPaper}>
                <Button
                    className={classes.editCardButton}
                    onClick={handleOpenEditCardWindow}
                >
                    edit
                </Button>
                <h3 style={{ color: 'black', marginLeft: '20px' }}>{name}</h3>
                <h6 className={classes.trelloInfoHeadings}>Labels:</h6>
                {labels != '' && (
                    <h6 className={classes.trelloInfoBodies}>{labels}</h6>
                )}
                {labels == '' && (
                    <h6 className={classes.trelloInfoBodies}>No Labels</h6>
                )}
                <h6 className={classes.trelloInfoHeadings}>Due Date:</h6>
                <h6 className={classes.trelloInfoBodies}>{due}</h6>
                <h6 className={classes.trelloInfoHeadings}>Description:</h6>
                {description.length > 0 && (
                    <h6 className={classes.trelloInfoBodies}>{description}</h6>
                )}
                {description.length == 0 && (
                    <h6 className={classes.trelloInfoBodies}>No Description</h6>
                )}
                <h6 className={classes.trelloInfoHeadings}>Status:</h6>
                <h6 className={classes.trelloInfoBodies}>{column}</h6>
                <Button
                    onClick={handleCardDetailsClose}
                    className={classes.deleteButton}
                    size='small'
                >
                    Close
                </Button>
            </div>
        </Dialog>
    )
}
