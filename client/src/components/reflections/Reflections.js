import React, { Component } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import axios from "axios";
import baseURL from "../../baseURL";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import FormDialog from "./FormDialog";
import ReflectionMenu from "./ReflectionMenu";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
} from "../../actions/types";
import { findByLabelText } from "@testing-library/dom";

class Reflections extends Component {
    constructor(props) {
        super(props);
    }

    user = jwt_decode(localStorage.getItem("jwtToken"));

    state = {
        reflections: [],
        open: false,
        title: "",
        newReflection: "",
        department: this.user.department,
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
    setNewReflection = (_reflection) => {
        this.setState({
            newReflection: _reflection,
        });
    };
    setDepartment = (_department) => {
        this.setState({
            department: _department,
        });
    };
    getDepartment = () => {
        return this.state.department;
    };

    submitPost = () => {
        const newReflection = {
            title: this.state.title,
            post: this.state.newReflection,
            department: this.state.department,
        };

        axios
            .post(baseURL + "/api/reflections/createReflection", newReflection)
            .then((res) => {
                axios
                    .get(baseURL + "/api/reflections/getAllReflections")
                    .then((res) => {
                        // Debug
                        console.log(
                            baseURL + "/api/reflections/getAllReflections"
                        );
                        this.setState({ reflections: res.data });
                    });
            })
            .catch((err) => console.log(err));
    };

    deleteReflection = (id) => {
        axios
            .post(baseURL + "/api/reflections/deleteReflection", {
                reflectionID: id,
            })
            .then((res) => {
                axios
                    .get(baseURL + "/api/reflections/getAllReflections")
                    .then((res) => {
                        // Debug
                        console.log(
                            baseURL + "/api/reflections/getAllReflections"
                        );
                        this.setState({ reflections: res.data });
                    });
            })
            .catch((err) => console.log(err));
    };

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        const user = jwt_decode(token);

        if (user.accessLevel === "administrator") {
            axios
                .get(baseURL + "/api/reflections/getAllReflections")
                .then((res) => {
                    // Debug
                    console.log(baseURL + "/api/reflections/getAllReflections");
                    this.setState({
                        reflections: res.data,
                    });
                });
        } else {
            axios
                .get(baseURL + "/api/reflections/getDepartmentReflections")
                .then((res) => {
                    // Debug
                    console.log(
                        baseURL + "/api/reflections/getDepartmentReflections"
                    );
                    this.setState({ reflections: res.data });
                });
        }
    }

    render() {
        if (!this.state.reflections) {
            return null;
        }

        return (
            <div
                className="container valign-wrapper"
                style={{ marginTop: "100px" }}
            >
                <FormDialog
                    open={this.state.open}
                    setOpen={this.setOpen}
                    changeDepartment={this.setDepartment}
                    getDepartment={this.getDepartment}
                    setTitle={this.setTitle}
                    setNewReflection={this.setNewReflection}
                    submitReflection={this.submitPost}
                />
                <Grid
                    container
                    spacing={3}
                    //direction="column"
                    //alignItems="center"
                    //justify="center"
                >
                    {this.state.reflections.map((reflection) => {
                        return (
                            <Grid item xs={12} key={reflection._id}>
                                <Card>
                                    <CardContent
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            style={{
                                                textDecoration: "underline",
                                                marginRight: "0",
                                                marginLeft: "auto",
                                            }}
                                        >
                                            {reflection.title}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            date={new Date(reflection.date)}
                                            style={{
                                                marginRight: "0",
                                                marginLeft: "auto",
                                            }}
                                        >
                                            {new Date(
                                                reflection.date
                                            ).toDateString()}
                                        </Typography>
                                        <ReflectionMenu
                                            user={this.user}
                                            deletePost={this.deleteReflection}
                                            id={reflection._id}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                            color={
                                                reflection.status === "Complete"
                                                    ? "primary"
                                                    : "secondary"
                                            }
                                        >
                                            {reflection.status}
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <Typography variant="h6">
                                            {reflection.post}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                {this.user.accessLevel === "administrator" && (
                    <div
                        className="add-reflection"
                        style={{
                            position: "fixed",
                            bottom: "5vh",
                            right: "5vw",
                        }}
                    >
                        <Fab color="secondary" aria-label="edit">
                            <EditIcon onClick={this.setOpen} />
                        </Fab>
                    </div>
                )}
            </div>
        );
    }
}

Reflections.propTypes = {};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default Reflections;
