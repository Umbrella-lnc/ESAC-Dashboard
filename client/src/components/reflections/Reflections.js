import React, { Component } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import axios from "axios";
import baseURL from "../../baseURL";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import FormDialog from "./FormDialog";
import FilterMenu from "./FilterMenu";

import Reflection from "./Reflection";

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

    fetchAllReflections = () => {
        axios
            .get(baseURL + "/api/reflections/getAllReflections")
            .then((res) => {
                // Debug
                console.log(baseURL + "/api/reflections/getAllReflections");
                this.setState({ reflections: res.data });
            });
    };

    fetchDepartmentReflections = (department) => {
        axios
            .get(
                baseURL + "/api/reflections/getDepartmentReflections",
                department
            )
            .then((res) => {
                // Debug
                console.log(
                    baseURL + "/api/reflections/getDepartmentReflections"
                );
                this.setState({ reflections: res.data });
            });
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

    submitComment = (_id, comment) => {
        const newComment = {
            reflectionID: _id,
            poster: this.user._id,
            comment: comment,
        };

        axios
            .post(baseURL + "/api/reflections/commentOnReflection", newComment)
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
                    <FilterMenu />
                </div>

                <div className="container" style={{ marginTop: "20px" }}>
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
                                <Reflection
                                    deleteReflection={this.deleteReflection}
                                    user={this.user}
                                    reflection={reflection}
                                    submitComment={this.submitComment}
                                />
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

Reflections.propTypes = {};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default Reflections;
