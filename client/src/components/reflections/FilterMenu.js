import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import departments from "../../data/departmentList";

const useStyles = makeStyles({
    root: {
        width: "100%",
        borderRadius: "0",
    },
});

export default function CenteredTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const filterDepartments = (department) => {};

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                elevation={0}
                centered
            >
                <Tab
                    label={"All"}
                    key={"All"}
                    onClick={() => filterDepartments("All")}
                    style={{ backgroundColor: "transparent", width: "9vw" }}
                />
                {departments.map((department) => {
                    const { id, value } = department;
                    return (
                        <Tab
                            label={value}
                            key={id}
                            onClick={() => filterDepartments(value)}
                            style={{
                                backgroundColor: "transparent",
                                width: "9vw",
                            }}
                        />
                    );
                })}
            </Tabs>
        </Paper>
    );
}
