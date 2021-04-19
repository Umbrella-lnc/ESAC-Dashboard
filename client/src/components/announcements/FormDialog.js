import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const FormDialog = (props) => {
    const {
        open,
        setOpen,
        setTitle,
        setNewAnnouncement,
        submitAnnouncement,
    } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Announcement Title"
                        multiline
                        rows={1}
                        fullWidth
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="announcement"
                        label="Announcement"
                        variant="outlined"
                        multiline
                        rows={7}
                        fullWidth
                        onChange={(e) => {
                            setNewAnnouncement(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            submitAnnouncement();
                            handleClose();
                        }}
                        color="primary"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FormDialog;
