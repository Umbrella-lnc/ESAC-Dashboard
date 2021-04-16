import Button from '@material-ui/core/Button'
import { useStyles } from './cardStyles'
import Dialog from '@material-ui/core/Modal'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

export default function NewCardPopUp(props) {
    const classes = useStyles()

    const handleNewCardClose = props.handleNewCardClose
    const handleDescriptionChange = props.handleDescriptionChange
    const handleNameChange = props.handleNameChange
    const handleDueChange = props.handleDueChange
    const newCardOpen = props.newCardOpen
    const handleAddCard = props.handleAddCard
    const errors = props.errors
    return (
        <Dialog
            open={newCardOpen}
            onClose={handleNewCardClose}
            style={{ overflow: 'scroll' }}
        >
            <div className={classes.newCardPaper}>
                <h6 className={classes.trelloInfoHeadings}>Name:</h6>
                <TextField
                    id='outlined-basic'
                    variant='outlined'
                    multiline
                    className={classes.editCardTextFields}
                    onChange={handleNameChange}
                ></TextField>
                <h6 className={classes.trelloInfoHeadings}>Due Date:</h6>
                <TextField
                    label={'mm/dd/year'}
                    id='outlined-basic'
                    variant='outlined'
                    multiline
                    className={classes.editCardTextFields}
                    onChange={handleDueChange}
                ></TextField>
                <h6 className={classes.trelloInfoHeadings}>Description:</h6>
                <TextField
                    id='outlined-basic'
                    onChange={handleDescriptionChange}
                    multiline
                    style={{ minWidth: '600px' }}
                    variant='outlined'
                    className={classes.editCardTextFields}
                ></TextField>
                <h6 className={classes.trelloErrorMessage}>{errors}</h6>
                <Button
                    onClick={handleAddCard}
                    className={classes.deleteButton}
                    size='small'
                >
                    Add Card
                </Button>
                <Button
                    onClick={handleNewCardClose}
                    className={classes.deleteButton}
                    size='small'
                >
                    Cancel
                </Button>
            </div>
        </Dialog>
    )
}
