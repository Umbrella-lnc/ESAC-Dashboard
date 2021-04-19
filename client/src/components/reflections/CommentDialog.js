import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const FormDialog = (props) => {
    const {
        addCommentOpen,
        setAddCommentOpen,
        submitComment,
        reflectionID,
    } = props;

    const handleClose = () => {
        setAddCommentOpen(false);
    };

    const [comment, setComment] = React.useState("");

    return (
        <div>
            <Dialog
                open={addCommentOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="comment"
                        label="New Comment"
                        variant="outlined"
                        multiline
                        rows={7}
                        fullWidth
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            submitComment(reflectionID, comment);
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
