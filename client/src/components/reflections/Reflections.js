import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import baseURL from "../../baseURL";
import jwt_decode from "jwt-decode";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import FormDialog from "./FormDialog";
import FilterMenu from "./FilterMenu";
import Reflection from "./Reflection";

class Reflections extends Component {
    user = jwt_decode(localStorage.getItem("jwtToken"));

    state = {
        reflections: [],
        open: false,
        title: "",
        link: "",
        newReflection: "",
        newReflectionStatus: "",
        department: this.user.department,
        filtering: "All",
    };

    setOpen = () => {
        this.setState({
            open: !this.state.open,
        });

        this.setTitle("");
        this.setLink("");
        this.setNewReflection("");
    };

    setTitle = (_title) => {
        this.setState({
            title: _title,
        });
    };

    setLink = (_link) => {
        this.setState({
            link: _link,
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

    setFiltering = (_department) => {
        this.setState({ filtering: _department });
    };

    fetchAllReflections = () => {
        axios
            .get(baseURL + "/api/reflections/getAllReflections")
            .then((res) => {
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
                this.setState({ reflections: res.data });
            });
    };

    submitPost = () => {
        const newReflection = {
            title: this.state.title,
            link: this.state.link,
            post: this.state.newReflection,
            department: this.state.department,
        };

        axios
            .post(baseURL + "/api/reflections/createReflection", newReflection)
            .then((res) => {
                this.fetchAllReflections();
            })
            .catch((err) => console.log(err));
    };

    deleteReflection = (id) => {
        axios
            .post(baseURL + "/api/reflections/deleteReflection", {
                reflectionID: id,
            })
            .then((res) => {
                this.fetchAllReflections();
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
                this.fetchReflections();
            })
            .catch((err) => console.log(err));
    };

    deleteComment = (reflectionID, commentID, commentPosterID) => {
        const payload = {
            reflectionID: reflectionID,
            commentID: commentID,
            commentPosterID: commentPosterID,
        }

        axios
            .post(baseURL + "/api/reflections/deleteComment", payload)
            .then((res) => {
                this.fetchReflections();
            })
            .catch((err) => console.log(err));
    }

    toggleStatus = (id) => {
        axios
            .post(baseURL + "/api/reflections/toggleStatus", {
                reflectionID: id,
            })
            .then((res) => {
                this.fetchReflections();
            })
            .catch((err) => console.log(err));
    };

    fetchReflections = () => {
        const user = jwt_decode(localStorage.getItem("jwtToken"));

        if (user.accessLevel === "administrator") {
            this.fetchAllReflections();
        } else {
            this.fetchDepartmentReflections();
        }
    }

    componentDidMount() {
        this.fetchReflections();
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
                    {this.user.accessLevel === "administrator" && (
                        <FilterMenu setFiltering={this.setFiltering} />
                    )}
                </div>

                <div className="container" style={{ marginTop: "20px" }}>
                    <FormDialog
                        open={this.state.open}
                        setOpen={this.setOpen}
                        changeDepartment={this.setDepartment}
                        getDepartment={this.getDepartment}
                        setTitle={this.setTitle}
                        setLink={this.setLink}
                        setNewReflection={this.setNewReflection}
                        submitReflection={this.submitPost}
                    />

                    {this.state.reflections.length ? (
                        <Grid container spacing={3}>
                            {this.state.reflections
                                .reverse()
                                .map((reflection) => {
                                    if (this.state.filtering !== "All") {
                                        if (
                                            this.state.filtering !==
                                            reflection.department
                                        ) {
                                            return null;
                                        }
                                    }
                                    return (
                                        <Reflection
                                            deleteReflection={this.deleteReflection}
                                            user={this.user}
                                            reflection={reflection}
                                            submitComment={this.submitComment}
                                            deleteComment={this.deleteComment}
                                            key={reflection._id}
                                            toggleStatus={this.toggleStatus}
                                        ></Reflection>
                                    );
                                })}
                        </Grid>
                    ) : (
                        <h3>No Reflections</h3>
                    )}

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

export default Reflections;
