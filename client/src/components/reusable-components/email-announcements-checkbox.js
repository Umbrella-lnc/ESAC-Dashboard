import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { Switch } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function CustomizedSwitches(props) {
    const { checked, handleToggle } = props;

    return (
        <FormGroup>
            <Typography component="div">
                <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item>Off</Grid>
                    <Grid item>
                        <Switch
                            checked={checked}
                            onChange={handleToggle}
                            name="checked"
                        />
                    </Grid>
                    <Grid item>On</Grid>
                </Grid>
            </Typography>
        </FormGroup>
    );
}
