import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles, Paper } from "@material-ui/core";
import Dropdown from "../reusable-components/Dropdown";
import departmentList from "../../data/departmentList";

const FormDialog = (props) => {
    const { open, setOpen, changeDepartment, getDepartment } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const test = () => {
        console.log(getDepartment());
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Reflection Title"
                        multiline
                        rows={1}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="reflection"
                        label="Reflection"
                        variant="outlined"
                        multiline
                        rows={7}
                        fullWidth
                    />
                    <Dropdown
                        title="Select your department"
                        items={departmentList}
                        changeDept={changeDepartment}
                        getDepartment={getDepartment}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={test} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FormDialog;
