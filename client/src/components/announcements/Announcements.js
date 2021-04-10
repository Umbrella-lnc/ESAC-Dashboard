import React, { Component } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import axios from "axios";
import baseURL from "../../baseURL";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import FormDialog from "./FormDialog";

import Announcement from "./Announcement";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
} from "../../actions/types";
import { findByLabelText } from "@testing-library/dom";

class Announcements extends Component {
    constructor(props) {
        super(props);
    }

    user = jwt_decode(localStorage.getItem("jwtToken"));

    state = {
        announcements: [],
        open: false,
        title: "",
        newAnnouncement: ""
    };

    setOpen = () => {
        this.setState({
            open: !this.state.open,
        });
    };
    setTitle = (_title) => {
        this.setState({
            title: _title,
        });
    };
    setNewAnnouncement = (_announcement) => {
        this.setState({
            newAnnouncement: _announcement,
        });
    };

    fetchAnnouncements = () => {
        console.log(baseURL);
        console.log(baseURL + '/api/announcements/getAnnouncements')
        axios
            .get(baseURL + '/api/announcements/getAnnouncements')
            .then((res) => {
                this.setState({ announcements: res.data });
            })
            .catch(err => console.log(err));
    };

    submitPost = () => {
        const newAnnouncement = {
            title: this.state.title,
            post: this.state.newAnnouncement,
            department: this.state.department,
        };

        axios
            .post(baseURL + "/api/announcements/createAnnouncement", newAnnouncement)
            .then((res) => {
                this.fetchAnnouncements();
            })
            .catch((err) => console.log(err));
    };

    deleteAnnouncement = (id) => {
        axios
            .post(baseURL + "/api/announcements/deleteAnnouncement", {
                announcementID: id,
            })
            .then((res) => {
                this.fetchAnnouncements();
            })
            .catch((err) => console.log(err));
    };

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        const user = jwt_decode(token);

        this.fetchAnnouncements();
    }

    render() {
        if (!this.state.announcements) {
            return null;
        }

        return (
            <React.Fragment>
                <div
                    style={{
                        marginTop: "60px",
                        width: "100vw",
                        display: "flex",
                        overflow: "auto",
                        paddingLeft: "00vw",
                        paddingRight: "00vw",
                    }}
                >
                </div>

                <div className="container" style={{ marginTop: "20px" }}>
                    <FormDialog
                        open={this.state.open}
                        setOpen={this.setOpen}
                        setTitle={this.setTitle}
                        setNewAnnouncement={this.setNewAnnouncement}
                        submitAnnouncement={this.submitPost}
                    />

                    {this.state.announcements.length ? (
                            <Grid container spacing={3}>
                                {this.state.announcements.map(announcement => (
                                    <Announcement
                                        key={announcement._id}
                                        deleteAnnouncement={this.deleteAnnouncement}
                                        user={this.user}
                                        announcement={announcement}>
                                    </Announcement>
                                ))}
                            </Grid>

                    ) :
                        (<h3>No Announcements</h3>)
                    }

                    {this.user.accessLevel === "administrator" && (
                        <div
                            className="add-announcement"
                            style={{
                                position: "fixed",
                                bottom: "5vh",
                                right: "5vw",
                            }}
                        >
                            <Fab
                                color="secondary"
                                aria-label="edit"
                                onClick={this.setOpen}
                            >
                                <EditIcon />
                            </Fab>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

Announcements.propTypes = {};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default Announcements;
