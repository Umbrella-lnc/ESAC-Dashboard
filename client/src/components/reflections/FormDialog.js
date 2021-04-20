import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dropdown from "../reusable-components/Dropdown";
import departmentList from "../../data/departmentList";

const FormDialog = (props) => {
    const {
        open,
        setOpen,
        changeDepartment,
        getDepartment,
        setTitle,
        setLink,
        setNewReflection,
        submitReflection,
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
                        label="Reflection Title"
                        multiline
                        rows={1}
                        fullWidth
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="link"
                        label="Link to Google Form"
                        multiline
                        rows={1}
                        fullWidth
                        onChange={(e) => {
                            setLink(e.target.value);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="reflection"
                        label="Extra details..."
                        variant="outlined"
                        multiline
                        rows={7}
                        fullWidth
                        onChange={(e) => {
                            setNewReflection(e.target.value);
                        }}
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
                    <Button
                        onClick={() => {
                            submitReflection();
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
