import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode"

import MenuButton from './menuButton';

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
} from "../../actions/types";


export default function MenuAppBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { onLogoutClick } = props;

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const token = localStorage.getItem("jwtToken");
    const user = jwt_decode(token)

    return (
        <div>
            <AppBar style={{ position: "relative" }}>
                <Toolbar>
                    <MenuButton iconType={MenuIcon} items={[
                    <Link to="/dashboard">Dashboard</Link>,
                    <Link to="/reflections">Reflections</Link>,
                    <Link to="/announcements">Announcements</Link>
                    ]}/>
                    <Typography variant="h6"> {user.firstname} {user.lastname}</Typography>
                    <MenuButton iconType={AccountCircle} items={[
                        <Link to="/profile">Profile</Link>,
                        <Link to="/manageProfiles">Manage Profiles</Link>,
                        <div
                            onClick={(e) => {
                                // Remove token from local storage
                                localStorage.removeItem("jwtToken");
                                // Remove auth header for future requests
                                setAuthToken(false);
                                return {
                                    type: SET_CURRENT_USER,
                                    payload: {},
                                };
                            }}
                        >
                        <a href="/login" style={{ textDecoration: "none" }}>
                            Logout
                        </a>
                        </div>
                    ]}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
