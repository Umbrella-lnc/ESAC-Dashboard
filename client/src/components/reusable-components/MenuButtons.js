import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import grey from "@material-ui/core/colors/grey";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
} from "../../actions/types";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        //position: "relative",
        marginLeft: "auto",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    customColor: {
        backgroundColor: grey[100],
    },
}));

const MenuButtons = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const history = useHistory();

    const token = localStorage.getItem("jwtToken");
    const user = jwt_decode(token);

    const handleClose = (dest) => {
        setAnchorEl(null);
        if (dest) {
            //If logging out
            if (dest === "/login") {
                console.log("Logging out...");

                // Remove token from local storage
                localStorage.removeItem("jwtToken");
                // Remove auth header for future requests
                setAuthToken(false);
                window.location.href = "/login";
                return {
                    type: SET_CURRENT_USER,
                    payload: {},
                };
            }
            history.push(dest);
        }
    };

    const Wrapper = props.iconType;
    //List of form: {dest: 'url', code: {jsx}}
    const { items } = props;

    return (
        <div className={classes.root}>
            <IconButton
                aria-owns={open ? "menu-appbar" : null}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                {<Wrapper />}
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
            >
                {items.map((item) => {
                    const { url, code } = item;
                    return (
                        <MenuItem onClick={() => handleClose(url)}>
                            {code}
                        </MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
};

export default MenuButtons;

//Contributors: https://stackoverflow.com/questions/48169492/how-to-assign-which-menuitems-open-onclick-when-multiple-menus-are-present-on-th
//https://codesandbox.io/s/aged-shadow-5uucr?file=/menuButton.js
