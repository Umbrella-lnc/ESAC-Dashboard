import Button from '@material-ui/core/Button'
import { useStyles } from './cardStyles'
import Dialog from '@material-ui/core/Modal'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

export default function EditCardPopUp(props) {
    const classes = useStyles()
    const editCardOpen = props.editCardOpen
    const handleEditCardClose = props.handleEditCardClose
    const name = props.name
    const handleConfirmDeleteOpen = props.handleConfirmDeleteOpen
    const column = props.column
    const dueDate = props.dueDate
    const description = props.description
    const handleColumnChange = props.handleColumnChange
    const handleDescriptionChange = props.handleDescriptionChange
    const labels = props.labels
    const handleEditCard = props.handleEditCard

    return (
        <Dialog
            open={editCardOpen}
            onClose={handleEditCardClose}
            style={{ overflow: 'scroll' }}
        >
            <div className={classes.editCardPaper}>
                <h6
                    className={classes.editCardButton}
                    style={{ marginRight: '10px', color: 'black' }}
                >
                    editing
                </h6>
                <h3 style={{ color: 'black', marginLeft: '20px' }}>{name}</h3>
                <h6 className={classes.trelloInfoHeadings}>Labels:</h6>
                <TextField
                    id='outlined-basic'
                    defaultValue={labels}
                    variant='outlined'
                    multiline
                    className={classes.editCardTextFields}
                ></TextField>
                <h6 className={classes.trelloInfoHeadings}>Due Date:</h6>
                <TextField
                    id='outlined-basic'
                    defaultValue={dueDate}
                    variant='outlined'
                    multiline
                    className={classes.editCardTextFields}
                ></TextField>
                <h6 className={classes.trelloInfoHeadings}>Description:</h6>
                <TextField
                    id='outlined-basic'
                    defaultValue={description}
                    onChange={handleDescriptionChange}
                    multiline
                    style={{ minWidth: '600px' }}
                    variant='outlined'
                    className={classes.editCardTextFields}
                ></TextField>
                <h6 className={classes.trelloInfoHeadings}>Status:</h6>
                <Select
                    native
                    className={classes.editCardTextFields}
                    value={column}
                    onChange={handleColumnChange}
                    inputProps={{
                        name: column,
                        id: 'age-native-simple',
                    }}
                >
                    <option value={'To Do'}>To Do</option>
                    <option value={'Doing'}>Doing</option>
                    <option value={'Done'}>Done</option>
                </Select>
                <Button
                    onClick={handleEditCard}
                    className={classes.deleteButton}
                    size='small'
                >
                    Confirm Changes
                </Button>
                <Button
                    onClick={handleConfirmDeleteOpen}
                    className={classes.deleteButton}
                    size='small'
                >
                    Delete Card
                </Button>
                <Button
                    onClick={handleEditCardClose}
                    className={classes.deleteButton}
                    size='small'
                >
                    Cancel
                </Button>
            </div>
        </Dialog>
    )
}
