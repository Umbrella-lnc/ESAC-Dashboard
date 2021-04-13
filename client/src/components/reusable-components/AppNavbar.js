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
import jwt_decode from "jwt-decode";

import MenuButtons from "./MenuButtons";

const MenuAppBar = (props) => {
    const token = localStorage.getItem("jwtToken");
    const user = jwt_decode(token);
    var isAdmin = Boolean(false);

    if (user.accessLevel === "administrator") {
        isAdmin = Boolean(true);
    }

    return (
        <div>
            <AppBar style={{ position: "relative" }}>
                <Toolbar>
                    <div
                        className="page-container"
                        style={{
                            marginRight: "auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <MenuButtons
                            iconType={MenuIcon}
                            items={[
                                {
                                    url: "/dashboard",
                                    code: (
                                        <Link to="/dashboard">Dashboard</Link>
                                    ),
                                },
                                {
                                    url: "/reflections",
                                    code: (
                                        <Link to="/reflections">
                                            Reflections
                                        </Link>
                                    ),
                                },
                                {
                                    url: "/announcements",
                                    code: (
                                        <Link to="/announcements">
                                            Announcements
                                        </Link>
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <div
                        className="profile-menu-container"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Typography variant="h6">
                            {" "}
                            {user.firstname} {user.lastname}
                        </Typography>
                        <MenuButtons
                            iconType={AccountCircle}
                            items={[
                                {
                                    url: "/profile",
                                    code: <Link to="/profile">Profile</Link>,
                                },

                                isAdmin && {
                                    url: "/manageProfiles",
                                    code: (
                                        <Link to="/manageProfiles">
                                            ManageProfiles
                                        </Link>
                                    ),
                                },
                                {
                                    url: "/login",
                                    code: (
                                        <a style={{ textDecoration: "none" }}>
                                            Logout
                                        </a>
                                    ),
                                },
                            ]}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default MenuAppBar;
